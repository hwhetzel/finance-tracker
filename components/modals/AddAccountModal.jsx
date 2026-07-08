'use client'

import { useState, useEffect } from 'react'
import { useFinance } from '@/hooks/useFinance'
import Button from '@/components/shared/Button'
import styles from './AddAccountModal.module.css'

const ACCOUNT_TYPES = ['Cash', 'Bank', 'Credit Card']

const EMPTY_FORM = { name: '', type: ACCOUNT_TYPES[0], startingBalance: '' }

// Form modal for creating or editing an account.
// Pass an existing account via editingAccount to switch into edit mode.
export default function AddAccountModal({ isOpen, onClose, editingAccount }) {
  const { addAccount, updateAccount } = useFinance()
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (editingAccount) {
      setForm(editingAccount)
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editingAccount, isOpen])

  if (!isOpen) return null

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const accountData = {
      ...form,
      startingBalance: parseFloat(form.startingBalance)
    }

    if (editingAccount) {
      updateAccount(editingAccount.id, accountData)
    } else {
      addAccount(accountData)
    }

    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.heading}>{editingAccount ? 'Edit Account' : 'Add Account'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              required
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Type
            <select
              value={form.type}
              onChange={e => handleChange('type', e.target.value)}
              className={styles.input}
            >
              {ACCOUNT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Starting Balance
            <input
              type="number"
              step="0.01"
              required
              value={form.startingBalance}
              onChange={e => handleChange('startingBalance', e.target.value)}
              className={styles.input}
            />
          </label>

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">{editingAccount ? 'Save' : 'Add'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}