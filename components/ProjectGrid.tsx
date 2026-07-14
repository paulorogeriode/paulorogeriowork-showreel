'use client'

import { useRef, useState, useEffect } from 'react'
import { useLayoutStore } from '@/lib/layout-store'
import { ProjectCard } from './ProjectCard'
import type { Project, GridSize } from '@/lib/types'

interface ProjectGridProps {
  projects: Project[]
}

const horizontalWidths: Record<GridSize, string> = {
  small:  '260px',
  medium: '360px',
  large:  '520px',
}

// CSS multi-column (`columns-N`) fills one column top-to-bottom before
// moving to the next, which breaks reading order (Order 1,2,3,4 ends up
// as col1: 1,2,3 / col2: 4,5,6 instead of row-major). Distributing items
// into explicit columns round-robin keeps them in the intended Order.
function distributeColumns(projects: Project[], columnCount: number) {
  const columns: { project: Project; index: number }[][] = Array.from({ length: columnCount }, () => [])
  projects.forEach((project, i) => columns[i % columnCount].push({ project, index: i }))
  return columns
}

function useColumnCount() {
  const [columns, setColumns] = useState(2)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setColumns(mq.matches ? 3 : 2)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return columns
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { mode } = useLayoutStore()
  const columnCount = useColumnCount()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  const prevMode = useRef(mode)
  useEffect(() => {
    if (prevMode.current !== mode && mode === 'horizontal') {
      setHasScrolled(false)
      prevMode.current = mode
    }
  }, [mode])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || mode !== 'horizontal') return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
        setHasScrolled(true)
      }
    }
    const onScroll = () => setHasScrolled(true)

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', onScroll)
    }
  }, [mode])

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted text-sm">
        Nenhum projeto publicado ainda.
      </div>
    )
  }

  /* ── MODO HORIZONTAL ──────────────────────────────────── */
  if (mode === 'horizontal') {
    return (
      <>
        <div
          key="horizontal"
          ref={scrollRef}
          className="flex flex-row gap-[3px] h-[calc(100vh-41px)] overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-fade-in"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="flex-shrink-0 h-full animate-fade-in"
              style={{
                width: horizontalWidths[project.gridSize],
                animationDelay: `${i * 40}ms`,
              }}
            >
              <ProjectCard project={project} priority={i < 3} fillHeight />
            </div>
          ))}
          <div className="flex-shrink-0 w-6" aria-hidden />
        </div>

        {!hasScrolled && (
          <div className="fixed bottom-8 right-8 text-[10px] text-muted/40 tracking-widest uppercase pointer-events-none animate-fade-in">
            scroll →
          </div>
        )}
      </>
    )
  }

  /* ── MODO MASONRY (colunas reais, ordem preservada) ─────── */
  const columns = distributeColumns(projects, columnCount)

  return (
    <div key="grid" className="animate-fade-in p-[3px] flex gap-[3px]">
      {columns.map((column, colIdx) => (
        <div key={colIdx} className="flex-1 min-w-0 flex flex-col gap-[3px]">
          {column.map(({ project, index }) => (
            <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              <ProjectCard project={project} priority={index < 4} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
