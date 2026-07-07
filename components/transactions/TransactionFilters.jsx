'use client'

import { useFinance } from '@/hooks/useFinance'
import { CATEGORIES } from '@/components/modals/AddTransactionModal'
import styles from './TransactionFilters.module.css'

// Filter controls for month, category, account, and type.
// Filter state lives in the parent page — this component just renders inputs
// and reports changes up through onFilterChange.
export default function TransactionFilters({ filters, onFilterChange }) {
  const { accounts } = useFinance()

  function handleChange(field, value) {
    onFilterChange({ ...filters, [field]: value })
  }

  return (
    <div className={styles.filters}>
      <select
        value={filters.month}
        onChange={e => handleChange('month', e.target.value)}
        className={styles.select}
      >
        <option value="all">All Months</option>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, index) => (
          <option key={index} value={index}>{label}</option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={e => handleChange('category', e.target.value)}
        className={styles.select}
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select
        value={filters.accountId}
        onChange={e => handleChange('accountId', e.target.value)}
        className={styles.select}
      >
        <option value="all">All Accounts</option>
        {accounts.map(account => (
          <option key={account.id} value={account.id}>{account.name}</option>
        ))}
      </select>

      <select
        value={filters.type}
        onChange={e => handleChange('type', e.target.value)}
        className={styles.select}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  )
}