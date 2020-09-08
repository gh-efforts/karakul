import React from 'react'
import { ClockCircleOutlined, FileAddOutlined, EditOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import Link from 'next/link'

import EditModalView, { EditModalViewProps } from '../modal/edit-modal'
import HistoryModalView, { HistoryModalViewProps } from '../modal/history-modal'

import type { TOrder } from '../order.d'
import { useGlobalModal, ColumnProps } from '../../../components'
import moment from 'moment'

function EditButton({ order }: EditModalViewProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    showModal('编辑订单', EditModalView, { order })
  }

  return (
    <Tooltip title='编辑订单'>
      <EditOutlined style={{ color: '#FF9C7C' }} onClick={show} />
    </Tooltip>
  )
}

function AddButton({ id, name }: { id: string; name: string }) {
  return id ? (
    <Link href={`/order/material/${id}?name=${name}`}>
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

function HistoryButton({ order }: HistoryModalViewProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    showModal('订单历史', HistoryModalView, { order }, 1072)
  }

  return (
    <Tooltip title='订单历史'>
      <ClockCircleOutlined style={{ color: '#FFC01F' }} onClick={show} />
    </Tooltip>
  )
}

const columns: ColumnProps<TOrder>[] = [
  {
    title: '订单编号',
    dataIndex: 'id',
    key: 'id',
    ellipsis: true,
  },
  {
    title: '订单名称',
    dataIndex: 'name',
    key: 'name',
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
    title: '交付时间',
    dataIndex: 'delivery_time',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    ellipsis: true,
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    ellipsis: true,
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作',
    width: 160,
    render(_, order) {
      return (
        <span className='table-operation-group'>
          <EditButton order={order} />
          <HistoryButton order={order} />
          <AddButton id={order?.id ?? ''} name={order.name ?? ''} />
        </span>
      )
    },
  },
]

export default columns
