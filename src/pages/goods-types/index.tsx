import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import GoodsTypesHeader from '../../layout/goods-types/header'
import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'
import columns from '../../layout/goods-types/table/columns'
import { Dispatch, RootState, CommodityTypeType } from '../../store/type.d'

import styles from './index.module.scss'

function GoodsTypes() {
  const dispatch = useDispatch<Dispatch>()

  const { data, total, page, size } = useSelector<RootState, RootState['goodsType']>(s => s.goodsType)

  const onPageChange = (p: number, s?: number) => {
    dispatch.orders.pageChange({ page: p, size: s })
  }

  useEffect(() => {
    dispatch.goodsType.init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.page}>
      <GoodsTypesHeader />
      <KTable<CommodityTypeType>
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

export default withLayout(GoodsTypes)
