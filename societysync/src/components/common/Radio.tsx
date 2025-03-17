import React, { forwardRef } from "react"

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  fullWidth?: boolean
  containerClassName?: string
  options: { value: string; label: string }[]
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { label, helperText, error, fullWidth = false, containerClassName = "", className = "", options, ...props },
    ref,
  ) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-white mb-1">
            {label}
          </label>
        )}
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                ref={ref}
                type="radio"
                value={option.value}
                className={`
                  w-4 h-4 text-primary focus:ring-2 
                  ${error ? "border-red-500" : "border-gray-300"} 
                  ${className}
                `}
                {...props}
              />
              <label htmlFor={props.id} className="ml-2 text-sm text-white">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? "text-red-600" : "text-gray-400"}`}>{error || helperText}</p>
        )}
      </div>
    )
  },
)

export default Radio