import { useState, useCallback } from "react"

export const useFilters = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const applyFilters = useCallback(
    (accounts) => {
      return accounts.filter((account) => {
        const matchesSearch =
          account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.memberId.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || account.status.toLowerCase() === statusFilter.toLowerCase()
        const matchesDepartment =
          departmentFilter === "all" || account.tags.toLowerCase() === departmentFilter.toLowerCase()
        return matchesSearch && matchesStatus && matchesDepartment
      })
    },
    [searchQuery, statusFilter, departmentFilter],
  )

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    applyFilters,
  }
}

