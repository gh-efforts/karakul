import React from 'react'
import { EditOutlined, ClockCircleOutlined } from '@ant-design/icons'

import { withLayout } from '../../../layout'
import OrderMHeader from './layout/header'
import { KTable } from '../../../components'
import { TMaterial } from './material.d'
import columns from './layout/columns'

import styles from './index.module.scss'

const data: TMaterial[] = [
  {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    order_id: 10,
    material: 'material',
    amount: 10,
    model: 'model',
    user: {
      username: 'username',
    },
  },
]

function MaterialPage() {
  return (
    <div className={styles.material}>
      <OrderMHeader />
      <div className={styles.info}>
        <span className={styles['order-no']}>订单编号：3746 </span>
        <EditOutlined style={{ color: '#FF9C7C' }} />
        <ClockCircleOutlined style={{ color: '#FFC01F' }} />
      </div>
      <KTable<TMaterial> columns={columns} data={data} currentPage={1} total={1} rowKey='id' className={styles.table} />
    </div>
  )
}

export default withLayout(MaterialPage)
