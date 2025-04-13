import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react"

export type NotificationType = "success" | "error" | "warning" | "info"

export interface NotificationProps {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const NotificationIcons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
}

const NotificationColors = {
  success: "border-l-4 border-green-500 bg-green-50",
  error: "border-l-4 border-red-500 bg-red-50",
  warning: "border-l-4 border-amber-500 bg-amber-50",
  info: "border-l-4 border-blue-500 bg-blue-50",
}

const Notification: React.FC<NotificationProps> = ({ id, type, title, message, duration = 5000, onClose }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  return (
    <div className={`w-full max-w-sm rounded-r-lg shadow-md ${NotificationColors[type]} p-4 mb-3 animate-slide-in`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{NotificationIcons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export interface NotificationContainerProps {
  notifications: NotificationProps[]
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  position = "top-right",
}) => {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  }

  return createPortal(
    <div className={`fixed z-50 p-4 flex flex-col ${positionClasses[position]}`}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>,
    document.body,
  )
}

// Create a notification context and hook for easy usage
type NotificationContextType = {
  showNotification: (props: Omit<NotificationProps, "id" | "onClose">) => void
  hideNotification: (id: string) => void
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([])

  const showNotification = (props: Omit<NotificationProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { ...props, id, onClose: hideNotification }])
  }

  const hideNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <NotificationContainer notifications={notifications} />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export default Notification

