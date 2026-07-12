import '@/styles/globals.css'
import { FinanceProvider } from '@/context/FinanceContext'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'

export const metadata = {
  title: 'Finance Tracker',
  description: 'Track your income, expenses, budgets, and savings goals'
}

// Runs before React hydrates, directly in the HTML, so the correct theme
// class is present on <html> before the very first paint — avoids a flash
// of light mode for users who have dark mode saved.
const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('finance_theme')
      if (saved === 'dark') {
        document.documentElement.classList.add('dark')
      }
    } catch (e) {}
  })()
`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <FinanceProvider>
          <Navbar />
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: 'var(--spacing-lg)' }}>
              {children}
            </main>
          </div>
        </FinanceProvider>
      </body>
    </html>
  )
}
