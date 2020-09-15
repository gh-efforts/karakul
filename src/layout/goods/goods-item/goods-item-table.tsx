import React, { useMemo } from 'react'
import { Table, Tooltip } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'

import { Svg, useGlobalModal } from '../../../components'
import { OrderCommodity, SAccessory } from '../goods.d'
import UpdateGoodsView, { UpdateGoodsViewProps } from '../update-goods'

import styles from './index.module.scss'

function EditButton({ record, pid }: UpdateGoodsViewProps) {
  const { showModal } = useGlobalModal()
  const onshow = () => {
    showModal('修改商品', UpdateGoodsView, { record, pid })
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

function generateGoodsNumColumns(pid: string | null | undefined): ColumnProps<OrderCommodity>[] {
  return [
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
            <EditButton record={record} pid={pid} />
          </span>
        )
      },
      width: 120,
    },
  ]
}
interface GoodsItemTableProps {
  expanded?: boolean
  data?: OrderCommodity[]
  pid?: string | null | undefined
}

function GoodsItemTable({ data, expanded, pid }: GoodsItemTableProps) {
  const goodsNumColumns = useMemo(() => {
    return generateGoodsNumColumns(pid)
  }, [pid])

  return (
    <div className={`${styles.table} ${expanded ? styles['table-show'] : styles['table-hide']}`}>
      <Table<OrderCommodity>
        columns={goodsNumColumns}
        pagination={false}
        dataSource={(data ?? []) as OrderCommodity[]}
        expandable={{ expandedRowRender: GoodsTypeTable }}
        rowKey={item => item.id}
      />
    </div>
  )
}

export default GoodsItemTable
