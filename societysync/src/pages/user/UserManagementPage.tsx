import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchUser, createNewUser, updateExistingUser, clearSelectedUser } from "../../app/slices/userSlice"
import type { UserRole } from "../../types/auth.types"
import type { UserCreateData, UserUpdateData } from "../../types/user.types"
import { User, Mail, Phone, Home, Shield, ArrowLeft, Save, Trash2 } from "lucide-react"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { useNotification } from "../../components/common/Notification"
import Modal, { useModal } from "../../components/common/Modal"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"

const UserManagementPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { selectedUser, loading } = useAppSelector((state) => state.user)
  const { showNotification } = useNotification()
  const deleteModal = useModal()

  const isEditMode = !!userId

  const [formData, setFormData] = useState<UserCreateData | UserUpdateData>({
    email: "",
    password: "",
    displayName: "",
    role: "resident" as UserRole,
    flatNumber: "",
    phoneNumber: "",
    status: "active",
    uid: userId || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Fetch user data if in edit mode
    if (isEditMode && userId) {
      dispatch(fetchUser(userId))
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearSelectedUser())
    }
  }, [dispatch, isEditMode, userId])

  useEffect(() => {
    // Populate form with selected user data when available
    if (selectedUser && isEditMode) {
      setFormData({
        uid: selectedUser.uid,
        email: selectedUser.email || "",
        displayName: selectedUser.displayName || "",
        role: selectedUser.role,
        flatNumber: selectedUser.flatNumber || "",
        phoneNumber: selectedUser.phoneNumber || "",
        status: selectedUser.status || "active",
      })
    }
  }, [selectedUser, isEditMode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.displayName) {
      newErrors.displayName = "Name is required"
    }

    if (!isEditMode && !formData.email) {
      newErrors.email = "Email is required"
    } else if (!isEditMode && !/\S+@\S+\.\S+/.test(formData.email as string)) {
      newErrors.email = "Email is invalid"
    }

    if (!isEditMode && !formData.password) {
      newErrors.password = "Password is required"
    } else if (!isEditMode && (formData.password as string).length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.role === "resident" && !formData.flatNumber) {
      newErrors.flatNumber = "Flat number is required for residents"
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      if (isEditMode) {
        // Update existing user
        const { email, password, ...updateData } = formData as UserUpdateData
        await dispatch(updateExistingUser(updateData)).unwrap()
        showNotification({
          type: "success",
          title: "User updated successfully",
          duration: 3000,
        })
      } else {
        // Create new user
        await dispatch(createNewUser(formData as UserCreateData)).unwrap()
        showNotification({
          type: "success",
          title: "User created successfully",
          duration: 3000,
        })
      }

      navigate("/users")
    } catch (error: any) {
      showNotification({
        type: "error",
        title: isEditMode ? "Failed to update user" : "Failed to create user",
        message: error.message,
        duration: 5000,
      })
    }
  }

  const handleDelete = async () => {
    // Implementation for delete user would go here
    deleteModal.close()
    navigate("/users")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/users")}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">{isEditMode ? "Edit User" : "Create New User"}</h1>
        </div>

        {isEditMode && (
          <Button variant="danger" onClick={deleteModal.open} leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete User
          </Button>
        )}
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                leftIcon={<User className="w-5 h-5 text-gray-400" />}
                error={errors.displayName}
                fullWidth
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                leftIcon={<Mail className="w-5 h-5 text-gray-400" />}
                error={errors.email}
                fullWidth
                required
                disabled={isEditMode}
                helperText={isEditMode ? "Email cannot be changed" : ""}
              />

              {!isEditMode && (
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={(formData as UserCreateData).password || ""}
                  onChange={handleChange}
                  error={errors.password}
                  fullWidth
                  required
                />
              )}

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent block w-full pl-10 p-2.5"
                  >
                    <option value="admin">Admin</option>
                    <option value="resident">Resident</option>
                    <option value="security">Security</option>
                  </select>
                </div>
              </div>

              {formData.role === "resident" && (
                <Input
                  label="Flat Number"
                  name="flatNumber"
                  value={formData.flatNumber || ""}
                  onChange={handleChange}
                  leftIcon={<Home className="w-5 h-5 text-gray-400" />}
                  error={errors.flatNumber}
                  fullWidth
                />
              )}

              <Input
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                leftIcon={<Phone className="w-5 h-5 text-gray-400" />}
                error={errors.phoneNumber}
                fullWidth
                required
              />

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent block w-full p-2.5"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/users")}>
                Cancel
              </Button>
              <Button type="submit" isLoading={loading} leftIcon={<Save className="h-4 w-4" />}>
                {isEditMode ? "Update User" : "Create User"}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete User"
        footer={
          <>
            <Button variant="outline" onClick={deleteModal.close}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600">Are you sure you want to delete this user? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default UserManagementPage

