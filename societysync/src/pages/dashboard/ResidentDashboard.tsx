"use client"

import { useState, useEffect } from "react"
import { Bell, Building, Calendar, DollarSign, MessageSquare, UserCircle, ChevronRight, Home } from "lucide-react"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import { useNotification } from "../../components/common/Notification"
import { useAppSelector } from "../../hooks/hooks"

// Mock data for resident dashboard
const residentStats = [
  {
    title: "Pending Bills",
    value: "₹2,500",
    icon: DollarSign,
    color: "bg-red-500",
    status: "Due in 5 days",
  },
  {
    title: "Upcoming Events",
    value: "3",
    icon: Calendar,
    color: "bg-blue-500",
    status: "Next: June 15",
  },
  {
    title: "New Notices",
    value: "5",
    icon: Bell,
    color: "bg-amber-500",
    status: "Last: 2 hours ago",
  },
  {
    title: "Open Complaints",
    value: "1",
    icon: MessageSquare,
    color: "bg-purple-500",
    status: "In progress",
  },
]

// Mock data for recent notices
const recentNotices = [
  {
    id: 1,
    title: "Water Supply Interruption",
    date: "2023-06-15",
    content: "Due to maintenance work, water supply will be interrupted from 10 AM to 2 PM tomorrow.",
    priority: "high",
  },
  {
    id: 2,
    title: "Annual General Meeting",
    date: "2023-06-10",
    content: "The Annual General Meeting will be held on June 20th at 6 PM in the community hall.",
    priority: "medium",
  },
  {
    id: 3,
    title: "New Security Protocol",
    date: "2023-06-05",
    content: "New security protocols will be implemented starting next week. Please check your email for details.",
    priority: "low",
  },
]

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Summer Pool Party",
    date: "2023-06-25",
    time: "4:00 PM",
    location: "Society Pool Area",
  },
  {
    id: 2,
    title: "Yoga Workshop",
    date: "2023-06-18",
    time: "7:00 AM",
    location: "Community Hall",
  },
  {
    id: 3,
    title: "Children's Day Celebration",
    date: "2023-06-30",
    time: "5:00 PM",
    location: "Garden Area",
  },
]

// Mock data for recent visitors
const recentVisitors = [
  {
    id: 1,
    name: "John Doe",
    purpose: "Delivery",
    date: "June 15, 2023",
    time: "2:30 PM",
    status: "Approved",
  },
  {
    id: 2,
    name: "Jane Smith",
    purpose: "Guest",
    date: "June 14, 2023",
    time: "6:45 PM",
    status: "Approved",
  },
  {
    id: 3,
    name: "Mike Johnson",
    purpose: "Maintenance",
    date: "June 12, 2023",
    time: "11:15 AM",
    status: "Approved",
  },
]

const ResidentDashboard = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { showNotification } = useNotification()
  const [greeting, setGreeting] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 17) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

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
      title: `Welcome back, ${user?.displayName || "Resident"}!`,
      message: "You have 1 pending bill and 5 new notices.",
      duration: 5000,
    })
  }, [user, showNotification])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500"
      case "medium":
        return "border-l-4 border-amber-500"
      case "low":
        return "border-l-4 border-blue-500"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {greeting}, {user?.displayName || "Resident"}!
          </h1>
          <p className="text-gray-600 mt-1">{currentDate}</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span className="text-sm text-gray-500">Flat: {user?.flatNumber || "A-101"}</span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">Resident</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {residentStats.map((stat, index) => (
          <Card key={index} className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                  <p className="text-xs text-gray-500 mt-2">{stat.status}</p>
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
        {/* Recent Notices */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Notices</h2>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentNotices.map((notice) => (
              <div
                key={notice.id}
                className={`p-4 bg-white rounded-lg border ${getPriorityColor(notice.priority)} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{notice.title}</h3>
                  <span className="text-xs text-gray-500">{notice.date}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{notice.content}</p>
                <div className="flex items-center mt-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      notice.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : notice.priority === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                <DollarSign className="h-6 w-6 mb-2" />
                <span>Pay Bills</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>Raise Complaint</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                <UserCircle className="h-6 w-6 mb-2" />
                <span>Add Visitor</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center">
                <Building className="h-6 w-6 mb-2" />
                <span>Book Facility</span>
              </Button>
            </div>
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
          </Card>
        </div>
      </div>

      {/* Recent Visitors */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Visitors</h2>
          <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{visitor.purpose}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {visitor.date} - {visitor.time}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {visitor.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default ResidentDashboard

