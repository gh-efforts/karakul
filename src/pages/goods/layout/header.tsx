import React from 'react'
import { Button } from 'antd'

import { SubHeader, FlexibleInput } from '../../../components'
// import CreateModalView from '../modal/create-modal'

function Goodsheader() {
  // const { showModal } = useGlobalModal()

  const showCreateModal = () => {
    // showModal('创建订单', CreateModalView, {},800)
  }

  return (
    <SubHeader title='商品'>
      <Button size='large' onClick={showCreateModal}>
        提货记录
      </Button>
      <FlexibleInput />
    </SubHeader>
  )
}

export default Goodsheader
