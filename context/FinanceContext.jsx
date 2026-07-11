'use client'

import { createContext, useState, useEffect } from 'react'
import { generateId } from '@/utils/helpers'
import {
  getTransactions, saveTransactions,
  getBudgets, saveBudgets,
  getSavingsGoals, saveSavingsGoals,
  getAccounts, saveAccounts
} from '@/services/storageService'
import { generateDueRecurringTransactions } from '@/services/recurringService'

// Central store for every piece of finance data in the app.
// Any component can read or update this through the useFinance hook —
// no prop drilling needed across pages and nested components.
export const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [savingsGoals, setSavingsGoals] = useState([])
  const [accounts, setAccounts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load everything from localStorage once, on first mount
  useEffect(() => {
    const loadedTransactions = getTransactions()
    const { newTransactions, updatedOriginals } = generateDueRecurringTransactions(loadedTransactions)

    // Apply the catch-up: update each recurring original's tracker, then append the new occurrences
    const updatedTransactions = loadedTransactions.map(t => {
      const update = updatedOriginals.find(u => u.id === t.id)
      return update ? { ...t, recurringLastGenerated: update.recurringLastGenerated } : t
    })

    setTransactions([...updatedTransactions, ...newTransactions])
    setBudgets(getBudgets())
    setSavingsGoals(getSavingsGoals())
    setAccounts(getAccounts())
    setIsLoaded(true)
  }, [])

  // Persist each slice back to localStorage whenever it changes
  // isLoaded guards against overwriting saved data with the initial empty arrays
  useEffect(() => {
    if (isLoaded) saveTransactions(transactions)
  }, [transactions, isLoaded])

  useEffect(() => {
    if (isLoaded) saveBudgets(budgets)
  }, [budgets, isLoaded])

  useEffect(() => {
    if (isLoaded) saveSavingsGoals(savingsGoals)
  }, [savingsGoals, isLoaded])

  useEffect(() => {
    if (isLoaded) saveAccounts(accounts)
  }, [accounts, isLoaded])

  // Transactions
  function addTransaction(transaction) {
    const newTransaction = { ...transaction, id: generateId() }
    setTransactions(prev => [...prev, newTransaction])
  }

  function updateTransaction(id, updates) {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  // Budgets
  function addBudget(budget) {
    const newBudget = { ...budget, id: generateId() }
    setBudgets(prev => [...prev, newBudget])
  }

  function updateBudget(id, updates) {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))
  }

  function deleteBudget(id) {
    setBudgets(prev => prev.filter(b => b.id !== id))
  }

  // Savings Goals
  function addSavingsGoal(goal) {
    const newGoal = { ...goal, id: generateId() }
    setSavingsGoals(prev => [...prev, newGoal])
  }

  function updateSavingsGoal(id, updates) {
    setSavingsGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g))
  }

  function deleteSavingsGoal(id) {
    setSavingsGoals(prev => prev.filter(g => g.id !== id))
  }

  // Accounts
  function addAccount(account) {
    const newAccount = { ...account, id: generateId() }
    setAccounts(prev => [...prev, newAccount])
  }

  function updateAccount(id, updates) {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }

  function deleteAccount(id) {
    setAccounts(prev => prev.filter(a => a.id !== id))
  }

  const value = {
    transactions, budgets, savingsGoals, accounts, isLoaded,
    addTransaction, updateTransaction, deleteTransaction,
    addBudget, updateBudget, deleteBudget,
    addSavingsGoal, updateSavingsGoal, deleteSavingsGoal,
    addAccount, updateAccount, deleteAccount
  }

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  )
}