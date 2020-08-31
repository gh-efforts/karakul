import React from 'react'
import { ClockCircleOutlined, FileAddOutlined, EditOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import Link from 'next/link'

import EditModalView, { EditModalViewProps } from './modal/edit-modal'
import HistoryModalView from './modal/history-modal'

import type { TOrder } from '../order.d'
import { useGlobalModal, ColumnProps } from 'src/components'

function EditButton({ order }: EditModalViewProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    showModal('编辑订单', EditModalView, { order })
  }

  return <EditOutlined style={{ color: '#FF9C7C' }} onClick={show} />
}

function AddButton({ id }: { id: string }) {
  return id ? (
    <Link href={`/order/material/${id}`}>
      <Tooltip title='原材料预定'>
        <FileAddOutlined style={{ color: '#00B2B6' }} />
      </Tooltip>
    </Link>
  ) : (
    <Tooltip title='原材料预定'>
      <FileAddOutlined style={{ color: '#00B2B6' }} />
    </Tooltip>
  )
}

function HistoryButton() {
  const { showModal } = useGlobalModal()

  const show = () => {
    showModal('订单历史', HistoryModalView, {})
  }

  return <ClockCircleOutlined style={{ color: '#FFC01F' }} onClick={show} />
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
    render(_, order) {
      return (
        <span className='table-operation-group'>
          <EditButton order={order} />
          <HistoryButton />
          <AddButton id={order?.id ?? ''} />
        </span>
      )
    },
  },
]

export default columns
