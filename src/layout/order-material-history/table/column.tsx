import React from 'react'
import { ColumnProps } from 'antd/lib/table'
import { HistoryInfo, MaterialHistories, MaterialHistory } from '../history'
import { KTable, Svg, useGlobalModal } from '../../../components'
import HistroyModalView from '../modal/history-modal'
import moment from 'moment'
interface ViewButtonProps {
  record: HistoryInfo
}
function ViewButton({ record }: ViewButtonProps) {
  const { showModal } = useGlobalModal()
  const onView = () => {
    showModal('附件备注', HistroyModalView, { data: record })
  }
  return <Svg name='btn-view-h' style={{ color: '#657683' }} onClick={onView} />
}

const columns: ColumnProps<HistoryInfo>[] = [
  {
    title: '编号',
    dataIndex: 'id',
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
  {
    title: '操作',
    width: 220,
    render(_text: string, record: HistoryInfo) {
      return (
        <span className='table-operation-group'>
          <ViewButton record={record} />
        </span>
      )
    },
  },
]

export const MaterialHistoriesExpandedRowRender = (data: HistoryInfo) => {
  const TData: MaterialHistories[] = data.content

  const columns: ColumnProps<MaterialHistories>[] = [{ title: '分类', dataIndex: 'name', key: 'name' }]

  return (
    <KTable<MaterialHistories>
      columns={columns}
      data={TData}
      pagination={false}
      expandedRowRender={record => MaterialHistoryExpandedRowRender(record)}
    />
  )
}

export const MaterialHistoryExpandedRowRender = (data: MaterialHistories) => {
  const TData: MaterialHistory[] = data.value

  const columns: ColumnProps<MaterialHistory>[] = [
    { title: '型号', dataIndex: 'model', key: 'model' },
    { title: '行为', dataIndex: 'action', key: 'action' },
    { title: '数量', dataIndex: 'amount', key: 'amount' },
  ]

  return <KTable<MaterialHistory> columns={columns} data={TData} pagination={false} />
}

export default columns
