import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Project, GridSize, ContentWidth, ProjectBlock } from './types'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DB_ID = process.env.NOTION_DATABASE_ID!

// ── Types ──────────────────────────────────────────────────

export interface ExperienceItem {
  id: string
  name: string
  period: string
  color: string
  logo: string | null
}

export interface AwardGroup {
  group: string
  items: string[]
}

export interface ProjectItem {
  id: string
  name: string
  type: string
  color: string
  logo: string | null
  link: string | null
}

export interface ClientItem {
  id: string
  name: string
  link: string | null
}

export interface BioData {
  bioText: string[]
  capabilities: string[]
  avatarUrl: string | null
  openToWork: boolean
  experience: ExperienceItem[]
  awards: AwardGroup[]
  relevantProjects: ProjectItem[]
  clients: ClientItem[]
}

// ── Helpers ────────────────────────────────────────────────

function notionImageProxy(url: string): string {
  return `/api/notion-image?url=${encodeURIComponent(url)}`
}

type AnyProp = Record<string, unknown>

function str(val: unknown): string {
  return typeof val === 'string' ? val : ''
}

function getFileUrl(file: AnyProp): string | null {
  try {
    if (file.type === 'file') return str((file.file as AnyProp)?.url) || null
    if (file.type === 'external') return str((file.external as AnyProp)?.url) || null
  } catch { /* ignore */ }
  return null
}

function firstFileProxy(files: AnyProp[]): string | null {
  if (!files?.length) return null
  const url = getFileUrl(files[0])
  return url ? notionImageProxy(url) : null
}

function resolveFileUrl(file: AnyProp): string | null {
  const url = getFileUrl(file)
  if (!url) return null
  return file.type === 'external' ? url : notionImageProxy(url)
}

function parseAwards(raw: string): AwardGroup[] {
  const text = raw.trim()
  if (!text) return []

  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed)) {
      const groups = parsed
        .filter((g: AnyProp) => g && typeof g.group === 'string' && Array.isArray(g.items))
        .map((g: AnyProp) => ({
          group: g.group as string,
          items: (g.items as unknown[]).filter((it): it is string => typeof it === 'string'),
        }))
        .filter(g => g.items.length > 0)
      if (groups.length) return groups
    }
  } catch { /* not JSON */ }

  return text
    .split(/\n\s*\n/)
    .map(block => block.split('\n').map(l => l.trim()).filter(Boolean))
    .filter(lines => lines.length >= 2)
    .map(lines => ({ group: lines[0], items: lines.slice(1) }))
}

// ── Portfolio Projects ─────────────────────────────────────

function parseProject(page: PageObjectResponse): Project | null {
  try {
    const props = page.properties as Record<string, AnyProp>
    const getProp = (key: string): AnyProp | null => props[key] ?? null

    const title = (() => {
      const p = getProp('Name') ?? getProp('title')
      if (!p || p.type !== 'title') return ''
      return str((p.title as Array<{ plain_text: string }>)[0]?.plain_text)
    })()

    const getRichText = (key: string): string => {
      const p = getProp(key)
      if (!p || p.type !== 'rich_text') return ''
      return (p.rich_text as Array<{ plain_text: string }>).map(t => t.plain_text).join('')
    }

    const getNumber = (key: string): number => {
      const p = getProp(key)
      if (!p || p.type !== 'number') return 0
      return typeof p.number === 'number' ? p.number : 0
    }

    const getSelect = (key: string): string => {
      const p = getProp(key)
      if (!p || p.type !== 'select') return ''
      return str((p.select as AnyProp)?.name)
    }

    const getCheckbox = (key: string): boolean => {
      const p = getProp(key)
      if (!p || p.type !== 'checkbox') return false
      return p.checkbox === true
    }

    const getDate = (key: string): string => {
      const p = getProp(key)
      if (!p || p.type !== 'date') return ''
      return str((p.date as AnyProp)?.start)
    }

    const getFiles = (key: string): string[] => {
      const p = getProp(key)
      if (!p || p.type !== 'files') return []
      return (p.files as AnyProp[])
        .map(resolveFileUrl)
        .filter((url): url is string => typeof url === 'string' && url.length > 0)
    }

    const cover = getFiles('Cover')[0] ?? null
    const media = getFiles('Media')
    const videoUrlsRaw = getRichText('Video_Urls')
    const videoUrls = videoUrlsRaw ? videoUrlsRaw.split(',').map(u => u.trim()).filter(Boolean) : []
    const rawGridSize = getSelect('Grid_Size').toLowerCase()
    const gridSize: GridSize = ['small', 'medium', 'large'].includes(rawGridSize)
      ? (rawGridSize as GridSize) : 'medium'

    const contentWidth: ContentWidth =
      getSelect('Content_Width').toLowerCase() === 'full' ? 'full' : 'contained'

    return {
      id: page.id, title,
      client: getRichText('Client'),
      year: getNumber('Year'),
      type: getSelect('Type'),
      category: getSelect('Category'),
      slug: getRichText('Slug'),
      cover, media, videoUrls, gridSize, contentWidth,
      order: getNumber('Order'),
      published: getCheckbox('Published'),
      isProtected: getRichText('Password').trim().length > 0,
      description: getRichText('Description'),
      publishedAt: getDate('Published_At') || page.created_time,
      notifyDays: getNumber('Notify_Days') > 0 ? getNumber('Notify_Days') : 14,
    }
  } catch (err) {
    console.error('[notion] parseProject error on page', page.id, err)
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await notion.databases.query({ database_id: DB_ID })
    return (response.results as PageObjectResponse[])
      .map(parseProject)
      .filter((p): p is Project => p !== null && p.published)
      .sort((a, b) => a.order - b.order)
  } catch (err) {
    console.error('[notion] getProjects error:', err)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await notion.databases.query({ database_id: DB_ID })
    return (response.results as PageObjectResponse[])
      .map(parseProject)
      .find((p): p is Project => p !== null && p.slug === slug) ?? null
  } catch (err) {
    console.error('[notion] getProjectBySlug error:', err)
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const response = await notion.databases.query({ database_id: DB_ID })
    return (response.results as PageObjectResponse[])
      .map(parseProject)
      .filter((p): p is Project => p !== null && p.published && p.slug.length > 0)
      .map(p => p.slug)
  } catch (err) {
    console.error('[notion] getAllSlugs error:', err)
    return []
  }
}

export async function getProjectPassword(slug: string): Promise<string | null> {
  try {
    const response = await notion.databases.query({ database_id: DB_ID })
    const page = (response.results as PageObjectResponse[]).find(p => {
      const props = p.properties as Record<string, AnyProp>
      const slugProp = props.Slug
      if (!slugProp || slugProp.type !== 'rich_text') return false
      const value = (slugProp.rich_text as Array<{ plain_text: string }>).map(t => t.plain_text).join('')
      return value === slug
    })
    if (!page) return null

    const props = page.properties as Record<string, AnyProp>
    const pwProp = props.Password
    if (!pwProp || pwProp.type !== 'rich_text') return null
    const pw = (pwProp.rich_text as Array<{ plain_text: string }>).map(t => t.plain_text).join('').trim()
    return pw.length > 0 ? pw : null
  } catch (err) {
    console.error('[notion] getProjectPassword error:', err)
    return null
  }
}

// ── Corpo da página (galeria rica: texto entre imagens) ────

type BlockObject = { id: string; type: string; has_children?: boolean } & Record<string, AnyProp>

function richTextToPlain(rt: unknown): string {
  if (!Array.isArray(rt)) return ''
  return (rt as Array<{ plain_text?: string }>).map(t => t.plain_text ?? '').join('')
}

async function listChildren(blockId: string): Promise<BlockObject[]> {
  const blocks: BlockObject[] = []
  let cursor: string | undefined
  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      ...(cursor ? { start_cursor: cursor } : {}),
      page_size: 100,
    })
    blocks.push(...(res.results as unknown as BlockObject[]))
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)
  return blocks
}

async function parseBlockList(blockId: string): Promise<ProjectBlock[]> {
  const blocks = await listChildren(blockId)
  const out: ProjectBlock[] = []

  for (const block of blocks) {
    switch (block.type) {
      case 'column_list': {
        const columnBlocks = await listChildren(block.id)
        const columns: ProjectBlock[][] = []
        for (const col of columnBlocks) {
          if (col.type === 'column') {
            columns.push(await parseBlockList(col.id))
          }
        }
        if (columns.some(c => c.length > 0)) out.push({ type: 'columns', columns })
        break
      }
      case 'paragraph': {
        const text = richTextToPlain((block.paragraph as AnyProp)?.rich_text).trim()
        if (text) out.push({ type: 'text', text })
        break
      }
      case 'heading_1':
      case 'heading_2':
      case 'heading_3': {
        const level = (Number(block.type.split('_')[1]) as 1 | 2 | 3)
        const text = richTextToPlain((block[block.type] as AnyProp)?.rich_text).trim()
        if (text) out.push({ type: 'heading', level, text })
        break
      }
      case 'image': {
        const url = getFileUrl(block.image as AnyProp)
        if (url) out.push({ type: 'image', src: notionImageProxy(url) })
        break
      }
      case 'video': {
        const v = block.video as AnyProp
        const url = v?.type === 'external'
          ? str((v.external as AnyProp)?.url)
          : getFileUrl(v)
        if (url) out.push({ type: 'video', url })
        break
      }
      case 'embed': {
        const url = str((block.embed as AnyProp)?.url)
        if (url) out.push({ type: 'video', url })
        break
      }
      default:
        break
    }
  }

  return out
}

export async function getProjectBlocks(pageId: string): Promise<ProjectBlock[]> {
  try {
    return await parseBlockList(pageId)
  } catch (err) {
    console.error('[notion] getProjectBlocks error:', err)
    return []
  }
}

// ── Bio ────────────────────────────────────────────────────

type DbQuery = Parameters<typeof notion.databases.query>[0]

async function queryDbSafe(dbId: string | undefined, opts?: { sorts?: DbQuery['sorts'] }) {
  if (!dbId) return []
  try {
    const res = await notion.databases.query({
      database_id: dbId,
      ...(opts?.sorts ? { sorts: opts.sorts } : {}),
    })
    return res.results as PageObjectResponse[]
  } catch {
    return []
  }
}

export async function getBio(): Promise<BioData | null> {
  try {
    const bioId  = process.env.NOTION_BIO_PAGE_ID
    if (!bioId) return null

    const orderSort = [{ property: 'order', direction: 'ascending' as const }]

    const [bioResults, expResults, projResults, clientResults] = await Promise.all([
      queryDbSafe(bioId, {}),
      queryDbSafe(process.env.NOTION_EXPERIENCE_DB_ID, { sorts: orderSort }),
      queryDbSafe(process.env.NOTION_RELEVANT_PROJECTS_DB_ID, { sorts: orderSort }),
      queryDbSafe(process.env.NOTION_CLIENTS_DB_ID, { sorts: orderSort }),
    ])

    // ── Bio base
    const bioPage = bioResults[0]
    const props = bioPage ? bioPage.properties as Record<string, AnyProp> : {}

    const getAnyText = (key: string): string => {
      const p = props[key]
      if (!p) return ''
      if (p.type === 'rich_text') return (p.rich_text as Array<{ plain_text: string }>).map(t => t.plain_text).join('')
      if (p.type === 'title') return (p.title as Array<{ plain_text: string }>).map(t => t.plain_text).join('')
      return ''
    }
    const getMultiSelect = (key: string): string[] => {
      const p = props[key]
      if (!p || p.type !== 'multi_select') return []
      return (p.multi_select as Array<{ name: string }>).map(s => s.name)
    }

    const avatarUrl = (() => {
      const p = props.avatar
      if (!p || p.type !== 'files') return null
      return firstFileProxy(p.files as AnyProp[])
    })()

    const openToWork = (() => {
      const p = props.open_to_work
      return !!p && p.type === 'checkbox' && p.checkbox === true
    })()

    const bioText = getAnyText('bio_text').split('\n').filter(Boolean)
    const capabilities = getMultiSelect('capabilities')
    const awards = parseAwards(getAnyText('awards'))

    // ── Experience DB
    const experience: ExperienceItem[] = expResults.map(page => {
      const p = page.properties as Record<string, AnyProp>
      const nameArr = (p.name ?? p.Name) as AnyProp
      return {
        id: page.id,
        name: str((nameArr?.title as Array<{ plain_text: string }>)?.[0]?.plain_text),
        period: str((p.period?.rich_text as Array<{ plain_text: string }>)?.[0]?.plain_text),
        color: str((p.color?.rich_text as Array<{ plain_text: string }>)?.[0]?.plain_text) || '#1a1a1a',
        logo: firstFileProxy(p.logo?.files as AnyProp[] ?? []),
      }
    })

    // ── Relevant Projects DB
    const relevantProjects: ProjectItem[] = projResults.map(page => {
      const p = page.properties as Record<string, AnyProp>
      const nameArr = (p.name ?? p.Name) as AnyProp
      return {
        id: page.id,
        name: str((nameArr?.title as Array<{ plain_text: string }>)?.[0]?.plain_text),
        type: str((p.type?.rich_text as Array<{ plain_text: string }>)?.[0]?.plain_text),
        color: str((p.color?.rich_text as Array<{ plain_text: string }>)?.[0]?.plain_text) || '#1a1a1a',
        logo: firstFileProxy(p.logo?.files as AnyProp[] ?? []),
        link: str((p.link as AnyProp)?.url) || null,
      }
    })

    // ── Clients DB
    const clients: ClientItem[] = clientResults.map(page => {
      const p = page.properties as Record<string, AnyProp>
      const nameArr = (p.name ?? p.Name) as AnyProp
      return {
        id: page.id,
        name: str((nameArr?.title as Array<{ plain_text: string }>)?.[0]?.plain_text),
        link: str((p.link as AnyProp)?.url) || null,
      }
    })

    return { bioText, capabilities, avatarUrl, openToWork, experience, awards, relevantProjects, clients }
  } catch (err) {
    console.error('[notion] getBio error:', err)
    return null
  }
}
