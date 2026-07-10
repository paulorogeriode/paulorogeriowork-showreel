"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LayoutToggle } from "./LayoutToggle"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Portfolio"
  const siteRole = process.env.NEXT_PUBLIC_SITE_ROLE ?? ""
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ""

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 text-sm font-display font-light hover:opacity-70 transition-opacity">
        <span>{siteName}</span>
        {siteRole && (
          <>
            <span className="text-muted hidden md:inline">·</span>
            <span className="text-muted text-xs hidden md:inline">{siteRole}</span>
          </>
        )}
      </Link>

      <nav className="flex items-center gap-2">
        <LayoutToggle />
        <Link
          href={`mailto:${contactEmail}`}
          className="hidden md:inline-flex items-center gap-1 border border-border rounded-full px-4 py-1.5 text-xs hover:bg-white/5 transition-colors"
        >
          Send a message <span className="text-muted">↗</span>
        </Link>
        <Link
          href="/bio"
          className="inline-flex items-center border border-border rounded-full px-4 py-1.5 text-xs hover:bg-white/5 transition-colors"
        >
          Info +
        </Link>
      </nav>
    </header>
  )
}
