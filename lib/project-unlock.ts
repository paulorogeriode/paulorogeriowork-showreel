import { createHmac, timingSafeEqual } from 'node:crypto'

const SECRET = process.env.PROJECT_UNLOCK_SECRET ?? ''

export const cookieName = (projectId: string) => `pw_${projectId}`

export function sign(projectId: string): string {
  return createHmac('sha256', SECRET).update(projectId).digest('hex')
}

export function verify(projectId: string, value: string | undefined): boolean {
  if (!SECRET || !value) return false
  const expected = sign(projectId)
  if (value.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
  } catch {
    return false
  }
}
