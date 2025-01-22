import React, { useState } from "react"
import * as LucideIcons from "lucide-react"
import { EditAccount } from "./components/EditAccount"
import { AddAccount } from "./components/AddAccount"

export default function AccountManagement() {
  const [activeTab, setActiveTab] = useState("edit")

  const [userProfile, setUserProfile] = useState({
    avatar: "/placeholder.svg?height=100&width=100",
    name: "Reynaldo Danganan",
    role: "Procurement Head",
  })

  const [accountInfo, setAccountInfo] = useState({
    username: "jonassmith",
    firstName: "Reynaldo",
    lastName: "Danganan",
    lastLogin: "2 hours ago",
    dateJoined: "Feb 22, 2012",
    email: "reynaldo@slsu.edu.ph",
    phone: "(1800) 221 - 876543",
    department: "CIT",
  })

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  })

  const [newAccount, setNewAccount] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const handleInfoChange = (e) => {
    const { name, value } = e.target
    setAccountInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordChange((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewAccountChange = (e) => {
    const { name, value } = e.target
    setNewAccount((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (activeTab === "edit") {
      console.log("Edit form submitted:", { accountInfo, passwordChange })
    } else {
      console.log("New account submitted:", newAccount)
    }
    // Here you would typically send this data to your backend
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-900">AccountManager</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                <LucideIcons.Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                activeTab === "edit"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background hover:text-foreground"
              }`}
              onClick={() => setActiveTab("edit")}
            >
              <LucideIcons.User className="mr-2 h-4 w-4" />
              Edit Account
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                activeTab === "add"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background hover:text-foreground"
              }`}
              onClick={() => setActiveTab("add")}
            >
              <LucideIcons.UserPlus className="mr-2 h-4 w-4" />
              Add Account
            </button>
          </div>
          {activeTab === "edit" ? (
            <EditAccount
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              accountInfo={accountInfo}
              handleInfoChange={handleInfoChange}
              passwordChange={passwordChange}
              handlePasswordChange={handlePasswordChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <AddAccount
              newAccount={newAccount}
              handleNewAccountChange={handleNewAccountChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </main>
    </div>
  )
}

