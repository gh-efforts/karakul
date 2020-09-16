import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { SubHeader, FlexibleInput, SubNav, TableHeader } from '../../../components'
import { RootState, Dispatch } from '../../../store/type.d'

function OrderMHHeader() {
  const { meta } = useSelector<RootState, RootState['orderMaterialHistory']>(s => s.orderMaterialHistory)

  const dispatch = useDispatch<Dispatch>()

  const beforeToMaterial = () => {
    dispatch.orderMaterials.init(meta)
  }

  return (
    <>
      <SubHeader
        title={
          <SubNav
            links={[
              { name: '订单', url: '/order' },
              { name: '原材料', url: '/order/material', onClick: beforeToMaterial },
              { name: '历史', url: '#' },
            ]}
          />
        }
      >
        <FlexibleInput />
      </SubHeader>
      <TableHeader title={<span>订单编号：{`${meta?.id ?? ''}-${meta?.name ?? ''}`}</span>} />
    </>
  )
}

export default OrderMHHeader
