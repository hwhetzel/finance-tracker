'use client'

import { useState } from 'react'
import { useFinance } from '@/hooks/useFinance'
import { isInMonth } from '@/utils/helpers'
import TransactionFilters from '@/components/transactions/TransactionFilters'
import TransactionList from '@/components/transactions/TransactionList'
import AddTransactionModal from '@/components/modals/AddTransactionModal'
import Button from '@/components/shared/Button'
import styles from './page.module.css'

const DEFAULT_FILTERS = { month: 'all', category: 'all', accountId: 'all', type: 'all' }

// Transactions page — full list across all time, with filters, add/edit modal, and export (Step 15).
export default function TransactionsPage() {
  const { transactions } = useFinance()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const filteredTransactions = transactions
    .filter(t => filters.month === 'all' || isInMonth(t, Number(filters.month), new Date(t.date).getFullYear()))
    .filter(t => filters.category === 'all' || t.category === filters.category)
    .filter(t => filters.accountId === 'all' || t.accountId === filters.accountId)
    .filter(t => filters.type === 'all' || t.type === filters.type)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  function handleEdit(transaction) {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  function handleAddNew() {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Transactions</h1>
        <Button variant="primary" onClick={handleAddNew}>Add Transaction</Button>
      </div>

      <TransactionFilters filters={filters} onFilterChange={setFilters} />
      <TransactionList transactions={filteredTransactions} onEdit={handleEdit} />

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editingTransaction={editingTransaction}
      />
    </div>
  )
}