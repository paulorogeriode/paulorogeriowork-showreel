import { Clock } from "./Clock"

export function Footer() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ""
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? ""
  const behance = process.env.NEXT_PUBLIC_BEHANCE_URL ?? ""
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? ""
  const twitter = process.env.NEXT_PUBLIC_TWITTER_URL ?? ""
  const city = process.env.NEXT_PUBLIC_SITE_CITY ?? ""
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-6 md:px-10 py-6 mt-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted">
        <div className="flex flex-wrap items-center gap-4">
          {email && (
            <a href={`mailto:${email}`} className="hover:text-fg transition-colors">
              {email}
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              LinkedIn ↗
            </a>
          )}
          {behance && (
            <a href={behance} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              Behance ↗
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              Instagram ↗
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">
              Twitter ↗
            </a>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>© {year}</span>
          {city && <span className="uppercase tracking-widest">{city}</span>}
          <Clock />
        </div>
      </div>
    </footer>
  )
}
