import type { AwardGroup } from '@/lib/notion'

export function Awards({ groups }: { groups: AwardGroup[] }) {
  if (!groups.length) return null
  return (
    <div className="border-t border-border">
      <p className="text-[10px] text-muted/50 uppercase tracking-widest px-6 py-3 border-b border-border">
        Awards and Recognition
      </p>
      {groups.map((group, i) => (
        <div key={i} className="border-b border-border last:border-b-0">
          <p className="px-6 pt-3 pb-1 text-[10px] text-fg/60 font-medium">{group.group}</p>
          {group.items.map((item, j) => (
            <p key={j} className="px-6 py-1.5 text-[10px] text-muted leading-relaxed last:pb-3">
              {item}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}
