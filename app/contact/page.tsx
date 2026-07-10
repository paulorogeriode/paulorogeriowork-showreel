import { getBio } from '@/lib/notion'
import { SidebarContact } from '@/components/SidebarContact'
import { AvatarImage } from '@/components/AvatarImage'
import { ContactForm } from '@/components/ContactForm'
import Link from 'next/link'

export const revalidate = 3600

export const metadata = {
  title: `Contact — ${process.env.NEXT_PUBLIC_SITE_NAME}`,
}

const links = [
  { label: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '', href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}` },
  { label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#' },
  { label: 'Behance', href: process.env.NEXT_PUBLIC_BEHANCE_URL ?? '#' },
  { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#' },
  { label: 'Twitter', href: process.env.NEXT_PUBLIC_TWITTER_URL ?? '#' },
]

export default async function ContactPage() {
  const bio = await getBio()

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Col 1: Sidebar */}
      <SidebarContact avatarUrl={bio?.avatarUrl} openToWork={bio?.openToWork} />

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-border bg-bg">
        <div className="flex items-center gap-3">
          <AvatarImage src={bio?.avatarUrl} name={process.env.NEXT_PUBLIC_SITE_NAME ?? ''} size={36} />
          <div>
            <p className="text-sm font-medium">{process.env.NEXT_PUBLIC_SITE_NAME}</p>
            <p className="text-[10px] text-muted">{process.env.NEXT_PUBLIC_SITE_ROLE}</p>
          </div>
        </div>
        <Link href="/" className="border border-border rounded-full px-3 py-1.5 text-xs hover:bg-white/5 transition-colors">
          ← Back
        </Link>
      </div>

      {/* Col 2: Get in touch + links */}
      <div className="md:ml-[280px] w-full md:w-[340px] flex-shrink-0 border-b md:border-b-0 md:border-r border-border flex flex-col mt-[49px] md:mt-0">
        <div className="p-6 pb-5 border-b border-border">
          <p className="text-sm font-medium text-fg mb-1">Get in touch</p>
          <p className="text-xs text-muted leading-relaxed">
            For new projects, collaborations, or general inquiries, feel free to get in touch.
          </p>
        </div>

        <div className="border-b border-border">
          <p className="px-6 py-3 text-[10px] text-muted/50 uppercase tracking-widest">Links</p>
        </div>

        {links.filter(l => l.label).map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="flex items-center justify-between px-6 py-3.5 border-b border-border text-xs text-muted hover:text-fg hover:bg-white/[0.03] transition-colors group"
          >
            <span>{link.label}</span>
            <span className="text-muted/40 group-hover:text-muted transition-colors text-[10px]">↗</span>
          </a>
        ))}
      </div>

      {/* Col 3: Formulário */}
      <div className="flex-1 flex flex-col border-r border-border min-h-screen">
        <ContactForm />
      </div>

    </div>
  )
}
