import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { SubHeader, useGlobalModal, FlexibleInput } from '../../../components'
import CreateModalView from '../modal/create-modal'

function GoodsTypesHeader() {
  const { showModal, hideModal } = useGlobalModal()

  const showCreateModal = () => {
    showModal(
      '创建商品类型',
      CreateModalView,
      {
        onSuccess: () => {
          hideModal()
        },
      },
      400
    )
  }

  return (
    <SubHeader title='商品类型'>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
        商品类型
      </Button>
      <FlexibleInput />
    </SubHeader>
  )
}

export default GoodsTypesHeader
