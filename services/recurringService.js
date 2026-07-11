import { generateId, getNextRecurringDate } from '@/utils/helpers'

// Generates any occurrences of recurring transactions that are due as of today.
// The original transaction's `date` is the real date the user entered and is never
// changed. Progress is tracked separately in `recurringLastGenerated` so re-running
// this on every load only ever adds new occurrences, never touches the original.
export function generateDueRecurringTransactions(transactions) {
  const today = new Date().toISOString().split('T')[0]
  const newTransactions = []
  const updatedOriginals = []

  const recurringTransactions = transactions.filter(t => t.recurring)

  recurringTransactions.forEach(original => {
    const anchorDate = original.recurringLastGenerated || original.date
    let nextDate = getNextRecurringDate(anchorDate, original.recurringFrequency)
    let lastGeneratedDate = anchorDate

    // Bail out if frequency is missing/invalid, since nextDate would never advance
    while (nextDate <= today && nextDate !== lastGeneratedDate) {
      const { recurringLastGenerated, ...originalWithoutTracker } = original
      newTransactions.push({
        ...originalWithoutTracker,
        id: generateId(),
        date: nextDate,
        recurring: false,
        recurringFrequency: null
      })
      lastGeneratedDate = nextDate
      nextDate = getNextRecurringDate(nextDate, original.recurringFrequency)
    }

    if (lastGeneratedDate !== anchorDate) {
      updatedOriginals.push({ id: original.id, recurringLastGenerated: lastGeneratedDate })
    }
  })

  return { newTransactions, updatedOriginals }
}