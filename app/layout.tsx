import type { Metadata } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Portfólio";
const siteRole = process.env.NEXT_PUBLIC_SITE_ROLE ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description = siteRole ? `${siteName} — ${siteRole}` : siteName;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { template: `%s — ${siteName}`, default: siteName },
  description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    url: "/",
    title: siteName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <div className="animate-page-in">{children}</div>
      </body>
    </html>
  );
}
