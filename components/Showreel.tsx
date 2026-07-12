'use client'

import { useEffect, useState } from 'react'

interface ShowreelProps {
  vimeoUrl: string
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}

export function Showreel({ vimeoUrl }: ShowreelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const id = getVimeoId(vimeoUrl)

  // Fecha com ESC e trava o scroll do body quando o modal está aberto
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!id) return null

  const backgroundSrc = `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`
  const modalSrc = `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`

  return (
    <>
      {/* Bloco 16:9 acima do grid */}
      <div className="p-[3px]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative block w-full aspect-video overflow-hidden bg-border cursor-pointer"
          aria-label="Assistir showreel"
        >
          {/* Vídeo ambiente, mudo, em loop, sem controles */}
          <iframe
            src={backgroundSrc}
            className="absolute inset-0 w-full h-full pointer-events-none scale-[1.02] group-hover:scale-105 transition-transform duration-700"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ border: 0 }}
            title="Showreel preview"
          />

          {/* Camada escura para legibilidade */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />

          {/* Texto central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="font-inter font-normal text-4xl md:text-6xl lg:text-7xl tracking-tight text-fg">
              Showreel
            </span>

            <span className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-fg/80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="w-5 h-5 rounded-full border border-fg/50 flex items-center justify-center">
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                  <path d="M0.5 0.5L6.5 4L0.5 7.5V0.5Z" fill="currentColor" />
                </svg>
              </span>
              Play Reel
            </span>
          </div>
        </button>
      </div>

      {/* Modal / lightbox com o player completo */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 md:top-8 md:right-8 w-9 h-9 flex items-center justify-center rounded-full border border-fg/30 text-fg hover:bg-white/10 transition-colors"
            aria-label="Fechar showreel"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>

          <div
            className="w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={modalSrc}
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
              title="Showreel"
            />
          </div>
        </div>
      )}
    </>
  )
}
