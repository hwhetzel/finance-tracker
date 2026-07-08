import AccountCard from './AccountCard'
import styles from './AccountList.module.css'

// Renders an AccountCard for each account.
export default function AccountList({ accounts, onEdit, onDelete }) {
  return (
    <div className={styles.grid}>
      {accounts.length === 0 && (
        <p className={styles.empty}>No accounts yet.</p>
      )}
      {accounts.map(account => (
        <AccountCard key={account.id} account={account} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}