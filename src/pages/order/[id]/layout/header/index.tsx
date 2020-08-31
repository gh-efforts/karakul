import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { SubHeader, useGlobalModal, FlexibleInput, SubNav } from '../../../../../components'
// import CreateModalView from '../modal/create-modal'

function OrderMHeader() {
  const { showModal } = useGlobalModal()

  const showCreateModal = () => {
    // showModal('创建订单', CreateModalView, {})
  }

  return (
    <SubHeader
      title={
        <SubNav
          links={[
            { name: '订单', url: '/order' },
            { name: '原材料', url: '#' },
          ]}
          active='原材料'
        />
      }
    >
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
        预定原材料
      </Button>
      <FlexibleInput />
    </SubHeader>
  )
}

export default OrderMHeader
