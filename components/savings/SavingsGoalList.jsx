import SavingsGoalCard from './SavingsGoalCard'
import styles from './SavingsGoalList.module.css'

// Renders a SavingsGoalCard for each savings goal.
export default function SavingsGoalList({ goals, onEdit, onDelete }) {
  return (
    <div className={styles.grid}>
      {goals.length === 0 && (
        <p className={styles.empty}>No savings goals yet.</p>
      )}
      {goals.map(goal => (
        <SavingsGoalCard key={goal.id} goal={goal} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}