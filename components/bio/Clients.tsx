import type { ClientItem } from '@/lib/notion'

export function Clients({ items }: { items: ClientItem[] }) {
  if (!items.length) return null
  return (
    <div className="border-t border-border">
      <p className="text-[10px] text-muted/50 uppercase tracking-widest px-6 py-3 border-b border-border">
        Clients and Collaborations
      </p>
      <div className="px-6 py-4 flex flex-col gap-2">
        {items.map(client => {
          if (client.link) {
            return (
              <a
                key={client.id}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted hover:text-fg transition-colors group w-fit"
              >
                <span>{client.name}</span>
                <span className="text-muted/40 group-hover:text-muted transition-colors text-[10px]">↗</span>
              </a>
            )
          }
          return (
            <span key={client.id} className="text-xs text-muted">
              {client.name}
            </span>
          )
        })}
      </div>
    </div>
  )
}
