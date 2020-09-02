import React, { useState, useEffect } from 'react'

import { KTable, SearchInput } from '../../../components'
import { TOrder, TOrderHistories } from '../order.d'
import columns from '../table/history-columns'

import styles from './history.module.scss'
import { useOrderHistoriesConnectionLazyQuery } from '../../../services'
export interface HistoryModalViewProps {
  order?: TOrder
  children?: React.ReactNode
}

function HistoryModalView({ order }: HistoryModalViewProps) {
  const [fetch, { data, loading }] = useOrderHistoriesConnectionLazyQuery({ fetchPolicy: 'network-only' })
  const { id } = order || {}
  const [currentPage] = useState(1)
  const [limit] = useState(10)
  const [start] = useState(0)
  useEffect(() => {
    if (order) {
      fetch({
        variables: {
          id: order?.id,
          limit,
          start,
        },
      })
    }
  })
  return (
    <div>
      <div className={styles['order-no']}>
        <span> 订单编号：{id} </span>
        <SearchInput />
      </div>
      <KTable<TOrderHistories>
        columns={columns}
        data={(data?.orderHistoriesConnection?.values ?? []) as TOrderHistories[]}
        loading={loading}
        currentPage={currentPage}
        total={data?.orderHistoriesConnection?.aggregate?.totalCount ?? 0}
        rowKey='id'
      />
    </div>
  )
}

export default HistoryModalView
