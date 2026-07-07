import '@/styles/globals.css'
import { FinanceProvider } from '@/context/FinanceContext'
import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'

export const metadata = {
  title: 'Finance Tracker',
  description: 'Track your income, expenses, budgets, and savings goals'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
