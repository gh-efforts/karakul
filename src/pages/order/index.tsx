import React from 'react'

import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'

import columns from '../../layout/order/columns'
import OrderHeader from '../../layout/order/header'
import type { TOrder } from '../../layout/order/order.d'

import styles from './index.module.scss'

function Order(): React.ReactElement {
  const data: TOrder[] = [
    {
      id: 'id',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
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
