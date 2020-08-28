import React from 'react'
import { EditOutlined, ClockCircleOutlined, FileAddOutlined } from '@ant-design/icons'

import { ColumnProps } from '../../../components/table'
import { OrderQuery } from '../../../services'

export type TOrder = NonNullable<OrderQuery['order']>

const columns: ColumnProps<TOrder>[] = [
  {
    title: '订单编号',
    dataIndex: 'id',
    key: 'id',
    ellipsis: true,
  },
  {
    title: '详情',
    dataIndex: 'detail',
    ellipsis: true,
  },
  {
    title: '数量',
    dataIndex: 'amount',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    ellipsis: true,
  },
  {
    title: '交付时间',
    dataIndex: 'delivery_time',
    ellipsis: true,
  },
  {
    title: '操作人',
    render(_, order) {
      // eslint-disable-next-line camelcase
      return order?.updated_by?.username ?? order?.created_by?.username
    },
    ellipsis: true,
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
