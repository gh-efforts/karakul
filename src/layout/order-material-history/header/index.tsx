import React from 'react'
import { useSelector } from 'react-redux'

import { SubHeader, FlexibleInput, SubNav, TableHeader } from '../../../components'
import { RootState } from '../../../store/type.d'

function OrderMHHeader() {
  const { meta } = useSelector<RootState, RootState['orderMaterialHistory']>(s => s.orderMaterialHistory)

  // TODO: dispatch before redirect

  return (
    <>
      <SubHeader
        title={
          <SubNav
            links={[
              { name: '订单', url: '/order' },
              { name: '原材料', url: '/order/material?id=' + meta?.id + '&name=' + meta?.name },
              { name: '历史', url: '#' },
            ]}
          />
        }
      >
        <FlexibleInput />
      </SubHeader>
      <TableHeader title={<span>订单编号：{`${meta?.id ?? ''}-${meta?.name ?? ''}`}</span>}></TableHeader>
    </>
  )
}

export default OrderMHHeader
