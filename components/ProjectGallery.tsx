import type { ReactNode } from "react"
import type { ProjectBlock, ContentWidth } from "@/lib/types"

interface ProjectGalleryProps {
  media: string[]
  videoUrls: string[]
  blocks?: ProjectBlock[]
  contentWidth?: ContentWidth
}

function youtubeEmbed(id: string): string {
  const p = new URLSearchParams({
    autoplay: "1", mute: "1", loop: "1", playlist: id,
    controls: "1", rel: "0", modestbranding: "1", playsinline: "1",
  })
  return `https://www.youtube.com/embed/${id}?${p.toString()}`
}

function getEmbedUrl(url: string): string | null {
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v")
    return id ? youtubeEmbed(id) : null
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0]
    return id ? youtubeEmbed(id) : null
  }
  if (url.includes("youtube.com/embed/")) {
    const id = url.split("youtube.com/embed/")[1]?.split(/[?&/]/)[0]
    return id ? youtubeEmbed(id) : url
  }
  if (url.includes("vimeo.com")) {
    const idMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    if (!idMatch) return null
    const id = idMatch[1]
    const hashMatch = url.match(/(?:vimeo\.com\/(?:video\/)?\d+\/|[?&]h=)([0-9a-zA-Z]+)/)
    const p = new URLSearchParams({
      autoplay: "1", muted: "1", loop: "1",
      title: "0", byline: "0", portrait: "0", dnt: "1",
    })
    if (hashMatch) p.set("h", hashMatch[1])
    return `https://player.vimeo.com/video/${id}?${p.toString()}`
  }
  return null
}

function VideoEmbed({ url }: { url: string }) {
  const embedUrl = getEmbedUrl(url)

  if (embedUrl) {
    return (
      <div className="w-full aspect-video">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (url.includes(".mp4")) {
    return (
      <div className="w-full aspect-video">
        <video src={url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>
    )
  }

  return null
}

function renderBlock(block: ProjectBlock, key: string, textBlockCls: string): ReactNode {
  switch (block.type) {
    case "image":
      return (
        <div key={key} className="w-full overflow-hidden bg-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt="" className="w-full h-auto block" loading="lazy" />
        </div>
      )

    case "video":
      return <VideoEmbed key={key} url={block.url} />

    case "heading": {
      const cls =
        block.level === 1
          ? "text-2xl md:text-3xl"
          : block.level === 2
            ? "text-xl md:text-2xl"
            : "text-lg md:text-xl"
      return (
        <h2
          key={key}
          className={`font-display font-light leading-tight ${textBlockCls} pt-6 md:pt-8 max-w-2xl ${cls}`}
        >
          {block.text}
        </h2>
      )
    }

    case "columns":
      return (
        <div key={key} className="flex flex-col md:flex-row gap-3 md:gap-4 items-start">
          {block.columns.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 w-full flex flex-col gap-3">
              {col.map((b, bi) => renderBlock(b, `${key}-${ci}-${bi}`, ""))}
            </div>
          ))}
        </div>
      )

    case "text":
      return (
        <p
          key={key}
          className={`text-sm md:text-base text-fg/70 leading-relaxed ${textBlockCls} py-2 max-w-2xl whitespace-pre-line`}
        >
          {block.text}
        </p>
      )
  }
}

export function ProjectGallery({ media, videoUrls, blocks, contentWidth = "contained" }: ProjectGalleryProps) {
  const contained = contentWidth !== "full"

  const wrapperCls = contained
    ? "flex flex-col gap-3 md:gap-4 max-w-4xl mx-auto px-3"
    : "flex flex-col gap-2 md:gap-3"
  const textBlockCls = contained ? "text-center mx-auto" : "px-3 md:px-7"

  /* ── MODO CORPO DA PÁGINA (texto, imagens, vídeos e colunas) ───────── */
  if (blocks && blocks.length > 0) {
    return (
      <div className={wrapperCls}>
        {blocks.map((block, i) => renderBlock(block, String(i), textBlockCls))}
      </div>
    )
  }

  /* ── MODO LEGADO (media + videoUrls) ──────────────────── */
  const items: Array<{ type: "image"; src: string } | { type: "video"; url: string }> = []

  const totalMedia = media.length
  const totalVideos = videoUrls.length

  let mi = 0
  let vi = 0

  while (mi < totalMedia || vi < totalVideos) {
    if (mi < totalMedia) { items.push({ type: "image", src: media[mi++] }) }
    if (mi < totalMedia) { items.push({ type: "image", src: media[mi++] }) }
    if (vi < totalVideos) { items.push({ type: "video", url: videoUrls[vi++] }) }
  }

  return (
    <div className={wrapperCls}>
      {items.map((item, i) => {
        if (item.type === "image") {
          return (
            <div key={i} className="w-full overflow-hidden bg-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt=""
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          )
        }

        const embedUrl = getEmbedUrl(item.url)

        if (embedUrl) {
          return (
            <div key={i} className="w-full aspect-video">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )
        }

        if (item.url.includes(".mp4")) {
          return (
            <div key={i} className="w-full aspect-video">
              <video
                src={item.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
