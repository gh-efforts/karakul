import React from 'react'
import { ColumnProps } from 'antd/lib/table'

import { Material } from '../material'
import { MinusCircleOutlined } from '@ant-design/icons'
interface DeleteButtonProps {
  record: Material
}
function DeleteButton({ record }: DeleteButtonProps) {
  const onDelete = () => {
    console.log(record)
  }
  return <MinusCircleOutlined style={{ color: '#657683' }} onClick={onDelete} />
}
const modalColumns: ColumnProps<Material>[] = [
  {
    title: '分类',
    dataIndex: 'material',
  },
  {
    title: '型号',
    dataIndex: 'model',
  },
  {
    title: '数量',
    dataIndex: 'amount',
  },
  {
    title: '操作',
    width: 220,
    render(_text: string, record: Material) {
      return (
        <span className='table-operation-group'>
          <DeleteButton record={record} />
        </span>
      )
    },
  },
]

export default modalColumns
