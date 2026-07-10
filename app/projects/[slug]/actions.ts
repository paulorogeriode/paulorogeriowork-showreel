'use server'

import { cookies } from 'next/headers'
import { getProjectBySlug, getProjectPassword } from '@/lib/notion'
import { cookieName, sign } from '@/lib/project-unlock'

export interface UnlockState {
  error?: string
  success?: boolean
}

export async function unlockProject(
  _prev: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const slug = String(formData.get('slug') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!slug || !password) {
    return { error: 'Informe a senha.' }
  }

  await new Promise((r) => setTimeout(r, 400))

  const [project, expected] = await Promise.all([
    getProjectBySlug(slug),
    getProjectPassword(slug),
  ])

  if (!project || !expected) {
    return { error: 'Projeto não encontrado ou sem senha.' }
  }

  if (password !== expected) {
    return { error: 'Senha incorreta.' }
  }

  const store = await cookies()
  store.set(cookieName(project.id), sign(project.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  return { success: true }
}
