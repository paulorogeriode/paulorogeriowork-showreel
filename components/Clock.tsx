"use client"

import { useEffect, useState } from "react"

export function Clock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="font-mono text-xs text-muted tabular-nums">{time}</span>
}
