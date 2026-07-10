'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  how: string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', how: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const update = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', how: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col justify-center h-full px-8 py-12 min-h-[400px]">
        <p className="text-2xl font-light mb-2">Message sent.</p>
        <p className="text-xs text-muted">I&apos;ll get back to you as soon as possible.</p>
      </div>
    )
  }

  const fieldClass = "w-full bg-transparent border-none outline-none text-xs text-muted placeholder:text-muted/40 focus:text-fg transition-colors"

  return (
    <div className="flex flex-col h-full min-h-screen">

      <div className="border-b border-border px-8 py-5">
        <label className="block text-xs font-medium text-fg mb-2">Name</label>
        <input type="text" value={form.name} onChange={update('name')} placeholder="Enter your name" className={fieldClass} />
      </div>

      <div className="border-b border-border px-8 py-5">
        <label className="block text-xs font-medium text-fg mb-2">Email</label>
        <input type="email" value={form.email} onChange={update('email')} placeholder="Enter your email" className={fieldClass} />
      </div>

      <div className="border-b border-border px-8 py-5">
        <label className="block text-xs font-medium text-fg mb-2">How did you hear about me?</label>
        <input type="text" value={form.how} onChange={update('how')} placeholder="Enter your answer" className={fieldClass} />
      </div>

      <div className="border-b border-border px-8 py-5 flex-1">
        <label className="block text-xs font-medium text-fg mb-2">How can I help?</label>
        <textarea
          value={form.message}
          onChange={update('message')}
          placeholder="Your message"
          rows={6}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={status === 'loading' || !form.name || !form.email || !form.message}
        className="flex items-center justify-between px-8 py-5 text-xs text-fg hover:bg-white/[0.03] disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
      >
        <span>{status === 'loading' ? 'Sending...' : 'Send your message'}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all">
          <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {status === 'error' && (
        <p className="px-8 pb-4 text-[10px] text-red-400/70">
          Something went wrong. Try again or email directly.
        </p>
      )}
    </div>
  )
}
