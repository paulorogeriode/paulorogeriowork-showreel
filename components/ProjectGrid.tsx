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

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { mode } = useLayoutStore()
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

  /* ── MODO MASONRY (CSS columns) ───────────────────────── */
  return (
    <div
      key="grid"
      className="animate-fade-in p-[3px] columns-2 md:columns-3"
      style={{ columnGap: '3px' }}
    >
      {projects.map((project, i) => (
        <div
          key={project.id}
          className="break-inside-avoid mb-[3px] animate-fade-in"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <ProjectCard project={project} priority={i < 4} />
        </div>
      ))}
    </div>
  )
}
