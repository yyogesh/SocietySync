import React, { forwardRef } from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  containerClassName?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, fullWidth = false, containerClassName = "", className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            bg-white border ${error ? "border-red-500" : "border-gray-300"} 
            text-gray-900 text-sm rounded-lg 
            focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-primary"} 
            focus:border-transparent
            block w-full p-2.5
            ${className}
          `}
          {...props}
        />
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-400"}`}>{error || helperText}</p>
        )}
      </div>
    )
  },
)

export default Textarea