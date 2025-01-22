import React from "react"

export const FormField = ({ label, id, type = "text", value, onChange, readOnly = false }) => (
  <div className="space-y-1">
    <label
      htmlFor={id}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${readOnly ? "bg-gray-100" : ""}`}
    />
  </div>
)

export const FormSection = ({ title, icon: Icon, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-700 flex items-center">
      <Icon className="mr-2" size={20} /> {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
)

