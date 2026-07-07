'use client'

import { useFinance } from '@/hooks/useFinance'
import { formatCurrency, formatDate, isInMonth } from '@/utils/helpers'
import styles from './MonthlyOverview.module.css'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Month selector with prev/next arrows, plus a list of that month's transactions below it.
// month/year and the change handler are lifted up to the dashboard page so SummaryCards
// stays in sync with whichever month is selected here.
export default function MonthlyOverview({ month, year, onMonthChange }) {
  const { transactions } = useFinance()

  const monthTransactions = transactions
    .filter(t => isInMonth(t, month, year))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  function goToPreviousMonth() {
    if (month === 0) {
      onMonthChange(11, year - 1)
    } else {
      onMonthChange(month - 1, year)
    }
  }

  function goToNextMonth() {
    if (month === 11) {
      onMonthChange(0, year + 1)
    } else {
      onMonthChange(month + 1, year)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={goToPreviousMonth} className={styles.arrow}>←</button>
        <span className={styles.monthLabel}>{MONTH_NAMES[month]} {year}</span>
        <button onClick={goToNextMonth} className={styles.arrow}>→</button>
      </div>

      <div className={styles.list}>
        {monthTransactions.length === 0 && (
          <p className={styles.empty}>No transactions this month.</p>
        )}
        {monthTransactions.map(transaction => (
          <div key={transaction.id} className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.category}>{transaction.category}</span>
              <span className={styles.description}>{transaction.description}</span>
            </div>
            <div className={styles.rowRight}>
              <span className={styles.date}>{formatDate(transaction.date)}</span>
              <span className={transaction.type === 'income' ? styles.income : styles.expense}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}