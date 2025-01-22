import React from "react"
import * as LucideIcons from "lucide-react"
import { FormField, FormSection } from "./FormComponents"
import { handleAvatarChange } from "../utils/avatarUtils"

export const EditAccount = ({
  userProfile,
  setUserProfile,
  accountInfo,
  handleInfoChange,
  passwordChange,
  handlePasswordChange,
  handleSubmit,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Profile</h3>
      </div>
      <div className="p-6 flex flex-col items-center space-y-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
          <img
            src={userProfile.avatar || "/placeholder.svg"}
            alt={userProfile.name}
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleAvatarChange(e, setUserProfile)}
          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <h3 className="text-2xl font-semibold">{userProfile.name}</h3>
        <p className="text-muted-foreground">{userProfile.role}</p>
      </div>
    </div>
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm lg:col-span-2">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Account Information</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Basic Information" icon={LucideIcons.User}>
            <FormField label="Username" id="username" value={accountInfo.username} onChange={handleInfoChange} />
            <FormField label="First Name" id="firstName" value={accountInfo.firstName} onChange={handleInfoChange} />
            <FormField label="Last Name" id="lastName" value={accountInfo.lastName} onChange={handleInfoChange} />
          </FormSection>
          <FormSection title="Contact Information" icon={LucideIcons.Mail}>
            <FormField label="Email" id="email" type="email" value={accountInfo.email} onChange={handleInfoChange} />
            <FormField label="Phone" id="phone" value={accountInfo.phone} onChange={handleInfoChange} />
            <FormField label="Department" id="department" value={accountInfo.department} onChange={handleInfoChange} />
          </FormSection>
          <FormSection title="Change Password" icon={LucideIcons.Lock}>
            <FormField
              label="Current Password"
              id="currentPassword"
              type="password"
              value={passwordChange.currentPassword}
              onChange={handlePasswordChange}
            />
            <FormField
              label="New Password"
              id="newPassword"
              type="password"
              value={passwordChange.newPassword}
              onChange={handlePasswordChange}
            />
            <FormField
              label="Repeat New Password"
              id="repeatPassword"
              type="password"
              value={passwordChange.repeatPassword}
              onChange={handlePasswordChange}
            />
          </FormSection>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <LucideIcons.Save className="mr-2 h-4 w-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)

