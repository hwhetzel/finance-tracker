'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrency, calculateTotalExpenses, isInMonth } from '@/utils/helpers'
import styles from './YearOverview.module.css'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Bar chart of total spending per month across the given year.
// Gives a big-picture view of trends that the month-by-month dashboard view can't show.
export default function YearOverview({ year }) {
  const { transactions } = useFinance()

  // Build one data point per month: total expenses for that month/year
  const chartData = MONTH_LABELS.map((label, index) => {
    const monthTransactions = transactions.filter(t => isInMonth(t, index, year))
    return {
      month: label,
      total: calculateTotalExpenses(monthTransactions)
    }
  })

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Year Overview — {year}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
          <YAxis stroke="var(--color-text-muted)" fontSize={12} />
          <Tooltip formatter={value => formatCurrency(value)} />
          <Bar dataKey="total" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}