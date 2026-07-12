'use client'

import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

// Top navbar — app name and dark/light toggle.
// Theme state lives here for now; toggling adds/removes the .dark class on <html>
// and persists the choice so it survives a page refresh.
export default function Navbar() {
  const [isDark, setIsDark] = useState(false)

  // The inline script in layout.jsx already applied the class before paint —
  // this just syncs React's state to match what's already on the page
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('finance_theme', next ? 'dark' : 'light')
  }

  return (
    <nav className={styles.navbar}>
      <span className={styles.title}>Finance Tracker</span>
      <button onClick={toggleTheme} className={styles.toggle}>
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}