import { ColumnProps } from 'antd/lib/table'
import { HistoryInfo } from '../history'

const columns: ColumnProps<HistoryInfo>[] = [
  {
    title: '编号',
    dataIndex: 'id',
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
  {
    title: '操作',
    width: 220,
  },
]

export default columns
