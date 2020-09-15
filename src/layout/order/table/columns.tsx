import React from 'react'
import { ClockCircleOutlined, FileAddOutlined, EditOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'

import EditModalView from '../modal/edit-modal'
import HistoryModalView from '../modal/history-modal'
import { useGlobalModal, ColumnProps } from '../../../components'
import { Dispatch, TOrder } from '../../../store/type.d'

interface BtnProps {
  id?: string | null | undefined
}

function EditButton({ id }: BtnProps) {
  const { showModal } = useGlobalModal()
  const dispatch = useDispatch<Dispatch>()

  const show = () => {
    dispatch.order.init(id)
    showModal('编辑订单', EditModalView, {})
  }

  return (
    <Tooltip title='编辑订单'>
      <EditOutlined style={{ color: '#FF9C7C' }} onClick={show} disabled={!id} />
    </Tooltip>
  )
}

function AddButton({ id, name }: { id: string; name: string }) {
  const dispatch = useDispatch<Dispatch>()
  const router = useRouter()

  const onClick = () => {
    dispatch.orderMaterials.init({
      id,
      name,
    })
    router.push('/order/material')
  }

  return id ? (
    <Tooltip title='原材料预定'>
      <FileAddOutlined style={{ color: '#00B2B6' }} disabled={!id} onClick={onClick} />
    </Tooltip>
  ) : (
    <Tooltip title='原材料预定'>
      <FileAddOutlined style={{ color: '#00B2B6' }} />
    </Tooltip>
  )
}

function HistoryButton({ id }: BtnProps) {
  const { showModal } = useGlobalModal()
  const dispatch = useDispatch<Dispatch>()

  const show = () => {
    dispatch.orderHistory.init(id)
    showModal('订单历史', HistoryModalView, {}, 1072)
  }

  return (
    <Tooltip title='订单历史'>
      <ClockCircleOutlined style={{ color: '#FFC01F' }} onClick={show} disabled={!id} />
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
          <EditButton id={order?.id} />
          <HistoryButton id={order?.id} />
          <AddButton id={order?.id ?? ''} name={order.name ?? ''} />
        </span>
      )
    },
  },
]

export default columns
