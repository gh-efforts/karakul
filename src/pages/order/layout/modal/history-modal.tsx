import React from 'react'

import { KTable, SearchInput } from '../../../../components'
import { TOrder } from '../../order'
import columns from '../columns'

import styles from './history.module.scss'

function HistoryModalView() {
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
    <div>
      <div className={styles['order-no']}>
        <span> 订单编号：3647 </span>
        <SearchInput />
      </div>
      <KTable<TOrder> columns={columns} data={data} currentPage={1} total={data.length} rowKey='id' />
    </div>
  )
}

export default HistoryModalView
