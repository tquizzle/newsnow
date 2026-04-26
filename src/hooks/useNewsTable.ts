import { useState } from "react"
import type { ColumnDef, SortingState, VisibilityState } from "@tanstack/react-table"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import type { NewsItem } from "@shared/types"

const DEFAULT_PAGE_SIZE = 10

interface UseNewsTableOptions {
  data: NewsItem[]
  columns: ColumnDef<NewsItem>[]
  pageSize?: number
}

export function useNewsTable({
  data,
  columns,
  pageSize = DEFAULT_PAGE_SIZE,
}: UseNewsTableOptions) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  })

  return { table, setSorting, setColumnVisibility, setGlobalFilter }
}
