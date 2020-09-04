import { ColumnProps } from 'antd/lib/table'
import { OrderMaterialType } from '../service'
import moment from 'moment'

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
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    render: text => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
]

export default columns
