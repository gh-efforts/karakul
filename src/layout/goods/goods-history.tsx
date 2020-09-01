import React from 'react'

import styles from './modal.module.scss'
import { KTable } from '../../components'

interface GoodsHistoryViewProps {
  id?: string
  children?: React.ReactNode
}

interface GoodsItem {
  id?: string
  type?: string
  madel?: string
  label?: string
}

const columns = [
  {
    title: '配件编号',
    dataIndex: 'id',
  },
  {
    title: '型号',
    dataIndex: 'type',
  },
  {
    title: '配件编号',
    dataIndex: 'madel',
  },
  {
    title: '标示',
    dataIndex: 'label',
  },
]

const data: GoodsItem[] = [
  {
    id: 'id',
    type: 'type',
    madel: 'madel',
    label: 'label',
  },
]

function GoodsHistoryView({ id }: GoodsHistoryViewProps) {
  return (
    <div>
      <div className={styles.title}>
        <span>商品编号{id}</span>
      </div>
      <KTable<GoodsItem>
        className={styles.border}
        columns={columns}
        data={data}
        total={1}
        rowKey='id'
        currentPage={1}
      />
    </div>
  )
}

export default GoodsHistoryView
