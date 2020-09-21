import React, { createContext, useContext } from 'react'
import { Table, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { Svg, useGlobalModal } from '../../../components'
import { OrderCommodity, SAccessory } from '../goods.d'

import styles from './index.module.scss'
import UpdateGoodsView from '../update-goods'
import moment from 'moment'

interface EditButtonProps {
  record: OrderCommodity
}

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-explicit-any
const RefreshCtx = createContext<{ refresh?: (() => void) | (() => Promise<any>) }>({ refresh() {} })

export { RefreshCtx }

function EditButton({ record }: EditButtonProps) {
  const { refresh } = useContext(RefreshCtx)
  const { showModal } = useGlobalModal()
  const onshow = () => {
    showModal('修改商品', UpdateGoodsView, { record, refresh })
  }

  return (
    <Tooltip title='修改商品'>
      <Svg name='btn-edit-h' onClick={onshow} />
    </Tooltip>
  )
}

const GoodsTypeColumns: ColumnProps<SAccessory>[] = [
  { title: '分类', dataIndex: ['material', 'name'] },
  { title: '型号', dataIndex: ['model'] },
  { title: '编号', dataIndex: ['sn'] },
  { title: '标识', dataIndex: ['label'] },
]

function GoodsTypeTable(record: OrderCommodity) {
  const accessories: SAccessory[] = Array.isArray(record?.accessories) ? record?.accessories : []
  return (
    <Table<SAccessory>
      className={styles.table2}
      dataSource={(accessories ?? []) as SAccessory[]}
      columns={GoodsTypeColumns}
      pagination={false}
      rowKey={item => item.id ?? Math.random()}
    />
  )
}

const GoodsNumColumns: ColumnProps<OrderCommodity>[] = [
  { title: '商品编号', dataIndex: ['code'] },
  {
    title: '商品类型',
    dataIndex: ['commodity_type', 'name'],
  },
  {
    title: '仓库',
    dataIndex: ['warehouse', 'name'],
  },
  {
    title: '流向',
    dataIndex: ['destination'],
  },
  {
    title: '创建时间',
    dataIndex: ['createdAt'],
    render: (text: string) => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
  {
    title: '操作',
    render(_text: string, record: OrderCommodity) {
      return (
        <span className={styles.btns}>
          <EditButton record={record} />
        </span>
      )
    },
    width: 120,
  },
]

interface GoodsItemTableProps {
  expanded?: boolean
  data?: OrderCommodity[]
}

function GoodsItemTable({ data, expanded }: GoodsItemTableProps) {
  return (
    <div className={`${styles.table} ${expanded ? styles['table-show'] : styles['table-hide']}`}>
      <Table<OrderCommodity>
        columns={GoodsNumColumns}
        pagination={false}
        dataSource={(data ?? []) as OrderCommodity[]}
        expandable={{ expandedRowRender: GoodsTypeTable }}
        rowKey={item => item.id}
      />
    </div>
  )
}

export default GoodsItemTable
