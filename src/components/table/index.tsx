import React from 'react'
import { Table, Pagination } from 'antd'
import { ColumnProps, TableProps } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'

import styles from './index.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<T extends any>
  extends Omit<TableProps<T>, 'pagination' | 'dataSource'>,
    Omit<KPaginationProps, 'className'> {
  data: T[]
  loading?: boolean
  columns: ColumnProps<T>[]
  isEmpty?: boolean
  onPageChange?: (page: number, size?: number | undefined) => void
  onTableChange?: (page: number, filter: unknown, sorter: unknown) => void
  rowSelection?: TableRowSelection<T>
  onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLElement>
  onShowSizeChange?: ((current: number, size: number) => void) | undefined
  footerslot?: React.ReactElement
  minWidth?: string
  pagination?: boolean
  paginationClassName?: string
}

interface KPaginationProps {
  total?: number
  pageSize?: number
  currentPage?: number
  onPageChange?: ((page: number, size?: number | undefined) => void) | undefined
  className?: string
}

function KPagination({ total, pageSize, currentPage, onPageChange, className }: KPaginationProps) {
  return (
    <div className={`${styles.pagination} ${className ?? ''}`}>
      <span>共 {total || 0} 条记录</span>
      <Pagination
        total={total}
        showSizeChanger
        pageSize={pageSize ?? 20}
        current={currentPage ?? 1}
        onChange={onPageChange}
      />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
function KTable<T extends object>({
  data,
  total,
  pageSize,
  currentPage,
  onPageChange,
  pagination = true,
  className,
  paginationClassName,
  ...resetProps
}: DataTableProps<T>): React.ReactElement {
  return (
    <div className={`${styles['table-page']} ${pagination && styles['table-with-pagination']} ${className}`}>
      <Table<T> {...resetProps} dataSource={data} className={styles.table} pagination={false} />

      {pagination && (
        <KPagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
          className={paginationClassName}
        />
      )}
    </div>
  )
}

export { KPagination }
export default KTable
