import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { motion } from 'framer-motion'
import { Building } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").min(1, 'Email is required'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ForgotPasswordFormData>({resolver: zodResolver(forgotPasswordSchema)})
  const navigate = useNavigate();

  const error = false;
  const success = false;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log('data', data)
    // Handle password reset logic here
    // After successful API call, navigate to confirmation page or show success message
    // navigate('/reset-password-confirmation')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFEF80] via-[#FFCB45] to-[#FFA726] p-0 md:p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen md:min-h-full relative bg-white backdrop-blur-lg shadow-xl border border-white/20 md:rounded-2xl w-full max-w-md p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-[#FF9800]/20 p-3 rounded-full shadow-md">
            <Building className="h-10 w-10 text-[#FF6F00]" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your email to receive a password reset link</p>

        {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">{error}</div>}
        {success && <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-sm">Password reset link sent! Please check your email.</div>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <Input 
              label={"Email Address"}
              id="email"
              type="email"
              placeholder="Enter your email"
              fullWidth
              required
              {...register('email')}
              containerClassName="mb-0"
              helperText={"We'll send a password reset link to this email"}
              error={errors.email?.message}
              className="bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-[#FF9800]"
            />
          </div>
          <div className="mb-6 text-center">
            <Button 
              type="submit" 
              fullWidth 
              disabled={isSubmitting} 
              isLoading={isSubmitting}
              className="bg-[#003366] text-white hover:bg-[#00274F] focus:ring-[#FF9800]"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?
            <Link to="/login" className="text-[#FF9800] font-semibold hover:underline ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage