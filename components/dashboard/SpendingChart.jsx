'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useFinance } from '@/hooks/useFinance'
import { formatCurrency, isInMonth } from '@/utils/helpers'
import styles from './SpendingChart.module.css'

// Colors assigned per category — order matches the categories used across the app
// so the same category always gets the same color everywhere a chart appears.
const CATEGORY_COLORS = {
  Food: '#f59e0b',
  Rent: '#6366f1',
  Bills: '#3b82f6',
  Entertainment: '#ec4899',
  Transport: '#14b8a6',
  Shopping: '#a855f7',
  Health: '#ef4444',
  Other: '#6b7280'
}

// Pie chart of expense spending by category for the selected month.
// Only expenses are included — income doesn't belong in a "spending breakdown".
export default function SpendingChart({ month, year }) {
  const { transactions } = useFinance()

  const monthExpenses = transactions.filter(t => t.type === 'expense' && isInMonth(t, month, year))

  // Group expenses by category into { category, total } pairs for the chart
  const categoryTotals = monthExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total
  }))

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Spending by Category</h3>
      {chartData.length === 0 ? (
        <p className={styles.empty}>No expenses this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map(entry => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#6b7280'} />
              ))}
            </Pie>
            <Tooltip formatter={value => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}