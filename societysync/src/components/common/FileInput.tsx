import React, { forwardRef } from "react"

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  containerClassName?: string
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, helperText, error, fullWidth = false, containerClassName = "", className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="file"
          className={`
            block w-full text-sm text-gray-900 
            border ${error ? "border-red-500" : "border-gray-700"} 
            rounded-lg cursor-pointer 
            focus:outline-none ${error ? "focus:ring-red-500" : "focus:ring-primary"} 
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

export default FileInput