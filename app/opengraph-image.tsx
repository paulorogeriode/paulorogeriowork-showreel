import { ImageResponse } from "next/og"

export const alt = process.env.NEXT_PUBLIC_SITE_NAME ?? "Portfólio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadInterTight(weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Inter+Tight:wght@${weight}&display=swap`
  ).then((res) => res.text())
  const fontUrl = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1]
    ?? css.match(/url\((.+?)\)/)?.[1]
  if (!fontUrl) throw new Error("Inter Tight font URL not found")
  return fetch(fontUrl).then((res) => res.arrayBuffer())
}

export default async function Image() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Portfólio"
  const siteRole = process.env.NEXT_PUBLIC_SITE_ROLE ?? ""
  const initial = (siteName.trim()[0] ?? "P").toUpperCase()

  const [regular, light] = await Promise.all([
    loadInterTight(600),
    loadInterTight(300),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0a",
          color: "#f0f0f0",
          fontFamily: "Inter Tight",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #2a2a2a",
            fontSize: 34,
            fontWeight: 600,
            color: "#f0f0f0",
          }}
        >
          {initial}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 600 }}>{siteName}</div>
          {siteRole && (
            <div style={{ fontSize: 32, fontWeight: 300, color: "#a0a0a0", marginTop: 16 }}>
              {siteRole}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: regular, weight: 600, style: "normal" },
        { name: "Inter Tight", data: light, weight: 300, style: "normal" },
      ],
    }
  )
}
