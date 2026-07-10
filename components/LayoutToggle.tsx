'use client'

import { useLayoutStore } from '@/lib/layout-store'

export function LayoutToggle() {
  const { mode, toggle } = useLayoutStore()

  return (
    <button
      onClick={toggle}
      aria-label={mode === 'grid' ? 'Mudar para scroll horizontal' : 'Mudar para grid'}
      className="flex items-center gap-1.5 border border-border rounded-full px-3 py-1.5 text-xs text-muted hover:text-fg hover:bg-white/5 transition-all duration-200"
    >
      <span className="w-3.5 h-3.5 flex items-center justify-center">
        {mode === 'grid' ? <IconHorizontal /> : <IconGrid />}
      </span>
      <span className="hidden sm:inline">
        {mode === 'grid' ? 'Film' : 'Grid'}
      </span>
    </button>
  )
}

function IconGrid() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0" y="0" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="8" y="0" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="0" y="8" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="8" y="8" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

function IconHorizontal() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0" y="1" width="4" height="12" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="5" y="1" width="4" height="12" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="10" y="1" width="4" height="12" rx="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
