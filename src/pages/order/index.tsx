import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'

import columns from '../../layout/order/table/columns'
import OrderHeader from '../../layout/order/header'
import type { TOrder } from '../../layout/order/order.d'

import styles from './index.module.scss'

import { Dispatch, RootState } from '../../store/type.d'

function Order(): React.ReactElement {
  const dispatch = useDispatch<Dispatch>()

  const { data, total, page, size } = useSelector<RootState, RootState['orders']>(s => s.orders)

  const onPageChange = (p: number, s?: number) => {
    dispatch.orders.pageChange({ page: p, size: s })
  }

  useEffect(() => {
    dispatch.orders.init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.order}>
      <OrderHeader />
      <KTable<TOrder>
        data={(data ?? []) as TOrder[]}
        columns={columns}
        total={total}
        currentPage={page}
        pageSize={size}
        rowKey={item => item.id}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default withLayout(Order)
