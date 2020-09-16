import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { withLayout } from '../../../layout/layout'
import { KTable } from '../../../components'
import columns from '../../../layout/order-material/table/column'
import MaterialHeader from '../../../layout/order-material/header'

import { Dispatch, RootState, OrderMaterialType } from '../../../store/type.d'

import styles from './index.module.scss'

function Material() {
  const dispatch = useDispatch<Dispatch>()

  const { data, total, page, size } = useSelector<RootState, RootState['orderMaterials']>(s => s.orderMaterials)

  const onChange = (p: number, s?: number) => {
    dispatch.orderMaterials.pageChange({ page: p, size: s })
  }

  return (
    <div className={styles.material}>
      <MaterialHeader />
      <KTable<OrderMaterialType>
        columns={columns}
        data={(data ?? []) as OrderMaterialType[]}
        isEmpty={total === 0}
        pageSize={size}
        currentPage={page}
        total={total}
        rowKey={(item: OrderMaterialType) => item?.id}
        onPageChange={onChange}
      />
    </div>
  )
}

export default withLayout(Material)
