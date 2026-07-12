import { getProjects, getBio } from "@/lib/notion"
import { Sidebar } from "@/components/Sidebar"
import { ProjectGrid } from "@/components/ProjectGrid"
import { LayoutToggle } from "@/components/LayoutToggle"
import { AvatarImage } from "@/components/AvatarImage"
import { Showreel } from "@/components/Showreel"
import Link from "next/link"

const SHOWREEL_VIMEO_URL = "https://vimeo.com/1201257181"

export const revalidate = 60

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  description: `Portfólio de ${process.env.NEXT_PUBLIC_SITE_NAME}`,
}

export default async function HomePage() {
  const [projects, bio] = await Promise.all([getProjects(), getBio()])

  return (
    <div className="flex min-h-screen">
      <Sidebar avatarUrl={bio?.avatarUrl} />

      <main className="md:ml-[280px] flex-1 min-w-0">
        {/* Header mobile */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 z-40 bg-bg">
          <div className="flex items-center gap-3">
            <AvatarImage src={bio?.avatarUrl} name={process.env.NEXT_PUBLIC_SITE_NAME ?? ''} size={36} />
            <div>
              <p className="text-sm font-medium">{process.env.NEXT_PUBLIC_SITE_NAME}</p>
              <p className="text-[10px] text-muted">{process.env.NEXT_PUBLIC_SITE_ROLE}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LayoutToggle />
            <Link href="/contact" className="border border-border rounded-full px-3 py-1.5 text-xs hover:bg-white/5 transition-colors">
              Message
            </Link>
            <Link href="/bio" className="border border-border rounded-full px-3 py-1.5 text-xs hover:bg-white/5 transition-colors">
              Info +
            </Link>
          </div>
        </header>

        {/* Barra de toggle desktop */}
        <div className="hidden md:flex sticky top-0 z-30 justify-end px-3 py-2 bg-bg/80 backdrop-blur-sm border-b border-border">
          <LayoutToggle />
        </div>

        <Showreel vimeoUrl={SHOWREEL_VIMEO_URL} />

        <ProjectGrid projects={projects} />
      </main>
    </div>
  )
}
