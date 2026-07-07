import BudgetCard from './BudgetCard'
import styles from './BudgetList.module.css'

// Renders a BudgetCard for each budget limit the user has set.
export default function BudgetList({ budgets, onEdit, onDelete }) {
  return (
    <div className={styles.grid}>
      {budgets.length === 0 && (
        <p className={styles.empty}>No budgets set yet.</p>
      )}
      {budgets.map(budget => (
        <BudgetCard key={budget.id} budget={budget} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}