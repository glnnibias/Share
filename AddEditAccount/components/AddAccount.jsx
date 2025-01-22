import React from "react"
import * as LucideIcons from "lucide-react"
import { FormField, FormSection } from "./FormComponents"
import { handleAvatarChange } from "../utils/avatarUtils"

export const AddAccount = ({ newAccount, handleNewAccountChange, handleSubmit }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">Add New Account</h3>
    </div>
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Profile Picture" icon={LucideIcons.Image}>
          <div className="col-span-2 flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
              <img
                src={newAccount.avatar || "/placeholder.svg"}
                alt="New user avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleAvatarChange(e, (prev) => ({ ...prev, avatar: e.target.result }))}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
        </FormSection>
        <FormSection title="Basic Information" icon={LucideIcons.User}>
          <FormField label="Username" id="username" value={newAccount.username} onChange={handleNewAccountChange} />
          <FormField label="First Name" id="firstName" value={newAccount.firstName} onChange={handleNewAccountChange} />
          <FormField label="Last Name" id="lastName" value={newAccount.lastName} onChange={handleNewAccountChange} />
        </FormSection>
        <FormSection title="Contact Information" icon={LucideIcons.Mail}>
          <FormField label="Email" id="email" type="email" value={newAccount.email} onChange={handleNewAccountChange} />
          <FormField label="Phone" id="phone" value={newAccount.phone} onChange={handleNewAccountChange} />
          <FormField
            label="Department"
            id="department"
            value={newAccount.department}
            onChange={handleNewAccountChange}
          />
        </FormSection>
        <FormSection title="Set Password" icon={LucideIcons.Lock}>
          <FormField
            label="Password"
            id="password"
            type="password"
            value={newAccount.password}
            onChange={handleNewAccountChange}
          />
          <FormField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={newAccount.confirmPassword}
            onChange={handleNewAccountChange}
          />
        </FormSection>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <LucideIcons.Save className="mr-2 h-4 w-4" /> Create Account
          </button>
        </div>
      </form>
    </div>
  </div>
)

