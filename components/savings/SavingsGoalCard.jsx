'use client'

import { formatCurrency, calculatePercentUsed } from '@/utils/helpers'
import styles from './SavingsGoalCard.module.css'

// A single savings goal card — target, current amount, and a progress bar.
// Unlike budgets, hitting 100% here is a good thing, so the bar stays green
// throughout rather than turning red as it fills up.
export default function SavingsGoalCard({ goal, onEdit, onDelete }) {
  const percentSaved = calculatePercentUsed(goal.current, goal.target)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{goal.name}</span>
        <div className={styles.actions}>
          <button onClick={() => onEdit(goal)} className={styles.actionButton}>Log Progress</button>
          <button onClick={() => onDelete(goal.id)} className={styles.deleteButton}>Delete</button>
        </div>
      </div>

      <div className={styles.amounts}>
        <span>{formatCurrency(goal.current)} saved</span>
        <span className={styles.target}>of {formatCurrency(goal.target)}</span>
      </div>

      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${Math.min(percentSaved, 100)}%` }}
        />
      </div>

      <span className={styles.percent}>{percentSaved}% complete</span>
    </div>
  )
}