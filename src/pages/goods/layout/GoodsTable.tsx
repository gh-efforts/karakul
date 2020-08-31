import React from 'react'
import { Table, Button } from 'antd'

import styles from './layout.module.scss'
import { Svg, useGlobalModal } from '../../../components'
import CreateGoodsView from './create-goods'

function CreateGoodsBtn({ id }: { id?: string }) {
  const { showModal } = useGlobalModal()

  const show = () => {
    showModal('创建商品', CreateGoodsView, { id })
  }

  return (
    <Button type='text' className='action-pointer' onClick={show} disabled={!!id}>
      创建商品
    </Button>
  )
}

const GoodsTypeColumns = [
  { title: '配件编号', dataIndex: ['id'] },
  { title: '分类', dataIndex: ['type'] },
  { title: '型号', dataIndex: ['modal'] },
  { title: '标识', dataIndex: ['label'] },
]

function GoodsTypeTable(record: Goods) {
  return (
    <Table className={styles.table2} dataSource={record?.types ?? []} columns={GoodsTypeColumns} pagination={false} />
  )
}

const GoodsNumColumns = [
  { title: '商品编号', dataIndex: ['id'] },
  {
    title: '商品类型',
    dataIndex: ['type'],
  },
  {
    title: '仓库',
    dataIndex: ['store'],
  },
  {
    title: '创建时间',
    dataIndex: ['time'],
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
  {
    title() {
      return (
        <span className={styles.btns}>
          <Svg name='btn-sell-h' />
          <Svg name='btn-stock-h' />
        </span>
      )
    },
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

function GoodsNumTable(record: GoodsOrder) {
  return (
    <Table<Goods>
      className={styles.table1}
      columns={GoodsNumColumns}
      pagination={false}
      dataSource={record?.goods ?? []}
      expandable={{ expandedRowRender: GoodsTypeTable }}
    />
  )
}

const GoodsColumns = [
  {
    title: 'no',
    dataIndex: 'id',
    render() {
      return '订单编号：3647'
    },
  },
  {
    title: 'Action',
    render() {
      return <CreateGoodsBtn />
    },
    width: 100,
  },
]

const data1: GoodsOrder[] = [
  {
    id: 'orderid',
    goods: [
      {
        id: 'goodsid',
        goods: 'goods',
        type: 'type',
        store: 'store',
        time: 'time',
        user: {
          username: 'username',
        },
        types: [
          {
            type: 'type',
            modal: 'modal',
            label: 'label',
            id: 'id',
          },
        ],
      },
    ],
  },
]

interface GoodsType {
  type: string
  modal: string
  label: string
  id: string
}

interface Goods {
  id: string
  goods: string
  type: string
  store: string
  time: string
  user: {
    username: string
  }
  types?: GoodsType[]
}

interface GoodsOrder {
  id: string
  goods?: Goods[]
}

interface GoodsTableProps {
  data?: GoodsOrder[]
}

function GoodsTable({ data = data1 }: GoodsTableProps) {
  return (
    <div className={styles.tablebox}>
      <Table<GoodsOrder> columns={GoodsColumns} expandable={{ expandedRowRender: GoodsNumTable }} dataSource={data} />
    </div>
  )
}

export default GoodsTable
