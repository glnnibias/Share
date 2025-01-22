import React, { useState } from "react"
import PropTypes from "prop-types"
import { Power, Edit, Trash, Eye, EyeOff } from "lucide-react"
import { getTagColor } from "../utils/tagColors"

export const AccountRow = React.memo(({ account, isSelected, onSelect, onActivate, onDelete, onEdit }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <tr className="border-b last:border-b-0 hover:bg-gray-50">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          checked={isSelected}
          onChange={() => onSelect(account.id)}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {account.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{account.name}</div>
            <div className="text-xs text-gray-500">{account.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{account.opportunity}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            account.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${account.status === "Active" ? "bg-green-600" : "bg-red-600"}`}
          ></span>
          {account.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{account.memberId}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{account.date}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{account.createdAt}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{account.lastLogin}</td>
      <td className="px-4 py-3">
        <span className={`bg-${getTagColor(account.tags)}-500 text-white font-semibold px-3 py-1 rounded-full text-xs`}>
          {account.tags}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">
        <div className="flex items-center">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors mr-2"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          {showPassword ? account.password : "••••••••"}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onActivate(account.id)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            title={account.status === "Active" ? "Deactivate" : "Activate"}
          >
            <Power className={`w-4 h-4 ${account.status === "Active" ? "text-green-500" : "text-red-500"}`} />
          </button>
          <button onClick={() => onEdit(account)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-4 h-4 text-blue-500" />
          </button>
          <button onClick={() => onDelete(account.id)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Trash className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  )
})

AccountRow.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    opportunity: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Active", "Inactive"]).isRequired,
    memberId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    lastLogin: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

