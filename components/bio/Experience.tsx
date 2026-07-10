import type { ExperienceItem } from '@/lib/notion'

function LogoBadge({ item }: { item: ExperienceItem }) {
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
  const initials = item.name
    .split(/[\s,]+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
  return (
    <div
      className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 text-[9px] font-medium text-white/80"
      style={{ backgroundColor: item.color }}
    >
      {initials}
    </div>
  )
}

export function Experience({ items }: { items: ExperienceItem[] }) {
  if (!items.length) return null
  return (
    <div>
      <p className="text-[10px] text-muted/50 uppercase tracking-widest px-6 py-3 border-b border-border">
        Experience
      </p>
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-3 px-6 py-3.5 border-b border-border">
          <LogoBadge item={item} />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-fg leading-tight truncate">{item.name}</p>
            <p className="text-[10px] text-muted mt-0.5">{item.period}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
