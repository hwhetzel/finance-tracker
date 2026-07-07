import '@/styles/globals.css'
import { FinanceProvider } from '@/context/FinanceContext'

export const metadata = {
  title: 'Finance Tracker',
  description: 'Track your income, expenses, budgets, and savings goals'
}

// Root layout — wraps every page with global state and persistent UI
// (Navbar and Sidebar get added here in Step 5)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FinanceProvider>
          {children}
        </FinanceProvider>
      </body>
    </html>
  )
}
