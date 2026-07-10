import type { ProjectItem } from '@/lib/notion'

function LogoBadge({ item }: { item: ProjectItem }) {
  if (item.logo) {
    return (
      <img
        src={item.logo}
        alt={item.name}
        width={32}
        height={32}
        className="w-8 h-8 rounded-sm object-cover flex-shrink-0"
      />
    )
  }
  const initials = item.name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()
  return (
    <div
      className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 text-[9px] font-medium text-white/80"
      style={{ backgroundColor: item.color }}
    >
      {initials}
    </div>
  )
}

export function RelevantProjects({ items }: { items: ProjectItem[] }) {
  if (!items.length) return null
  return (
    <div>
      <p className="text-[10px] text-muted/50 uppercase tracking-widest px-6 py-3 border-b border-border">
        Relevant Projects
      </p>
      {items.map(item => {
        const content = (
          <>
            <LogoBadge item={item} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-fg leading-tight truncate">{item.name}</p>
              <p className="text-[10px] text-muted mt-0.5">{item.type}</p>
            </div>
            {item.link && (
              <span className="text-muted/40 text-[10px] flex-shrink-0">↗</span>
            )}
          </>
        )
        if (item.link) {
          return (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 border-b border-border hover:bg-white/[0.03] transition-colors"
            >
              {content}
            </a>
          )
        }
        return (
          <div key={item.id} className="flex items-center gap-3 px-6 py-3 border-b border-border">
            {content}
          </div>
        )
      })}
    </div>
  )
}
