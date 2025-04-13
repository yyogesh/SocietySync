"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Users, Home, FileText, Bell, DollarSign, UserCheck, MessageSquare, Calendar, TrendingUp, TrendingDown, AlertCircle, ChevronRight } from 'lucide-react'
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import { useNotification } from "../../components/common/Notification"
import { useTheme } from "../../context/ThemeContext"
import { getThemeClasses } from "../../utils/theme"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: "Total Residents",
    value: 128,
    icon: Users,
    color: "bg-blue-500",
    trend: 5.2,
    trendUp: true,
  },
  {
    title: "Total Flats",
    value: 96,
    icon: Home,
    color: "bg-purple-500",
    trend: 0,
    trendUp: false,
  },
  {
    title: "Pending Bills",
    value: 24,
    icon: DollarSign,
    color: "bg-amber-500",
    trend: 12.5,
    trendUp: false,
  },
  {
    title: "Active Complaints",
    value: 18,
    icon: AlertCircle,
    color: "bg-red-500",
    trend: 3.8,
    trendUp: false,
  },
]

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "complaint",
    title: "Water leakage reported",
    user: "Amit Sharma",
    flat: "A-302",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "payment",
    title: "Maintenance fee paid",
    user: "Priya Patel",
    flat: "B-104",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "visitor",
    title: "Delivery person arrived",
    user: "Rahul Singh",
    flat: "C-201",
    time: "Yesterday",
    status: "completed",
  },
  {
    id: 4,
    type: "notice",
    title: "New notice published",
    user: "Admin",
    flat: "",
    time: "Yesterday",
    status: "info",
  },
  {
    id: 5,
    type: "complaint",
    title: "Elevator not working",
    user: "Neha Gupta",
    flat: "D-405",
    time: "2 days ago",
    status: "resolved",
  },
]

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Annual General Meeting",
    date: "June 15, 2023",
    time: "6:00 PM",
    location: "Community Hall",
  },
  {
    id: 2,
    title: "Summer Pool Party",
    date: "June 25, 2023",
    time: "4:00 PM",
    location: "Swimming Pool Area",
  },
  {
    id: 3,
    title: "Yoga Workshop",
    date: "July 2, 2023",
    time: "7:00 AM",
    location: "Garden Area",
  },
]

// Mock data for pending approvals
const pendingApprovals = [
  {
    id: 1,
    type: "visitor",
    title: "Visitor Request",
    user: "Vikram Mehta",
    flat: "A-105",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "maintenance",
    title: "Maintenance Request",
    user: "Anjali Desai",
    flat: "B-302",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "facility",
    title: "Clubhouse Booking",
    user: "Rajesh Kumar",
    flat: "C-404",
    time: "3 hours ago",
  },
]

const AdminDashboard = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { showNotification } = useNotification()
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  const [timeOfDay, setTimeOfDay] = useState("")
  const [currentDate, setCurrentDate] = useState("")

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

    // Show welcome notification
    showNotification({
      type: "info",
      title: `Welcome back, ${user?.displayName || "Admin"}!`,
      message: "You have 5 pending approvals and 3 new notifications.",
      duration: 5000,
    })
  }, [user, showNotification])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-amber-500"
      case "completed":
        return "text-green-500"
      case "resolved":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <MessageSquare className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "visitor":
        return <UserCheck className="h-4 w-4" />
      case "notice":
        return <Bell className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Good {timeOfDay}, {user?.displayName || "Admin"}!
          </h1>
          <p className="text-gray-600 mt-1">{currentDate}</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Button variant="outline" leftIcon={<Bell className="h-4 w-4" />} onClick={() => navigate("/notices")}>
            Announcements
          </Button>
          <Button leftIcon={<FileText className="h-4 w-4" />} onClick={() => navigate("/reports")}>
            Generate Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>

                  {stat.trend > 0 && (
                    <div className="flex items-center mt-2">
                      {stat.trendUp ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs font-medium ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                        {stat.trend}% {stat.trendUp ? "increase" : "decrease"}
                      </span>
                    </div>
                  )}
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
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div
                  className={`p-2 rounded-full mr-4 ${activity.status === "pending"
                      ? "bg-amber-100 text-amber-500"
                      : activity.status === "completed"
                        ? "bg-green-100 text-green-500"
                        : activity.status === "resolved"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.user} {activity.flat && `(${activity.flat})`}
                  </p>
                  <div className="flex items-center mt-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${activity.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : activity.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : activity.status === "resolved"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{approval.title}</h3>
                    <span className="text-xs text-gray-500">{approval.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {approval.user} {approval.flat && `(${approval.flat})`}
                  </p>
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4" rightIcon={<ChevronRight className="h-4 w-4" />}>
              View All Approvals
            </Button>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {event.date} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Home className="h-4 w-4 mr-2 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4" rightIcon={<ChevronRight className="h-4 w-4" />}>
              View Calendar
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

