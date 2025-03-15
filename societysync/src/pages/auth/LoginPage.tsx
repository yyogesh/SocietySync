import { useState } from "react"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { motion } from 'framer-motion'
import { Building } from "lucide-react"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = false;
  const loading = false;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#64748B] p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-3 rounded-full shadow-md">
            <Building className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome to SocietySync</h2>
        <p className="text-center text-gray-300 mb-6">Sign in to your account to continue</p>

        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input label={"Email Address"}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              fullWidth
              required
              containerClassName="mb-0"
              onChange={(e) => setEmail(e.target.value)}
              helperText={"Enter your email"}
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <a href="/forgot-password" className="text-sm text-white hover:text-gray-300">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              placeholder="Enter your password"
              fullWidth
              required
              className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              helperText={"Enter your password"} />
          </div>
          <div className="mb-6 text-center">
            <Button type="submit" fullWidth disabled={loading} isLoading={loading}
              className="bg-white text-gray-900 hover:bg-gray-200 focus:ring-white"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?
            <a href="/signup" className="text-white font-semibold hover:underline ml-1">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage

// class Login {
//   constructor() {
//     this.username = ""
//     this.password = ""
//   }
// }