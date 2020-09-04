import React from 'react'

import { SubHeader, FlexibleInput, SubNav, TableHeader } from '../../../components'

export interface OrderMHeaderProps {
  id: string | string[]
  name: string | string[]
}
function OrderMHHeader({ id, name }: OrderMHeaderProps) {
  return (
    <>
      <SubHeader
        title={
          <SubNav
            links={[
              { name: '订单', url: '/order' },
              { name: '原材料', url: '/order/material/' + id + '?name=' + name },
              { name: '历史', url: '#' },
            ]}
          />
        }
      >
        <FlexibleInput />
      </SubHeader>
      <TableHeader title={<span>订单编号：{`${id}-${name}`}</span>}></TableHeader>
    </>
  )
}

export default OrderMHHeader
