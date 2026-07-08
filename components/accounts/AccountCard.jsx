'use client'

import { useFinance } from '@/hooks/useFinance'
import { formatCurrency, calculateNetBalance } from '@/utils/helpers'
import styles from './AccountCard.module.css'

// A single account card showing its current balance.
// Balance = starting balance + net effect of every transaction linked to this account,
// so it always reflects reality without needing to be manually updated on each transaction.
export default function AccountCard({ account, onEdit, onDelete }) {
  const { transactions } = useFinance()

  const accountTransactions = transactions.filter(t => t.accountId === account.id)
  const balance = account.startingBalance + calculateNetBalance(accountTransactions)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <span className={styles.name}>{account.name}</span>
          <span className={styles.type}>{account.type}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={() => onEdit(account)} className={styles.actionButton}>Edit</button>
          <button onClick={() => onDelete(account.id)} className={styles.deleteButton}>Delete</button>
        </div>
      </div>

      <span className={balance >= 0 ? styles.balancePositive : styles.balanceNegative}>
        {formatCurrency(balance)}
      </span>
    </div>
  )
}