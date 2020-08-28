import React from 'react'
import { Table, Pagination } from 'antd'
import { ColumnProps, TableProps } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'

import styles from './index.module.scss'

export type { ColumnProps }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<T extends any> extends TableProps<T> {
  data: T[]
  loading?: boolean
  columns: ColumnProps<T>[]
  isEmpty?: boolean
  total: number
  currentPage: number
  onPageChange?: (page: number, size?: number | undefined) => void
  onTableChange?: (page: number, filter: unknown, sorter: unknown) => void
  pageSize?: number
  rowSelection?: TableRowSelection<T>
  onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLElement>
  onShowSizeChange?: ((current: number, size: number) => void) | undefined
  footerslot?: React.ReactElement
  minWidth?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
function KTable<T extends object>(props: DataTableProps<T>): React.ReactElement {
  const { data, total, pageSize, currentPage, onPageChange } = props

  return (
    <div className={styles['table-page']}>
      <Table<T> {...props} dataSource={data} className={styles.table} pagination={false} />
      <div className={styles.pagination}>
        <span>共{total}条记录</span>
        <Pagination
          total={total}
          showSizeChanger
          pageSize={pageSize ?? 20}
          current={currentPage ?? 1}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default KTable
