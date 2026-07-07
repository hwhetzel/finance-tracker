'use client'

import { useFinance } from '@/hooks/useFinance'
import { formatCurrency, calculatePercentUsed, calculateTotalExpenses, isInMonth } from '@/utils/helpers'
import styles from './BudgetCard.module.css'

// A single budget card — shows spent vs limit for the current month with a progress bar.
// Turns yellow at 80%+ and red at 100%+ so overspending is obvious at a glance.
export default function BudgetCard({ budget, onEdit, onDelete }) {
  const { transactions } = useFinance()

  const today = new Date()
  const monthExpenses = transactions.filter(t =>
    t.type === 'expense' &&
    t.category === budget.category &&
    isInMonth(t, today.getMonth(), today.getFullYear())
  )

  const spent = calculateTotalExpenses(monthExpenses)
  const percentUsed = calculatePercentUsed(spent, budget.limit)

  let barStatus = styles.barNormal
  if (percentUsed >= 100) barStatus = styles.barOver
  else if (percentUsed >= 80) barStatus = styles.barWarning

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{budget.category}</span>
        <div className={styles.actions}>
          <button onClick={() => onEdit(budget)} className={styles.actionButton}>Edit</button>
          <button onClick={() => onDelete(budget.id)} className={styles.deleteButton}>Delete</button>
        </div>
      </div>

      <div className={styles.amounts}>
        <span>{formatCurrency(spent)} spent</span>
        <span className={styles.limit}>of {formatCurrency(budget.limit)}</span>
      </div>

      <div className={styles.barTrack}>
        <div
          className={`${styles.barFill} ${barStatus}`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>

      {percentUsed >= 80 && (
        <span className={percentUsed >= 100 ? styles.warningOver : styles.warningNear}>
          {percentUsed >= 100 ? `Over budget by ${formatCurrency(spent - budget.limit)}` : 'Approaching limit'}
        </span>
      )}
    </div>
  )
}