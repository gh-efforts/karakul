import React from 'react'

import { withLayout } from '../../layout'
import { KTable } from '../../components'

import columns from './layout/columns'
import OrderHeader from './layout/header'
import type { TOrder } from './order.d'

import styles from './index.module.scss'

function Order(): React.ReactElement {
  const data: TOrder[] = [
    {
      id: 'id',
      created_at: 'created_at',
      updated_at: 'updated_at',
      detail: 'detail',
      amount: 10,
      delivery_time: 'delivery_time',
      created_by: {
        username: 'created_by',
      },
      updated_by: {
        username: 'updated_by',
      },
    },
  ]

  return (
    <div className={styles.order}>
      <OrderHeader />
      <KTable<TOrder> columns={columns} data={data} currentPage={1} total={data.length} rowKey='id' />
    </div>
  )
}

export default withLayout(Order)
