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
  const [current, setCurrent] = useState(1)
  const [limit, setLimit] = useState(10)
  const [start, setStart] = useState(0)

  const fetchData = () => {
    if (order) {
      fetch({
        variables: {
          id: order?.id,
          limit,
          start,
        },
      })
    }
  }

  useEffect(() => {
    fetchData()
  })
  const onPageChange = (page: number, size?: number) => {
    setCurrent(page)
    setLimit(size || 10)
    setStart((page - 1) * (size || 10))

    fetchData()
  }
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
        currentPage={current}
        pageSize={limit}
        total={data?.orderHistoriesConnection?.aggregate?.count ?? 0}
        rowKey='id'
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default HistoryModalView
