import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LayoutMode = 'grid' | 'horizontal'

interface LayoutStore {
  mode: LayoutMode
  toggle: () => void
}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set, get) => ({
      mode: 'grid',
      toggle: () => set({ mode: get().mode === 'grid' ? 'horizontal' : 'grid' }),
    }),
    { name: 'portfolio-layout' }
  )
)
