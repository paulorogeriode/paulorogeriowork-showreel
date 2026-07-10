'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { unlockProject, type UnlockState } from '@/app/projects/[slug]/actions'
import { IconLock } from '@/components/icons'

interface PasswordGateProps {
  slug: string
}

const initialState: UnlockState = {}

export function PasswordGate({ slug }: PasswordGateProps) {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(unlockProject, initialState)

  useEffect(() => {
    if (state.success) router.refresh()
  }, [state.success, router])

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted">
          <IconLock size={18} />
        </div>

        <h1 className="font-display text-xl font-light">Projeto protegido</h1>
        <p className="text-sm text-muted mt-2">Digite a senha para visualizar este projeto.</p>

        <form action={formAction} className="mt-6 flex flex-col gap-3">
          <input type="hidden" name="slug" value={slug} />
          <input
            type="password"
            name="password"
            autoFocus
            autoComplete="off"
            placeholder="Senha"
            className="w-full bg-transparent border border-border rounded-full px-4 py-2.5 text-sm text-center outline-none focus:border-fg/40 transition-colors"
          />
          <button
            type="submit"
            disabled={pending}
            className="w-full border border-border rounded-full px-4 py-2.5 text-sm hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            {pending ? 'Verificando…' : 'Desbloquear'}
          </button>
        </form>

        {state.error && <p className="text-xs text-red-400/80 mt-3">{state.error}</p>}

        <Link
          href="/"
          className="inline-block text-xs text-muted hover:text-fg transition-colors mt-6"
        >
          ← Voltar
        </Link>
      </div>
    </main>
  )
}
