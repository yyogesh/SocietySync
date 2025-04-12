import React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

export interface Column<T> {
  header: string
  accessor: keyof T | ((data: T) => React.ReactNode)
  cell?: (data: T) => React.ReactNode
  sortable?: boolean
}

export interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (data: T) => void
  isLoading?: boolean
  emptyMessage?: string
  className?: string
  rowClassName?: string | ((data: T, index: number) => string)
  sortable?: boolean
  pagination?: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
}

function Table<T>({
  data,
  columns,
  onRowClick,
  isLoading = false,
  emptyMessage = "No data available",
  className = "",
  rowClassName = "",
  sortable = false,
  pagination,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T | null
    direction: "asc" | "desc"
  }>({
    key: null,
    direction: "asc",
  })

  const handleSort = (key: keyof T) => {
    if (!sortable) return

    let direction: "asc" | "desc" = "asc"

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof T) => {
    if (!sortable) return null

    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
    }

    return <ChevronsUpDown className="h-4 w-4 opacity-50" />
  }

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!]
      const bValue = b[sortConfig.key!]

      if (aValue === bValue) return 0

      if (sortConfig.direction === "asc") {
        return aValue < bValue ? -1 : 1
      } else {
        return aValue > bValue ? -1 : 1
      }
    })
  }, [data, sortConfig])

  const getRowClassName = (data: T, index: number) => {
    if (typeof rowClassName === "function") {
      return rowClassName(data, index)
    }
    return rowClassName
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable && sortable ? "cursor-pointer select-none" : ""
                }`}
                onClick={() => {
                  if (column.sortable && sortable && typeof column.accessor === "string") {
                    handleSort(column.accessor)
                  }
                }}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {column.sortable && sortable && typeof column.accessor === "string" && getSortIcon(column.accessor)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${getRowClassName(row, rowIndex)} ${onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {column.cell
                      ? column.cell(row)
                      : typeof column.accessor === "function"
                        ? column.accessor(row)
                        : String(row[column.accessor] || "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between w-full">
            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{pagination.currentPage}</span> of{" "}
              <span className="font-medium">{pagination.totalPages}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table

