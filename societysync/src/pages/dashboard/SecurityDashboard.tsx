import { useState, useEffect } from "react"
import { UserCheck, Clock, Search, Filter, ChevronRight, Shield, AlertTriangle, UserCircle } from "lucide-react"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import { useNotification } from "../../components/common/Notification"
import { useAppSelector } from "../../hooks/hooks"

// Mock data for security dashboard
const securityStats = [
  {
    title: "Visitors Today",
    value: 24,
    icon: UserCheck,
    color: "bg-blue-500",
  },
  {
    title: "Pending Approvals",
    value: 5,
    icon: Clock,
    color: "bg-amber-500",
  },
  {
    title: "Security Alerts",
    value: 2,
    icon: AlertTriangle,
    color: "bg-red-500",
  },
  {
    title: "Staff on Duty",
    value: 8,
    icon: Shield,
    color: "bg-green-500",
  },
]

// Mock data for recent visitors
const recentVisitors = [
  {
    id: 1,
    name: "John Doe",
    purpose: "Delivery",
    flat: "A-101",
    entryTime: "10:30 AM",
    exitTime: "10:45 AM",
    status: "completed",
  },
  {
    id: 2,
    name: "Jane Smith",
    purpose: "Guest",
    flat: "B-204",
    entryTime: "11:15 AM",
    exitTime: null,
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    purpose: "Maintenance",
    flat: "C-305",
    entryTime: "09:20 AM",
    exitTime: "12:30 PM",
    status: "completed",
  },
  {
    id: 4,
    name: "Sarah Williams",
    purpose: "Guest",
    flat: "D-402",
    entryTime: "01:45 PM",
    exitTime: null,
    status: "active",
  },
  {
    id: 5,
    name: "Robert Brown",
    purpose: "Delivery",
    flat: "A-103",
    entryTime: "02:10 PM",
    exitTime: "02:20 PM",
    status: "completed",
  },
]

// Mock data for pending approvals
const pendingApprovals = [
  {
    id: 1,
    name: "David Wilson",
    purpose: "Guest",
    flat: "B-201",
    requestTime: "10 minutes ago",
    contactNumber: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Emily Davis",
    purpose: "Delivery",
    flat: "C-302",
    requestTime: "15 minutes ago",
    contactNumber: "+91 87654 32109",
  },
  {
    id: 3,
    name: "Michael Taylor",
    purpose: "Service",
    flat: "A-104",
    requestTime: "30 minutes ago",
    contactNumber: "+91 76543 21098",
  },
]

// Mock data for security alerts
const securityAlerts = [
  {
    id: 1,
    title: "Gate 2 left open",
    time: "15 minutes ago",
    severity: "high",
    status: "pending",
  },
  {
    id: 2,
    title: "Unauthorized parking in visitor area",
    time: "1 hour ago",
    severity: "medium",
    status: "resolved",
  },
]

const SecurityDashboard = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { showNotification } = useNotification()

  const [timeOfDay, setTimeOfDay] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("Morning")
    else if (hour < 17) setTimeOfDay("Afternoon")
    else setTimeOfDay("Evening")

    // Format current date
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    setCurrentDate(new Date().toLocaleDateString("en-US", options))

    // Update time every minute
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    // Show welcome notification
    showNotification({
      type: "info",
      title: `Welcome back, ${user?.displayName || "Security"}!`,
      message: "You have 5 pending visitor approvals.",
      duration: 5000,
    })

    return () => clearInterval(interval)
  }, [user, showNotification])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredVisitors = recentVisitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.flat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || visitor.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleApprove = (id: number) => {
    showNotification({
      type: "success",
      title: "Visitor approved",
      message: "The visitor has been approved and notified.",
      duration: 3000,
    })
  }

  const handleReject = (id: number) => {
    showNotification({
      type: "info",
      title: "Visitor rejected",
      message: "The visitor request has been rejected.",
      duration: 3000,
    })
  }

  const handleMarkExit = (id: number) => {
    showNotification({
      type: "success",
      title: "Exit marked",
      message: "Visitor exit has been recorded.",
      duration: 3000,
    })
  }

  const handleResolveAlert = (id: number) => {
    showNotification({
      type: "success",
      title: "Alert resolved",
      message: "The security alert has been marked as resolved.",
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Good {timeOfDay}, {user?.displayName || "Security"}!
          </h1>
          <p className="text-gray-600 mt-1">
            {currentDate} | {currentTime}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Button variant="outline" leftIcon={<UserCheck className="h-4 w-4" />} onClick={() => {}}>
            Quick Entry
          </Button>
          <Button leftIcon={<Shield className="h-4 w-4" />} onClick={() => {}}>
            Security Check
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityStats.map((stat, index) => (
          <Card key={index} className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`} />
                </div>
              </div>
            </div>
            <div className={`h-1 w-full ${stat.color}`}></div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Visitors */}
        <Card className="lg:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Visitors</h2>
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
                  placeholder="Search visitors..."
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
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visitor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flat
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entry Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exit Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVisitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserCircle className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                          <div className="text-xs text-gray-500">{visitor.purpose}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.flat}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.entryTime}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.exitTime || "-"}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(visitor.status)}`}
                      >
                        {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {visitor.status === "active" && (
                        <Button size="sm" variant="outline" onClick={() => handleMarkExit(visitor.id)}>
                          Mark Exit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Approvals */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Pending Approvals</h2>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                {pendingApprovals.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircle className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{approval.name}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-2">{approval.purpose}</span>
                        <span>•</span>
                        <span className="mx-2">Flat: {approval.flat}</span>
                        <span>•</span>
                        <span className="ml-2">{approval.requestTime}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{approval.contactNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => handleReject(approval.id)}>
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => handleApprove(approval.id)}>
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4" rightIcon={<ChevronRight className="h-4 w-4" />}>
              View All Approvals
            </Button>
          </Card>

          {/* Security Alerts */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Security Alerts</h2>
              <Button variant="ghost" size="sm">
                <AlertTriangle className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {securityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{alert.title}</h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}
                    >
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>

                  {alert.status === "pending" && (
                    <div className="flex justify-end mt-3">
                      <Button size="sm" onClick={() => handleResolveAlert(alert.id)}>
                        Mark Resolved
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4" rightIcon={<ChevronRight className="h-4 w-4" />}>
              View All Alerts
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SecurityDashboard

