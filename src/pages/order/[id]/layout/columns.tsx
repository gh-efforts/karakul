import type { TMaterial } from '../material.d'
import { ColumnProps } from '../../../../components'

const columns: ColumnProps<TMaterial>[] = [
  {
    title: '分类',
    dataIndex: 'material',
    ellipsis: true,
  },

  {
    title: '数量',
    dataIndex: 'amount',
  },
  {
    title: '型号',
    dataIndex: 'model',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    ellipsis: true,
  },
  {
    title: '修改时间',
    dataIndex: 'updated_at',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
    ellipsis: true,
  },
]

export default columns
