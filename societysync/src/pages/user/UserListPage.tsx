import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUsers } from "../../app/slices/userSlice"
import { User, Plus, Search, Filter, UserCheck, UserX, Shield, Home } from "lucide-react"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Table from "../../components/common/Table"
import { useNotification } from "../../components/common/Notification"
import { motion } from "framer-motion"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"

const UserListPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { users, loading } = useAppSelector((state) => state.user)
  const { showNotification } = useNotification()

  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const getFilteredUsers = () => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.houseNumber?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = filterRole === "all" || user.role === filterRole
      const matchesStatus = filterStatus === "all" || user.status === filterStatus

      return matchesSearch && matchesRole && matchesStatus
    })
  }

  const filteredUsers = getFilteredUsers()

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddUser = () => {
    navigate("/users/add")
  }

  const handleEditUser = (userId: string) => {
    navigate(`/users/edit/${userId}`)
  }

  const columns = [
    {
      header: "User",
      accessor: (user: any) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user.profilePicture ? (
              <img
                src={user.profilePicture || "/placeholder.svg"}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-10 w-10 object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-gray-500" />
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</div>
            <div className="text-xs text-gray-500">{user.emailAddress}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Phone",
      accessor: "phoneNumber",
    },
    {
      header: "Address",
      accessor: (user: any) => (
        <div className="text-sm">
          <div>
            {user.houseNumber}, {user.floorNumber}
          </div>
          <div className="text-xs text-gray-500">{user.streetTower}</div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: (user: any) => (
        <span
          className={`px-2 py-1 inline-flex text-xs font-medium rounded-full ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : user.role === "security"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (user: any) => (
        <span
          className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${
            user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {user.status === "active" ? (
            <>
              <UserCheck className="h-3 w-3" /> Active
            </>
          ) : (
            <>
              <UserX className="h-3 w-3" /> Inactive
            </>
          )}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (user: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEditUser(user.uid)}>
            Edit
          </Button>
        </div>
      ),
    },
  ]

  // Calculate summary statistics
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const adminUsers = users.filter((u) => u.role === "admin").length
  const residentUsers = users.filter((u) => u.role === "resident").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all users in the system</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={handleAddUser} leftIcon={<Plus className="h-4 w-4" />}>
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-3xl font-bold mt-1">{totalUsers}</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-500 bg-opacity-10">
                  <User className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-purple-500"></div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Users</p>
                  <h3 className="text-3xl font-bold mt-1">{activeUsers}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                  <UserCheck className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-green-500"></div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Admins</p>
                  <h3 className="text-3xl font-bold mt-1">{adminUsers}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-blue-500"></div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Residents</p>
                  <h3 className="text-3xl font-bold mt-1">{residentUsers}</h3>
                </div>
                <div className="p-3 rounded-full bg-amber-500 bg-opacity-10">
                  <Home className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-amber-500"></div>
          </Card>
        </motion.div>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">All Users</h2>
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="resident">Resident</option>
                <option value="security">Security</option>
              </select>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <Table
          data={paginatedUsers}
          columns={columns}
          isLoading={loading}
          emptyMessage="No users found"
          pagination={{
            currentPage,
            totalPages,
            onPageChange: handlePageChange,
          }}
        />
      </Card>
    </div>
  )
}

export default UserListPage
