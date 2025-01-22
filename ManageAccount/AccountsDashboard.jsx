import React, { useState, useCallback, useMemo } from "react"
import { Search, Users, Plus, Filter, ChevronLeft, ChevronRight, Trash, Mail } from "lucide-react"
import { useAccounts } from "./hooks/useAccounts"
import { useFilters } from "./hooks/useFilters"
import { usePagination } from "./hooks/usePagination"
import { StatCard } from "./components/StatCard"
import { AccountRow } from "./components/AccountRow"

const AccountsDashboard = () => {
  const initialAccounts = [
    {
      id: "1",
      name: "Alexander James Carter",
      opportunity: "Business Expansion Loan",
      status: "Active",
      memberId: "#OM123AA",
      date: "2024-03-18",
      tags: "CEN",
      email: "alexander@example.com",
      createdAt: "2024-03-15",
      lastLogin: "2024-03-18",
      password: "securepass1",
    },
    {
      id: "2",
      name: "Michael Anthony Johnson",
      opportunity: "Social Media Campaign",
      status: "Inactive",
      memberId: "#AT456BB",
      date: "2024-03-24",
      tags: "CIT",
      email: "michael@example.com",
      createdAt: "2024-03-21",
      lastLogin: "2024-03-24",
      password: "securepass2",
    },
  ]

  const { accounts, addAccount, updateAccount, deleteAccount, toggleAccountStatus } = useAccounts(initialAccounts)
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    applyFilters,
  } = useFilters()
  const filteredAccounts = useMemo(() => applyFilters(accounts), [accounts, applyFilters])
  const { currentPage, totalPages, paginatedItems: currentPageAccounts, goToPage } = usePagination(filteredAccounts, 10)

  const [selectedAccounts, setSelectedAccounts] = useState([])

  const handleSelectAll = useCallback(
    (e) => setSelectedAccounts(e.target.checked ? accounts.map((account) => account.id) : []),
    [accounts],
  )

  const handleSelectAccount = useCallback((id) => {
    setSelectedAccounts((prev) => (prev.includes(id) ? prev.filter((accountId) => accountId !== id) : [...prev, id]))
  }, [])

  const handleDeleteSelected = useCallback(() => {
    if (window.confirm("Are you sure you want to delete selected accounts?")) {
      selectedAccounts.forEach((id) => deleteAccount(id))
      setSelectedAccounts([])
    }
  }, [selectedAccounts, deleteAccount])

  const handleEditAccount = useCallback((account) => {
    console.log("Edit account:", account)
    // Implement your edit logic here
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
              <p className="text-sm text-gray-500">Manage user roles and access.</p>
            </div>
            <button
              onClick={() => console.log("Add new account")}
              className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New account
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={Users} title="Total members" value={accounts.length} color="blue" />
            <StatCard
              icon={Users}
              title="Active members"
              value={accounts.filter((account) => account.status === "Active").length}
              color="green"
            />
            <StatCard
              icon={Users}
              title="Inactive members"
              value={accounts.filter((account) => account.status === "Inactive").length}
              color="red"
            />
            <StatCard
              icon={Users}
              title="Departments"
              value={new Set(accounts.map((account) => account.tags)).size}
              color="purple"
            />
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
            {/* Filters and Search */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b">
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <select
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="all">All departments</option>
                  {["CEN", "CIT", "CABHA", "CAS", "CAG"].map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                {selectedAccounts.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDeleteSelected}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center"
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </button>
                  </div>
                )}
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or ID"
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          checked={selectedAccounts.length === accounts.length}
                          onChange={handleSelectAll}
                        />
                      </th>
                      {[
                        "Name",
                        "Opportunity",
                        "Status",
                        "Member ID",
                        "Date",
                        "Created At",
                        "Last Login",
                        "Tags",
                        "Password",
                        "Actions",
                      ].map((header) => (
                        <th key={header} className="px-4 py-3 text-left">
                          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{header}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageAccounts.map((account) => (
                      <AccountRow
                        key={account.id}
                        account={account}
                        isSelected={selectedAccounts.includes(account.id)}
                        onSelect={handleSelectAccount}
                        onActivate={toggleAccountStatus}
                        onDelete={deleteAccount}
                        onEdit={handleEditAccount}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing {currentPage === totalPages ? filteredAccounts.length % 10 : 10} of {filteredAccounts.length}{" "}
                accounts
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountsDashboard

