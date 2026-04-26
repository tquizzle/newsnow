import type { ColumnDef } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import type { NewsItem } from "@shared/types"
import { useNewsTable } from "~/hooks/useNewsTable"

const newsColumns: ColumnDef<NewsItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <a
        href={row.original.url || row.original.mobileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline truncate"
      >
        {row.original.title}
      </a>
    ),
  },
  {
    accessorKey: "pubDate",
    header: "Published",
    cell: ({ row }) => {
      const date = row.original.pubDate
      return date ? new Date(date).toLocaleDateString() : "—"
    },
  },
]

interface NewsTableProps {
  items: NewsItem[]
}

export function NewsTable({ items }: NewsTableProps) {
  const { table } = useNewsTable({
    data: items,
    columns: newsColumns,
    pageSize: 20,
  })

  return (
    <div className="w-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-sm">
        <div className="text-neutral-600 dark:text-neutral-400">
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            items.length,
          )}{" "}
          of {items.length}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
