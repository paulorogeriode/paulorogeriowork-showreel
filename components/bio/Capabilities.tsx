export function Capabilities({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <div className="border-t border-border pt-5 mt-5">
      <p className="text-[10px] text-muted/50 uppercase tracking-widest mb-3">Capabilities</p>
      <div className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <span key={i} className="text-xs text-muted hover:text-fg transition-colors cursor-default">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
