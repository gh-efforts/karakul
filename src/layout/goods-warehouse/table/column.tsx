import React from 'react'
import { MinusCircleOutlined } from '@ant-design/icons'
import { WarehouseType, useDeleteWarehouseApi } from '../service'
import { ColumnProps } from 'antd/lib/table'
import { message, useGlobalModal } from 'src/components'

interface DeleteButtonProps {
  id: string
}

function DeleteButton({ id }: DeleteButtonProps) {
  const { submit, loading } = useDeleteWarehouseApi()
  const { hideModal } = useGlobalModal()
  const onDelete = () => {
    submit(id)
      .then(() => {
        message.success('创建成功')
        hideModal()
      })
      .catch(() => {
        message.success('创建失败')
      })
  }

  return <MinusCircleOutlined disabled={loading} style={{ color: '#657683' }} onClick={onDelete} />
}

const columns: ColumnProps<WarehouseType>[] = [
  {
    title: '仓库名称',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'name',
  },
  {
    title: '创建人',
    dataIndex: 'name',
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
