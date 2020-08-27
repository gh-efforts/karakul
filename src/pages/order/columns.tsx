import React from 'react'
import { EditOutlined, ClockCircleOutlined, FileAddOutlined } from '@ant-design/icons'

import { ColumnProps } from '../../components/table'

export interface TOrder {
  id: string
}
const columns: ColumnProps<TOrder>[] = [
  {
    title: '订单编号',
    dataIndex: 'id',
    key: 'id',
    ellipsis: true,
  },
  {
    title: '详情',
  },
  {
    title: '数量',
  },
  {
    title: '创建时间',
  },
  {
    title: '支付时间',
  },
  {
    title: '操作人',
  },
  {
    title: '操作',
    width: 160,
    render() {
      return (
        <span className='table-operation-group'>
          <EditOutlined style={{ color: '#FF9C7C' }} />
          <ClockCircleOutlined style={{ color: '#FFC01F' }} />
          <FileAddOutlined style={{ color: '#00B2B6' }} />
        </span>
      )
    },
  },
]

export default columns
