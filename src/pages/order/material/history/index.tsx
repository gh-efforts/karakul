import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { withLayout } from '../../../../layout/layout'
import { KTable } from '../../../../components'
import columns, { MaterialHistoriesExpandedRowRender } from '../../../../layout/order-material-history/table/column'
import HistoryHeader from '../../../../layout/order-material-history/header'
import { Dispatch, RootState, HistoryInfo } from '../../../../store/type.d'

import styles from './index.module.scss'

function History() {
  const dispatch = useDispatch<Dispatch>()

  const { data, total, page, size } = useSelector<RootState, RootState['orderMaterialHistory']>(
    s => s.orderMaterialHistory
  )

  const onPageChange = (p: number, s?: number) => {
    dispatch.orderMaterialHistory.pageChange({ page: p, size: s })
  }

  return (
    <div className={styles.history}>
      <HistoryHeader />
      <KTable<HistoryInfo>
        columns={columns}
        data={(data ?? []) as HistoryInfo[]}
        isEmpty={true}
        pageSize={size}
        currentPage={page}
        total={total}
        rowKey='id'
        onPageChange={onPageChange}
        expandedRowRender={(record: HistoryInfo) => MaterialHistoriesExpandedRowRender(record)}
      />
    </div>
  )
}

export default withLayout(History)
