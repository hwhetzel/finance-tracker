'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

// Left sidebar — navigation between the five main pages.
// usePathname tells us the current route so we can highlight the active link.
const NAV_ITEMS = [
  { href: '/', label: 'Dashboard' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/budgets', label: 'Budgets' },
  { href: '/savings', label: 'Savings' },
  { href: '/accounts', label: 'Accounts' }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${pathname === item.href ? styles.active : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}