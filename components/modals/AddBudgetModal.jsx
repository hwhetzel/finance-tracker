'use client'

import { useState, useEffect } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { CATEGORIES } from '@/components/modals/AddTransactionModal'
import Button from '@/components/shared/Button'
import styles from './AddBudgetModal.module.css'

const EMPTY_FORM = { category: CATEGORIES[0], limit: '' }

// Form modal for setting a budget limit on a category.
// Pass an existing budget via editingBudget to switch into edit mode.
export default function AddBudgetModal({ isOpen, onClose, editingBudget }) {
  const { addBudget, updateBudget } = useFinance()
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (editingBudget) {
      setForm(editingBudget)
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingBudget, isOpen])

  if (!isOpen) return null

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const budgetData = {
      ...form,
      limit: parseFloat(form.limit)
    }

    if (editingBudget) {
      updateBudget(editingBudget.id, budgetData)
    } else {
      addBudget(budgetData)
    }

    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.heading}>{editingBudget ? 'Edit Budget' : 'Add Budget'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Category
            <select
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              className={styles.input}
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Monthly Limit
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={form.limit}
              onChange={e => handleChange('limit', e.target.value)}
              className={styles.input}
            />
          </label>

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">{editingBudget ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}