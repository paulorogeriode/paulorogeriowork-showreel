'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Clock } from './Clock'
import { AvatarImage } from './AvatarImage'

interface SidebarContactProps {
  avatarUrl?: string | null
  openToWork?: boolean
}

export function SidebarContact({ avatarUrl, openToWork }: SidebarContactProps) {
  const [copied, setCopied] = useState(false)

  const name  = process.env.NEXT_PUBLIC_SITE_NAME  ?? ''
  const role  = process.env.NEXT_PUBLIC_SITE_ROLE  ?? ''
  const city  = process.env.NEXT_PUBLIC_SITE_CITY  ?? ''
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
  const meetingUrl = process.env.NEXT_PUBLIC_MEETING_URL ?? ''
  const year  = new Date().getFullYear()
  const cityCode = city.slice(0, 2).toUpperCase()

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] bg-bg border-r border-border flex-col z-40">

      {/* Identidade */}
      <div className="p-5 pb-4">
        <AvatarImage src={avatarUrl} name={name} size={48} />
        <p className="text-sm font-medium text-fg leading-tight mt-3">{name}</p>
        <p className="text-xs text-muted mt-0.5">{role}{city ? `, based in ${city}` : ''}</p>
        <div className="flex items-center gap-1.5 mt-2.5">
          <span className="relative flex h-1.5 w-1.5">
            {openToWork && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            )}
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${openToWork ? 'bg-green-400' : 'bg-red-400'}`} />
          </span>
          <span className="text-[10px] text-muted">
            {openToWork ? 'Open to work' : 'Not open to new work'}
          </span>
        </div>
      </div>

      {/* Go back */}
      <div className="border-t border-border">
        <Link
          href="/"
          className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors group"
        >
          <span>Go back</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40 group-hover:opacity-80 transition-opacity rotate-180">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Email copy */}
      <div className="border-t border-border">
        <button
          onClick={copyEmail}
          className="w-full flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
        >
          <span>{copied ? 'Copied!' : 'Email'}</span>
          {!copied && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 flex-shrink-0">
              <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M8 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.1"/>
            </svg>
          )}
        </button>
      </div>

      {/* Meeting call */}
      {meetingUrl && (
        <div className="border-t border-border">
          <a
            href={meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
          >
            <span>Meeting call</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 flex-shrink-0">
              <rect x="1.5" y="2" width="9" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M1.5 4.5h9M3.5 1v1.5M8.5 1v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      )}

      <div className="flex-1" />

      {/* Footer */}
      <div className="border-t border-border px-5 py-4 flex items-center justify-between">
        <span className="text-[10px] text-muted/50">© {year}</span>
        <div className="flex items-center gap-2 text-[10px] text-muted/50 font-mono uppercase tracking-wider">
          {cityCode && <span>{cityCode}</span>}
          <Clock />
        </div>
      </div>
    </aside>
  )
}
