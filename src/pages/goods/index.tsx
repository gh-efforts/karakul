import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Empty } from 'antd'

import { withLayout } from '../../layout/layout'
import { KPagination } from '../../components'
import GoodsHeader from '../../layout/goods/header'
import GoodsItem from '../../layout/goods/goods-item'
import { Dispatch, RootState } from '../../store/type.d'

import styles from './index.module.scss'

function Goods() {
  const dispatch = useDispatch<Dispatch>()

  const { data, total, page, size } = useSelector<RootState, RootState['goods']>(s => s.goods)

  const onPageChange = (p: number, s?: number) => {
    dispatch.goods.pageChange({ page: p, size: s })
  }

  useEffect(() => {
    dispatch.goods.init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.goods}>
      <GoodsHeader />
      <div className={styles.table}>
        <div className={styles['table-items']}>
          {data.length > 0 ? (
            data?.map(order => {
              return <GoodsItem key={order?.id} id={order?.id} name={order?.name} />
            })
          ) : (
            <div className={styles.empty}>{<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</div>
          )}
        </div>
        <KPagination total={total} pageSize={size} currentPage={page} onPageChange={onPageChange} />
      </div>
    </div>
  )
}
export default withLayout(Goods)
