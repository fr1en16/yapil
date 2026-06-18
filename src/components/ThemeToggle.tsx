'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    setTheme(savedTheme as 'light' | 'dark')
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }, [theme])

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'}
      className={`theme-toggle ${className}`}
      style={{
        position: 'fixed',
        top: '6px',
        right: '24px',
        zIndex: 100,
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        padding: 0,
        color: 'var(--fg-muted)',
      }}
    >
      <Sun
        size={16}
        style={{
          position: 'absolute',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
          transform: theme === 'light' ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
          opacity: theme === 'light' ? 1 : 0,
        }}
      />
      <Moon
        size={16}
        style={{
          position: 'absolute',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
          transform: theme === 'dark' ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
          opacity: theme === 'dark' ? 1 : 0,
        }}
      />
    </button>
  )
}
