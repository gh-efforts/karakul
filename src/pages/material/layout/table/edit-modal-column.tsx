import { OrderMaterial } from '../../../../services'
import { ColumnProps } from 'antd/lib/table'

const modalColumns: ColumnProps<OrderMaterial>[] = [
  {
    title: '分类',
    dataIndex: 'name',
  },
  {
    title: '型号',
    dataIndex: 'callType',
  },
  {
    title: '数量',
    dataIndex: 'type',
  },
  {
    title: '行为',
    dataIndex: 'type',
  },
  {
    title: '操作',
    width: 220,
  },
]

export default modalColumns
