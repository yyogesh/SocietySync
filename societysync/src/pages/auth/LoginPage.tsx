import { Link, useNavigate } from "react-router-dom"
import { Building } from "lucide-react"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "../../context/ThemeContext"
import { getThemeColors } from "../../utils/theme"
import { loginUser } from "../../slices/authSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { LoginFormData, loginSchema } from "../../utils/schemas"


const LoginPage = () => {
  const { theme } = useTheme()
  const themeColors = getThemeColors(theme)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { error, loading } = useAppSelector((state) => state.auth)

  const onSubmit = async (data: LoginFormData) => {
    const resultAction = await dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      }),
    )

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard")
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.colors.backgroundGradient} p-0 md:p-4 relative overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen md:min-h-full relative bg-white backdrop-blur-lg shadow-xl border border-white/20 md:rounded-2xl w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-6">
          <div className={`bg-[${themeColors.primary}]/20 p-3 rounded-full shadow-md`}>
            <Building className={`h-10 w-10 text-[${themeColors.primaryDark}]`} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome to {theme.name}</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account to continue</p>

        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter your email"
              fullWidth
              required
              {...register("email")}
              error={errors.email?.message}
              className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className={`text-sm text-[${themeColors.primary}] hover:text-[${themeColors.primaryDark}]`}
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              required
              className={`bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[${themeColors.primary}]`}
              {...register("password")}
              error={errors.password?.message}
            />
          </div>
          <div className="mb-6 text-center">
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              isLoading={loading}
              className={`bg-[${themeColors.secondary}] text-white hover:bg-[${themeColors.secondaryDark}] focus:ring-[${themeColors.primary}]`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className={`text-[${themeColors.primary}] hover:text-[${themeColors.primaryDark}]`}>
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage
