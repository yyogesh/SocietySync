import React, { forwardRef } from "react"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  containerClassName?: string
}

// <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      containerClassName = "",
      className = "",
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputType = type === "password" && showPassword ? "text" : type

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    // `$ adsfasf ${fullWidth} asfasfasf`
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-white mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{leftIcon}</div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`
              bg-white border ${error ? "border-red-500" : "border-gray-300"} 
              text-gray-900 text-sm rounded-lg 
              focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-primary"} 
              focus:border-transparent
              block w-full p-2.5
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon || type === "password" ? "pr-10" : ""}
              ${className}
            `}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {rightIcon && type !== "password" && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightIcon}</div>
          )}
        </div>
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-400"}`}>{error || helperText}</p>
        )}
      </div>
    )
  },
)

export default Input