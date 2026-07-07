'use client'

import { useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import BudgetList from '@/components/budgets/BudgetList'
import AddBudgetModal from '@/components/modals/AddBudgetModal'
import Button from '@/components/shared/Button'
import styles from './page.module.css'

// Budgets page — list of category limits with progress bars, plus add/edit modal.
export default function BudgetsPage() {
  const { budgets, deleteBudget } = useFinance()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)

  function handleEdit(budget) {
    setEditingBudget(budget)
    setIsModalOpen(true)
  }

  function handleAddNew() {
    setEditingBudget(null)
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setEditingBudget(null)
  }

  function handleDelete(id) {
    if (confirm('Delete this budget?')) {
      deleteBudget(id)
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Budgets</h1>
        <Button variant="primary" onClick={handleAddNew}>Add Budget</Button>
      </div>

      <BudgetList budgets={budgets} onEdit={handleEdit} onDelete={handleDelete} />

      <AddBudgetModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editingBudget={editingBudget}
      />
    </div>
  )
}