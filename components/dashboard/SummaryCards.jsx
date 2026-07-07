'use client'

import { useFinance } from '@/hooks/useFinance'
import { formatCurrency, calculateTotalIncome, calculateTotalExpenses, calculateNetBalance, isInMonth } from '@/utils/helpers'
import styles from './SummaryCards.module.css'

// Three cards showing income, expenses, and net balance for the selected month.
// Filters the full transaction list down to just the selected month before calculating totals.
export default function SummaryCards({ month, year }) {
  const { transactions } = useFinance()

  const monthTransactions = transactions.filter(t => isInMonth(t, month, year))

  const totalIncome = calculateTotalIncome(monthTransactions)
  const totalExpenses = calculateTotalExpenses(monthTransactions)
  const netBalance = calculateNetBalance(monthTransactions)

  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <span className={styles.label}>Income</span>
        <span className={`${styles.value} ${styles.income}`}>{formatCurrency(totalIncome)}</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Expenses</span>
        <span className={`${styles.value} ${styles.expense}`}>{formatCurrency(totalExpenses)}</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Net Balance</span>
        <span className={`${styles.value} ${netBalance >= 0 ? styles.income : styles.expense}`}>{formatCurrency(netBalance)}</span>
      </div>
    </div>
  )
}