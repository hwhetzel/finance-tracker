'use client'

import { useState, useEffect } from 'react'
import { useFinance } from '@/hooks/useFinance'
import Button from '@/components/shared/Button'
import styles from './AddTransactionModal.module.css'

// Shared category list — exported so other modals/components can reuse the
// exact same set instead of retyping category names and risking a typo mismatch.
export const CATEGORIES = ['Food', 'Rent', 'Bills', 'Entertainment', 'Transport', 'Shopping', 'Health', 'Other']

const EMPTY_FORM = {
  type: 'expense',
  amount: '',
  category: CATEGORIES[0],
  accountId: '',
  date: new Date().toISOString().split('T')[0],
  description: '',
  recurring: false,
  recurringFrequency: null
}

// Form modal for adding or editing a transaction.
// Pass an existing transaction via editingTransaction to switch into edit mode —
// otherwise it defaults to a blank form for creating a new one.
export default function AddTransactionModal({ isOpen, onClose, editingTransaction }) {
  const { accounts, addTransaction, updateTransaction } = useFinance()
  const [form, setForm] = useState(EMPTY_FORM)

  // Populate the form when opening in edit mode, reset it when opening fresh
  useEffect(() => {
    if (editingTransaction) {
      setForm(editingTransaction)
    } else {
      setForm({ ...EMPTY_FORM, accountId: accounts[0]?.id || '' })
    }
  }, [editingTransaction, isOpen, accounts])

  if (!isOpen) return null

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const transactionData = {
      ...form,
      amount: parseFloat(form.amount)
    }

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData)
    } else {
      addTransaction(transactionData)
    }

    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.heading}>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.typeToggle}>
            <button
              type="button"
              className={`${styles.typeButton} ${form.type === 'expense' ? styles.typeActive : ''}`}
              onClick={() => handleChange('type', 'expense')}
            >
              Expense
            </button>
            <button
              type="button"
              className={`${styles.typeButton} ${form.type === 'income' ? styles.typeActive : ''}`}
              onClick={() => handleChange('type', 'income')}
            >
              Income
            </button>
          </div>

          <label className={styles.label}>
            Amount
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={form.amount}
              onChange={e => handleChange('amount', e.target.value)}
              className={styles.input}
            />
          </label>

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
            Account
            <select
              value={form.accountId}
              onChange={e => handleChange('accountId', e.target.value)}
              className={styles.input}
              required
            >
              <option value="" disabled>Select an account</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>{account.name}</option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Date
            <input
              type="date"
              required
              value={form.date}
              onChange={e => handleChange('date', e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Description
            <input
              type="text"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={form.recurring}
              onChange={e => handleChange('recurring', e.target.checked)}
            />
            Recurring
          </label>

          {form.recurring && (
            <label className={styles.label}>
              Frequency
              <select
                value={form.recurringFrequency || 'monthly'}
                onChange={e => handleChange('recurringFrequency', e.target.value)}
                className={styles.input}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
          )}

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">{editingTransaction ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}