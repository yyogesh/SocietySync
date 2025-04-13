import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks"
import {
  Home,
  Users,
  Bell,
  Calendar,
  MessageSquare,
  Building,
  LogOut,
  Menu,
  X,
  UserCircle,
  DollarSign,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Shield,
} from "lucide-react"
import { useNotification } from "../Notification"
import { logoutUser } from "../../../slices/authSlice"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    settings: false,
    reports: false,
  })

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { showNotification } = useNotification()

  const isAdmin = user?.role === "admin"
  const isSecurity = user?.role === "security"

  // Check if the sidebar should be collapsed on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const handleLogout = async () => {
    await dispatch(logoutUser())
    showNotification({
      type: "success",
      title: "Logged out successfully",
      duration: 3000,
    })
    navigate("/login")
  }

  const NavItem = ({
    to,
    icon: Icon,
    label,
    onClick,
    hasSubmenu = false,
    isSubmenuOpen = false,
    badge,
  }: {
    to?: string
    icon: any
    label: string
    onClick?: () => void
    hasSubmenu?: boolean
    isSubmenuOpen?: boolean
    badge?: number
  }) => {
    const isActive = to ? location.pathname === to : false

    return (
      <div className={`${hasSubmenu && isSubmenuOpen ? "mb-1" : ""}`}>
        {to ? (
          <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            {isOpen && (
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{label}</span>
                {badge && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">{badge}</span>
                )}
                {hasSubmenu &&
                  (isSubmenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
            )}
            {!isOpen && badge && (
              <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                {badge}
              </span>
            )}
          </Link>
        ) : (
          <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100`}
          >
            <Icon className="h-5 w-5" />
            {isOpen && (
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{label}</span>
                {badge && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">{badge}</span>
                )}
                {hasSubmenu &&
                  (isSubmenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
              </div>
            )}
            {!isOpen && badge && (
              <span className="absolute top-0 right-0 px-1.5 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
                {badge}
              </span>
            )}
          </button>
        )}
      </div>
    )
  }

  const SubNavItem = ({ to, label, badge }: { to: string; label: string; badge?: number }) => {
    const isActive = location.pathname === to

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 pl-12 pr-4 py-2 rounded-lg transition-colors ${
          isActive ? "bg-primary/10 text-primary font-medium" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {isOpen && (
          <div className="flex items-center justify-between w-full">
            <span>{label}</span>
            {badge && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">{badge}</span>
            )}
          </div>
        )}
      </Link>
    )
  }

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0 z-20`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isOpen ? (
          <div className="flex items-center">
            <Building className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-xl font-bold text-primary">SocietyHub</h1>
          </div>
        ) : (
          <Building className="h-8 w-8 text-primary mx-auto" />
        )}
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-100">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
        {isAdmin && <NavItem to="/admin" icon={Home} label="Admin Dashboard" />}

        {!isAdmin && !isSecurity && <NavItem to="/dashboard" icon={Home} label="Dashboard" />}

        {isSecurity && <NavItem to="/security-dashboard" icon={Shield} label="Security Dashboard" />}

        <NavItem to="/notices" icon={Bell} label="Notices" badge={5} />

        {!isSecurity && <NavItem to="/maintenance" icon={DollarSign} label="Maintenance" badge={2} />}

        <NavItem to="/visitors" icon={UserCircle} label="Visitors" />

        {!isSecurity && (
          <>
            <NavItem to="/complaints" icon={MessageSquare} label="Complaints" />
            <NavItem to="/facilities" icon={Building} label="Facilities" />
            <NavItem to="/events" icon={Calendar} label="Events" />
          </>
        )}

        {isAdmin && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase mt-6 mb-2">
              {isOpen && "Administration"}
            </div>
            <NavItem to="/users" icon={Users} label="User Management" />

            <NavItem
              icon={Settings}
              label="Settings"
              hasSubmenu={true}
              isSubmenuOpen={expandedMenus.settings}
              onClick={() => toggleMenu("settings")}
            />

            {isOpen && expandedMenus.settings && (
              <div className="ml-2 mt-1 space-y-1 border-l-2 border-gray-100">
                <SubNavItem to="/society-settings" label="Society Settings" />
                <SubNavItem to="/roles" label="Role Management" />
                <SubNavItem to="/billing-settings" label="Billing Settings" />
              </div>
            )}

            <NavItem
              icon={BarChart3}
              label="Reports"
              hasSubmenu={true}
              isSubmenuOpen={expandedMenus.reports}
              onClick={() => toggleMenu("reports")}
            />

            {isOpen && expandedMenus.reports && (
              <div className="ml-2 mt-1 space-y-1 border-l-2 border-gray-100">
                <SubNavItem to="/financial-reports" label="Financial Reports" />
                <SubNavItem to="/visitor-reports" label="Visitor Reports" />
                <SubNavItem to="/complaint-reports" label="Complaint Reports" />
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <UserCircle className="h-5 w-5" />
          {isOpen && <span className="font-medium">Profile</span>}
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors mt-1"
        >
          <HelpCircle className="h-5 w-5" />
          {isOpen && <span className="font-medium">Help</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors mt-1"
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

