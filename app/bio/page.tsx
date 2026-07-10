import { getBio } from '@/lib/notion'
import { SidebarContact } from '@/components/SidebarContact'
import { AvatarImage } from '@/components/AvatarImage'
import { BioText } from '@/components/bio/BioText'
import { Capabilities } from '@/components/bio/Capabilities'
import { Experience } from '@/components/bio/Experience'
import { Awards } from '@/components/bio/Awards'
import { RelevantProjects } from '@/components/bio/RelevantProjects'
import { Clients } from '@/components/bio/Clients'
import Link from 'next/link'

export const revalidate = 3600

export const metadata = {
  title: `Info — ${process.env.NEXT_PUBLIC_SITE_NAME}`,
}

export default async function BioPage() {
  const bio = await getBio()

  const hasCol3 = (bio?.experience?.length ?? 0) > 0 || (bio?.awards?.length ?? 0) > 0
  const hasCol4 = (bio?.relevantProjects?.length ?? 0) > 0 || (bio?.clients?.length ?? 0) > 0

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
        <div className="flex items-center gap-2">
          <Link href="/contact" className="border border-border rounded-full px-3 py-1.5 text-xs hover:bg-white/5 transition-colors">
            Message
          </Link>
          <Link href="/" className="border border-border rounded-full px-3 py-1.5 text-xs hover:bg-white/5 transition-colors">
            ← Back
          </Link>
        </div>
      </div>

      {/* Col 2: Bio + Capabilities */}
      <div className="md:ml-[280px] w-full md:w-[320px] flex-shrink-0 border-b md:border-b-0 md:border-r border-border flex flex-col mt-[49px] md:mt-0">
        <div className="p-6 border-b border-border">
          <p className="text-[10px] text-muted/50 uppercase tracking-widest mb-4">Info</p>
          <BioText paragraphs={bio?.bioText ?? []} />
          <Capabilities items={bio?.capabilities ?? []} />
        </div>
      </div>

      {/* Col 3: Experience + Awards */}
      {hasCol3 && (
        <div className="w-full md:w-[320px] flex-shrink-0 border-b md:border-b-0 md:border-r border-border flex flex-col">
          <Experience items={bio?.experience ?? []} />
          <Awards groups={bio?.awards ?? []} />
        </div>
      )}

      {/* Col 4: Relevant Projects + Clients */}
      {hasCol4 && (
        <div className="flex-1 flex flex-col md:border-r border-border">
          <RelevantProjects items={bio?.relevantProjects ?? []} />
          <Clients items={bio?.clients ?? []} />
        </div>
      )}

    </div>
  )
}
