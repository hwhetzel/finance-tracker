'use client'

import { useState, useEffect } from 'react'
import { useFinance } from '@/hooks/useFinance'
import Button from '@/components/shared/Button'
import styles from './AddSavingsGoalModal.module.css'

const EMPTY_FORM = { name: '', target: '', current: '' }

// Form modal for creating a savings goal or logging progress toward one.
// Pass an existing goal via editingGoal to switch into edit mode — this doubles
// as both "create goal" and "log a contribution" since both just update the same fields.
export default function AddSavingsGoalModal({ isOpen, onClose, editingGoal }) {
  const { addSavingsGoal, updateSavingsGoal } = useFinance()
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (editingGoal) {
      setForm(editingGoal)
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingGoal, isOpen])

  if (!isOpen) return null

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const goalData = {
      ...form,
      target: parseFloat(form.target),
      current: parseFloat(form.current) || 0
    }

    if (editingGoal) {
      updateSavingsGoal(editingGoal.id, goalData)
    } else {
      addSavingsGoal(goalData)
    }

    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.heading}>{editingGoal ? 'Edit Savings Goal' : 'Add Savings Goal'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              required
              placeholder="e.g. Emergency Fund"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Target Amount
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={form.target}
              onChange={e => handleChange('target', e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Current Amount Saved
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.current}
              onChange={e => handleChange('current', e.target.value)}
              className={styles.input}
            />
          </label>

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">{editingGoal ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}