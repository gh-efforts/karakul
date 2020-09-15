import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { KTable, SearchInput } from '../../../components'

import { Dispatch, RootState, TOrderHistories } from '../../../store/type.d'

import columns from '../table/history-columns'

import styles from './history.module.scss'

function HistoryModalView() {
  const dispatch = useDispatch<Dispatch>()

  const { data, total, page, size, id } = useSelector<RootState, RootState['orderHistory']>(s => s.orderHistory)

  const onPageChange = (p: number, s?: number) => {
    dispatch.orderHistory.pageChange({ page: p, size: s })
  }

  return (
    <div>
      <div className={styles['order-no']}>
        <span> 订单编号：{id} </span>
        <SearchInput />
      </div>
      <KTable<TOrderHistories>
        columns={columns}
        data={(data ?? []) as TOrderHistories[]}
        currentPage={page}
        pageSize={size}
        total={total}
        rowKey='id'
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default HistoryModalView
