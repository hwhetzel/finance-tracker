// All localStorage reads and writes live here.
// No component should ever call localStorage directly — everything routes through
// these functions so we can swap them for Supabase calls later with no changes elsewhere.

const KEYS = {
  transactions: 'finance_transactions',
  budgets: 'finance_budgets',
  savingsGoals: 'finance_savings_goals',
  accounts: 'finance_accounts'
}

// Generic getter — reads a key and parses it, returns empty array if nothing is stored
function getItem(key) {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Generic setter — stringifies and writes a value to a key
function setItem(key, value) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

// Transactions
export function getTransactions() {
  return getItem(KEYS.transactions)
}

export function saveTransactions(transactions) {
  setItem(KEYS.transactions, transactions)
}

// Budgets
export function getBudgets() {
  return getItem(KEYS.budgets)
}

export function saveBudgets(budgets) {
  setItem(KEYS.budgets, budgets)
}

// Savings Goals
export function getSavingsGoals() {
  return getItem(KEYS.savingsGoals)
}

export function saveSavingsGoals(savingsGoals) {
  setItem(KEYS.savingsGoals, savingsGoals)
}

// Accounts
export function getAccounts() {
  return getItem(KEYS.accounts)
}

export function saveAccounts(accounts) {
  setItem(KEYS.accounts, accounts)
}