import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { Provider } from "react-redux"
import { store } from "./store"
import { ThemeProvider } from "./context/ThemeContext"
import { NotificationProvider } from "./components/common/Notification"

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </Provider>

  )
}

export default App
