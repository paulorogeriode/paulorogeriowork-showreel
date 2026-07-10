import Link from "next/link"
import type { Project } from "@/lib/types"
import { IconLock } from "@/components/icons"

interface ProjectCardProps {
  project: Project
  priority?: boolean
  fillHeight?: boolean
}

export function ProjectCard({ project, fillHeight = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block overflow-hidden bg-border ${fillHeight ? 'w-full h-full' : 'w-full'}`}
    >
      {project.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.cover}
          alt={project.title}
          className={
            fillHeight
              ? "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              : "w-full h-auto block group-hover:scale-105 transition-transform duration-500 origin-center"
          }
          loading="lazy"
        />
      )}

      {!project.cover && !fillHeight && (
        <div className="w-full aspect-square bg-border" />
      )}

      {project.isProtected && (
        <div className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-fg/80">
          <IconLock size={12} aria-label="Projeto protegido" />
        </div>
      )}

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="text-sm font-medium text-fg leading-tight">{project.title}</p>
        <p className="text-[10px] text-muted mt-0.5">
          {[project.client, project.year].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}
