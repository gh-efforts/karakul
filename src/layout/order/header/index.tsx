import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { SubHeader, useGlobalModal, FlexibleInput } from '../../../components'
import CreateModalView from '../modal/create-modal'

function OrderHeader() {
  const { showModal } = useGlobalModal()

  const showCreateModal = () => {
    showModal('创建订单', CreateModalView, {})
  }

  return (
    <SubHeader title='订单'>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
        创建订单
      </Button>
      <FlexibleInput />
    </SubHeader>
  )
}

export default OrderHeader
