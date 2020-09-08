import React from 'react'
import { MinusCircleOutlined } from '@ant-design/icons'
import { WarehouseType, useDeleteWarehouseApi } from '../service'
import { ColumnProps } from 'antd/lib/table'
import { message, useGlobalModal } from '../../../components'
import { useRouter } from 'next/router'
import moment from 'moment'

interface DeleteButtonProps {
  id: string
}

function DeleteButton({ id }: DeleteButtonProps) {
  const { submit, loading } = useDeleteWarehouseApi()
  const { hideModal } = useGlobalModal()
  const router = useRouter()
  const onDelete = () => {
    submit(id)
      .then(() => {
        message.success('删除成功')
        hideModal()
        router.replace('/goods-warehouse')
      })
      .catch(() => {
        message.success('删除失败')
      })
  }

  return <MinusCircleOutlined disabled={loading} style={{ color: '#657683' }} onClick={onDelete} />
}

const columns: ColumnProps<WarehouseType>[] = [
  {
    title: '仓库名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    ellipsis: true,
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '创建人',
    dataIndex: ['user', 'username'],
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    ellipsis: true,
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作',
    width: 160,
    render(_text: string, record: WarehouseType) {
      return (
        <span className='table-operation-group'>
          <DeleteButton id={record.id} />
        </span>
      )
    },
  },
]

export default columns
