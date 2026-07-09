'use client'

import { useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import SavingsGoalList from '@/components/savings/SavingsGoalList'
import AddSavingsGoalModal from '@/components/modals/AddSavingsGoalModal'
import Button from '@/components/shared/Button'
import styles from './page.module.css'

// Savings page — list of goals with progress bars, plus add/log-progress modal.
export default function SavingsPage() {
  const { savingsGoals, deleteSavingsGoal } = useFinance()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)

  function handleEdit(goal) {
    setEditingGoal(goal)
    setIsModalOpen(true)
  }

  function handleAddNew() {
    setEditingGoal(null)
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setEditingGoal(null)
  }

  function handleDelete(id) {
    if (confirm('Delete this savings goal?')) {
      deleteSavingsGoal(id)
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Savings Goals</h1>
        <Button variant="primary" onClick={handleAddNew}>Add Goal</Button>
      </div>

      <SavingsGoalList goals={savingsGoals} onEdit={handleEdit} onDelete={handleDelete} />

      <AddSavingsGoalModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editingGoal={editingGoal}
      />
    </div>
  )
}