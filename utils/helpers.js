// Formats a number as US currency, e.g. 1234.5 -> "$1,234.50"
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Formats a date string (YYYY-MM-DD) into a readable form, e.g. "Mar 15, 2024"
// Parses the parts manually and forces UTC on the output so the local timezone
// never shifts the date backward by a day
export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(date)
}

// Generates a unique-enough ID for new records without needing a library
// Combines the current timestamp with a random string for collision safety
export function generateId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).substring(2, 9)}`
}

// Calculates what percent of a budget limit has been spent
// Returns a whole number, capped at a reasonable max for display purposes
export function calculatePercentUsed(spent, limit) {
  if (limit <= 0) return 0
  return Math.round((spent / limit) * 100)
}

// Calculates net balance from a list of transactions
// Income adds to the total, expenses subtract from it
export function calculateNetBalance(transactions) {
  return transactions.reduce((total, transaction) => {
    return transaction.type === 'income'
      ? total + transaction.amount
      : total - transaction.amount
  }, 0)
}

// Checks whether a transaction's date falls within a given month and year
// month is 0-indexed to match JavaScript's Date object convention
export function isInMonth(transaction, month, year) {
  const date = new Date(transaction.date)
  return date.getMonth() === month && date.getFullYear() === year
}

// Sums total income from a list of transactions
export function calculateTotalIncome(transactions) {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0)
}

// Sums total expenses from a list of transactions
export function calculateTotalExpenses(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0)
}

// Given a recurring transaction's last date and its frequency, returns the next due date
// Uses UTC throughout so local timezone offsets never shift the date by a day
export function getNextRecurringDate(dateString, frequency) {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  if (frequency === 'weekly') {
    date.setUTCDate(date.getUTCDate() + 7)
  } else if (frequency === 'monthly') {
    date.setUTCMonth(date.getUTCMonth() + 1)
  }
  return date.toISOString().split('T')[0]
}