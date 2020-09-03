import { ColumnProps } from 'antd/lib/table'

import { Material } from '../material'

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
    title: '行为',
    dataIndex: 'action',
  },
  {
    title: '操作',
    width: 220,
  },
]

export default modalColumns
