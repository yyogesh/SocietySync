import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import { NotificationProvider } from "../../common/Notification"
import { useAppSelector } from "../../../hooks/hooks"

const Layout = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </NotificationProvider>
  )
}

export default Layout

