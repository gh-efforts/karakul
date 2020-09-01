import React from 'react'
import { MinusCircleOutlined } from '@ant-design/icons'

function HistoryButton() {
  const onDelete = () => {
    return false
  }

  return <MinusCircleOutlined style={{ color: '#657683' }} onClick={onDelete} />
}

const columns = [
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
    render() {
      return (
        <span className='table-operation-group'>
          <HistoryButton />
        </span>
      )
    },
  },
]

export default columns
