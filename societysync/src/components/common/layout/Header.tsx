"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks"
import { Bell, Search, UserCircle, Settings, LogOut, HelpCircle } from "lucide-react"
import { useNotification } from "../Notification"
import { logoutUser } from "../../../slices/authSlice"

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New notice posted",
      message: "A new notice regarding water supply has been posted.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Maintenance payment due",
      message: "Your maintenance payment for June is due in 3 days.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      title: "New event announced",
      message: "Summer Pool Party on June 25th at 4:00 PM.",
      time: "3 days ago",
      read: true,
    },
  ])

  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-dropdown="notifications"]') && showNotifications) {
        setShowNotifications(false)
      }
      if (!target.closest('[data-dropdown="profile"]') && showProfile) {
        setShowProfile(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications, showProfile])

  const handleLogout = async () => {
    await dispatch(logoutUser())
    showNotification({
      type: "success",
      title: "Logged out successfully",
      duration: 3000,
    })
    navigate("/login")
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" data-dropdown="notifications">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                <h3 className="px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-200">
                  Notifications
                </h3>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">No notifications</div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))
                  )}
                </div>
                <a href="/notifications" className="block px-4 py-2 text-sm text-center text-primary hover:bg-gray-50">
                  View all notifications
                </a>
              </div>
            )}
          </div>

          <div className="relative" data-dropdown="profile">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.displayName?.charAt(0) || <UserCircle className="w-6 h-6" />}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{user?.displayName || "User"}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || "Resident"}</p>
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Your Profile
                </a>
                <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </a>
                <a href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & Support
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

