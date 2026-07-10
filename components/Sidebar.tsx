'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Clock } from './Clock'
import { AvatarImage } from './AvatarImage'

interface SidebarProps {
  avatarUrl?: string | null
}

export function Sidebar({ avatarUrl }: SidebarProps) {
  const [copied, setCopied] = useState(false)

  const name     = process.env.NEXT_PUBLIC_SITE_NAME  ?? ''
  const role     = process.env.NEXT_PUBLIC_SITE_ROLE  ?? ''
  const city     = process.env.NEXT_PUBLIC_SITE_CITY  ?? ''
  const email    = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? ''
  const behance  = process.env.NEXT_PUBLIC_BEHANCE_URL  ?? ''
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? ''
  const twitter  = process.env.NEXT_PUBLIC_TWITTER_URL ?? ''
  const year     = new Date().getFullYear()
  const cityCode = city.slice(0, 2).toUpperCase()

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] bg-bg border-r border-border flex-col z-40 overflow-y-auto [scrollbar-width:none]">

      {/* Identidade */}
      <div className="p-5 pb-4">
        <AvatarImage src={avatarUrl} name={name} size={48} />
        <p className="text-sm font-medium text-fg leading-tight mt-3">{name}</p>
        <p className="text-xs text-muted mt-0.5">{role}{city ? `, based in ${city}` : ''}</p>
      </div>

      {/* Info + Email */}
      <div className="border-t border-border">
        <Link
          href="/bio"
          className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
        >
          <span>Info</span>
          <span className="text-muted/40">+</span>
        </Link>
        <div className="border-t border-border">
          <button
            onClick={copyEmail}
            className="w-full flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
          >
            <span>{copied ? 'Copied!' : email}</span>
            {!copied && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 flex-shrink-0 ml-2">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M8 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border">
        <Link
          href="/contact"
          className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors group"
        >
          <span>Send me a message</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40 group-hover:opacity-80 transition-opacity">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Redes sociais */}
      <div className="border-t border-border">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
          >
            <span>LinkedIn</span>
            <span className="text-muted/40 text-[10px]">↗</span>
          </a>
        )}
        {behance && (
          <div className="border-t border-border">
            <a
              href={behance}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
            >
              <span>Behance</span>
              <span className="text-muted/40 text-[10px]">↗</span>
            </a>
          </div>
        )}
        {instagram && (
          <div className="border-t border-border">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
            >
              <span>Instagram</span>
              <span className="text-muted/40 text-[10px]">↗</span>
            </a>
          </div>
        )}
        {twitter && (
          <div className="border-t border-border">
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-3 text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors"
            >
              <span>Twitter</span>
              <span className="text-muted/40 text-[10px]">↗</span>
            </a>
          </div>
        )}
      </div>

      {/* ── Crédito do template ───────────────────────────────────────
          Backlink para a F&A Works. Para REMOVER o crédito do seu site,
          basta apagar este bloco inteiro (do <div> ao </div>). */}
      <div className="border-t border-border">
        <a
          href="https://templates.fsza.works"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-5 py-3 text-[11px] text-muted/60 hover:text-fg hover:bg-white/[0.03] transition-colors"
        >
          <span>Template by F&amp;A</span>
          <span className="text-muted/40 text-[10px]">↗</span>
        </a>
      </div>
      {/* ── Fim do crédito do template ────────────────────────────── */}

      {/* Espaçador */}
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
