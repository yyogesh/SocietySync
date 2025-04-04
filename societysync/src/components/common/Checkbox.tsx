import React, { forwardRef } from "react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  containerClassName?: string
}
// block text-sm font-medium text-gray-700
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, fullWidth = false, containerClassName = "", className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`
              w-4 h-4 text-primary focus:ring-2 
              ${error ? "border-red-500" : "border-gray-300"} 
              rounded ${className}
            `}
            {...props}
          />
          {label && (
            <label htmlFor={props.id} className="ml-2 text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
        </div>
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-400"}`}>{error || helperText}</p>
        )}
      </div>
    )
  },
)

export default Checkbox