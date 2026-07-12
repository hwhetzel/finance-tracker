import { formatDate } from '@/utils/helpers'

// Converts a list of transactions into a CSV string and triggers a browser download.
// Kept separate from components so the CSV format can be extended later
// (e.g. export by date range or category) without touching any UI code.
const CSV_HEADERS = ['Date', 'Type', 'Category', 'Account', 'Description', 'Amount']

function escapeCsvField(field) {
  const stringField = String(field ?? '')
  // Wrap in quotes and escape any existing quotes if the field contains a comma, quote, or newline
  if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
    return `"${stringField.replace(/"/g, '""')}"`
  }
  return stringField
}

// Builds the CSV string from transactions, resolving account IDs to names
function buildCsvContent(transactions, accounts) {
  const rows = transactions.map(t => {
    const account = accounts.find(a => a.id === t.accountId)
    return [
      formatDate(t.date),
      t.type,
      t.category,
      account?.name || 'Unknown',
      t.description,
      t.amount
    ].map(escapeCsvField).join(',')
  })

  return [CSV_HEADERS.join(','), ...rows].join('\n')
}

// Triggers a browser download of the given CSV content as a file
function downloadCsv(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Public entry point — builds the CSV and downloads it in one call
export function exportTransactionsToCsv(transactions, accounts) {
  const csvContent = buildCsvContent(transactions, accounts)
  const today = new Date().toISOString().split('T')[0]
  downloadCsv(csvContent, `transactions-${today}.csv`)
}