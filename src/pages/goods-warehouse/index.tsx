import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { withLayout } from '../../layout/layout'
import GoodsWarehouseHeader from '../../layout/goods-warehouse/header'
import { KTable } from '../../components'
import columns from '../../layout/goods-warehouse/table/column'
import { Dispatch, RootState, GoodsWarehouseType } from '../../store/type.d'

import styles from './index.module.scss'

function GoodsWarehouse() {
  const dispatch = useDispatch<Dispatch>()
  const { data, total, page, size } = useSelector<RootState, RootState['goodsWarehouse']>(s => s.goodsWarehouse)

  const onPageChange = (p: number, s?: number) => {
    dispatch.goodsWarehouse.pageChange({ page: p, size: s })
  }

  useEffect(() => {
    dispatch.orders.init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.warehouse}>
      <GoodsWarehouseHeader />
      <KTable<GoodsWarehouseType>
        data={data}
        columns={columns}
        total={total}
        currentPage={page}
        pageSize={size}
        rowKey='id'
        onPageChange={onPageChange}
      />
    </div>
  )
}
export default withLayout(GoodsWarehouse)
