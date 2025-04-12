import type React from "react"
import { useState } from "react"

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  defaultTabId?: string
  onChange?: (tabId: string) => void
  variant?: "default" | "pills" | "underline"
  className?: string
  tabsClassName?: string
  contentClassName?: string
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  variant = "default",
  className = "",
  tabsClassName = "",
  contentClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onChange && onChange(tabId)
  }

  const getTabStyles = (tabId: string, disabled?: boolean) => {
    const isActive = activeTab === tabId
    const baseStyles = "px-4 py-2 text-sm font-medium transition-colors focus:outline-none"
    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

    if (variant === "pills") {
      return `${baseStyles} ${disabledStyles} rounded-lg ${
        isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
      }`
    }

    if (variant === "underline") {
      return `${baseStyles} ${disabledStyles} ${
        isActive
          ? "text-primary border-b-2 border-primary"
          : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
      }`
    }

    // Default variant
    return `${baseStyles} ${disabledStyles} rounded-t-lg ${
      isActive
        ? "bg-white text-primary border border-gray-200 border-b-white"
        : "text-gray-600 hover:text-gray-900 bg-gray-50 border-transparent"
    }`
  }

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={className}>
      <div className={`flex ${variant === "default" ? "border-b border-gray-200" : ""} ${tabsClassName}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={getTabStyles(tab.id, tab.disabled)}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`mt-4 ${contentClassName}`}>{activeContent}</div>
    </div>
  )
}

export default Tabs

