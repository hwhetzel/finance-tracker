'use client'

import { useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import AccountList from '@/components/accounts/AccountList'
import AddAccountModal from '@/components/modals/AddAccountModal'
import Button from '@/components/shared/Button'
import styles from './page.module.css'

// Accounts page — list of accounts with balances, plus add/edit modal.
export default function AccountsPage() {
  const { accounts, deleteAccount } = useFinance()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)

  function handleEdit(account) {
    setEditingAccount(account)
    setIsModalOpen(true)
  }

  function handleAddNew() {
    setEditingAccount(null)
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setEditingAccount(null)
  }

  function handleDelete(id) {
    if (confirm('Delete this account? Transactions linked to it will remain but show as Unknown account.')) {
      deleteAccount(id)
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Accounts</h1>
        <Button variant="primary" onClick={handleAddNew}>Add Account</Button>
      </div>

      <AccountList accounts={accounts} onEdit={handleEdit} onDelete={handleDelete} />

      <AddAccountModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editingAccount={editingAccount}
      />
    </div>
  )
}