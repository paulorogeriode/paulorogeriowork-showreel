import Link from 'next/link'

interface AvatarImageProps {
  src: string | null | undefined
  name: string
  size?: number
}

export function AvatarImage({ src, name, size = 48 }: AvatarImageProps) {
  const initials = name.slice(0, 2).toUpperCase()
  const px = `${size}px`

  const inner = src ? (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className="rounded-full object-contain flex-shrink-0 bg-border"
      style={{ width: px, height: px }}
    />
  ) : (
    <div
      className="rounded-full bg-border flex items-center justify-center flex-shrink-0 text-xs text-muted"
      style={{ width: px, height: px }}
    >
      <span className="text-sm">{initials}</span>
    </div>
  )

  return (
    <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
      {inner}
    </Link>
  )
}
