import { useContext } from 'react'
import { FinanceContext } from '@/context/FinanceContext'

// Components call this instead of importing FinanceContext directly.
// Throws a clear error if it's used outside the provider, instead of a
// confusing "cannot read property of null" error somewhere deep in a component.
export function useFinance() {
  const context = useContext(FinanceContext)

  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }

  return context
}