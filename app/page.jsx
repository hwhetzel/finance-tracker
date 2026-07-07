'use client'

import { useState } from 'react'
import SummaryCards from '@/components/dashboard/SummaryCards'
import MonthlyOverview from '@/components/dashboard/MonthlyOverview'
import SpendingChart from '@/components/dashboard/SpendingChart'

// Dashboard home page. Month/year state lives here since both SummaryCards
// and MonthlyOverview need to stay in sync as the user browses months.
export default function DashboardPage() {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  function handleMonthChange(newMonth, newYear) {
    setMonth(newMonth)
    setYear(newYear)
  }

  return (
    <div>
      <SummaryCards month={month} year={year} />
      <SpendingChart month={month} year={year} />
      <MonthlyOverview month={month} year={year} onMonthChange={handleMonthChange} />
    </div>
  )
}