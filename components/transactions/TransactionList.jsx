import TransactionItem from './TransactionItem'
import styles from './TransactionList.module.css'

// Scrollable list of transactions. Receives already-filtered transactions as props
// from the transactions page — this component doesn't know anything about filtering.
export default function TransactionList({ transactions, onEdit }) {
  return (
    <div className={styles.list}>
      {transactions.length === 0 && (
        <p className={styles.empty}>No transactions match your filters.</p>
      )}
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} onEdit={onEdit} />
      ))}
    </div>
  )
}