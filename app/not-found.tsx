import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted text-xs uppercase tracking-widest">404</p>
        <h1 className="font-display text-4xl font-light">Página não encontrada</h1>
        <Link href="/" className="text-xs text-muted hover:text-fg transition-colors">
          ← Voltar ao início
        </Link>
      </main>
      <Footer />
    </>
  )
}
