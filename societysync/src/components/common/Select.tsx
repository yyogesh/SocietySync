import React, { forwardRef } from "react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  containerClassName?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, helperText, error, fullWidth = false, containerClassName = "", className = "", options, ...props },
    ref,
  ) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-white mb-1">
            {label}
          </label>
        )}
        <select
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
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-400"}`}>{error || helperText}</p>
        )}
      </div>
    )
  },
)

export default Select