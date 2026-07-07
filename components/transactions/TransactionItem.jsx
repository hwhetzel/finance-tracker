'use client'

import { useFinance } from '@/hooks/useFinance'
import { formatCurrency, formatDate } from '@/utils/helpers'
import styles from './TransactionItem.module.css'

// A single transaction row. Receives the transaction plus callbacks for
// editing (opens the modal in the parent) and deleting (handled directly here).
export default function TransactionItem({ transaction, onEdit }) {
  const { accounts, deleteTransaction } = useFinance()

  const account = accounts.find(a => a.id === transaction.accountId)

  function handleDelete() {
    if (confirm('Delete this transaction?')) {
      deleteTransaction(transaction.id)
    }
  }

  return (
    <div className={styles.row}>
      <div className={styles.info}>
        <span className={styles.category}>{transaction.category}</span>
        <span className={styles.description}>{transaction.description}</span>
        <span className={styles.account}>{account?.name || 'Unknown account'}</span>
      </div>

      <div className={styles.right}>
        <span className={styles.date}>{formatDate(transaction.date)}</span>
        <span className={transaction.type === 'income' ? styles.income : styles.expense}>
          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
        <div className={styles.actions}>
          <button onClick={() => onEdit(transaction)} className={styles.actionButton}>Edit</button>
          <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
        </div>
      </div>
    </div>
  )
}