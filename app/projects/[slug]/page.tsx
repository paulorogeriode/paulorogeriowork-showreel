import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"
import { getProjectBySlug, getAllSlugs, getProjectBlocks } from "@/lib/notion"
import { cookieName, verify } from "@/lib/project-unlock"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProjectGallery } from "@/components/ProjectGallery"
import { PasswordGate } from "@/components/PasswordGate"
import { IconArrowLeft } from "@/components/icons"

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Portfolio"
  return {
    title: project ? `${project.title} — ${siteName}` : "Projeto não encontrado",
    description: project?.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  if (project.isProtected) {
    const store = await cookies()
    const unlocked = verify(project.id, store.get(cookieName(project.id))?.value)
    if (!unlocked) return <PasswordGate slug={slug} />
  }

  const blocks = await getProjectBlocks(project.id)
  const contained = project.contentWidth !== "full"

  const meta = [project.client, project.year || null, project.category]
    .filter(Boolean)
    .join(" · ")

  return (
    <>
      <Header />
      <main className="pt-24">
        <div
          className={`pb-10 flex flex-col gap-6 ${
            contained
              ? "max-w-4xl mx-auto px-3 items-center"
              : "px-6 md:px-10 items-start"
          }`}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 border border-border rounded-full px-4 py-1.5 text-xs hover:bg-white/5 transition-colors w-fit"
          >
            <IconArrowLeft size={14} /> Back
          </Link>
          <div className={contained ? "w-full text-center" : "text-left"}>
            <h1 className="font-display text-3xl md:text-5xl font-light leading-tight">{project.title}</h1>
            {meta && <p className="text-xs text-muted mt-2">{meta}</p>}
            {project.description && (
              <p className={`text-sm text-fg/70 mt-3 max-w-md ${contained ? "mx-auto" : ""}`}>
                {project.description}
              </p>
            )}
          </div>
        </div>

        <div className="px-3 pb-16">
          <ProjectGallery media={project.media} videoUrls={project.videoUrls} blocks={blocks} contentWidth={project.contentWidth} />
        </div>
      </main>
      <Footer />
    </>
  )
}
