import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../config/firebase"
import { Building, ArrowLeft, Check } from "lucide-react"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import Card from "../../components/common/Card"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    try {
      setLoading(true)
      setError("")
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || "Failed to send password reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#64748B] p-0 md:p-4 relative overflow-hidden">
      <Card className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <Building className="h-8 w-8 text-primary" />
          </div>
        </div>

        {!success ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset your password</h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your password
            </p>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">{error}</div>}

            <form onSubmit={handleSubmit}>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />

              <Button type="submit" isLoading={loading} className="w-full mt-6">
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">If you don't see it, please check your spam folder</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage

