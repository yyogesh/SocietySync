import type React from "react"

export interface CardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  footer?: React.ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className={`px-6 py-4 border-b border-gray-200 ${headerClassName}`}>
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
      {footer && <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${footerClassName}`}>{footer}</div>}
    </div>
  )
}

export default Card

