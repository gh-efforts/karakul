import React, { useState } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { Table } from 'antd'

import styles from './index.module.scss'

interface GoodsItem {
  id?: string
  type?: string
  store?: string
}

const columns: ColumnProps<GoodsItem>[] = [
  {
    title: '商品编号',
    dataIndex: 'id',
  },
  {
    title: '商品类型',
    dataIndex: 'type',
  },
  {
    title: '仓库',
    dataIndex: 'store',
  },
]

const data: GoodsItem[] = [{ id: 'id', type: 'type', store: 'store' }]

function GoodsTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([])

  const onChange = (keys: (string | number)[]) => {
    setSelectedRowKeys(keys)
  }
  return (
    <Table<GoodsItem>
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey='id'
      className={styles.table}
      rowSelection={{
        type: 'checkbox',
        onChange,
        selectedRowKeys,
      }}
    />
  )
}

export default GoodsTable
