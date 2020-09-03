import { ColumnProps } from 'antd/lib/table'
import { OrderMaterialType } from '../service'

const columns: ColumnProps<OrderMaterialType>[] = [
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
]

export default columns
