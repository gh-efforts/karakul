import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { Svg } from '../../../components'
import { OrderCommodity } from '../goods.d'

import styles from './index.module.scss'

const GoodsTypeColumns: ColumnProps<OrderCommodity>[] = [
  { title: '分类', dataIndex: ['material'] },
  { title: '型号', dataIndex: ['model'] },
  { title: '数量', dataIndex: ['amount'] },
  { title: '标识', dataIndex: ['label'] },
]

function GoodsTypeTable(record: OrderCommodity) {
  return (
    <Table
      className={styles.table2}
      dataSource={record?.accessories ?? []}
      columns={GoodsTypeColumns}
      pagination={false}
      rowKey='id'
    />
  )
}

const GoodsNumColumns: ColumnProps<OrderCommodity>[] = [
  { title: '商品编号', dataIndex: ['id'] },
  {
    title: '商品类型',
    dataIndex: ['commodity_type', 'name'],
  },
  {
    title: '仓库',
    dataIndex: ['warehouse', 'name'],
  },
  {
    title: '创建时间',
    dataIndex: ['createdAt'],
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
  {
    title: '操作',
    render() {
      return (
        <span className={styles.btns}>
          <Svg name='btn-edit-h' />
          <Svg name='btn-history-h' />
        </span>
      )
    },
    width: 120,
  },
]

const goods: OrderCommodity[] = [
  {
    id: 'goodsid',
    commodity_type: {
      id: 'id',
      name: 'name',
    },
    warehouse: {
      name: 'name',
      id: 'id',
    },
    createdAt: 'createdAt',
    user: {
      username: 'username',
    },
    accessories: [
      {
        type: 'type',
        modal: 'modal',
        label: 'label',
        id: 'id',
      },
    ],
  },
]

interface GoodsItemTableProps {
  expanded?: boolean
  data?: OrderCommodity[]
}

function GoodsItemTable({ data = goods, expanded }: GoodsItemTableProps) {
  return (
    <div className={`${styles.table} ${expanded ? styles['table-show'] : styles['table-hide']}`}>
      <Table<OrderCommodity>
        columns={GoodsNumColumns}
        pagination={false}
        dataSource={data ?? []}
        expandable={{ expandedRowRender: GoodsTypeTable }}
        rowKey='id'
      />
    </div>
  )
}

export default GoodsItemTable
