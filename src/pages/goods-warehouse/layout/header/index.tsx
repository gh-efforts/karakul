import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { SubHeader, useGlobalModal, FlexibleInput } from '../../../../components'
import CreateModalView from '../modal/create-modal'

function GoodsWarehouseHeader() {
  const { showModal, hideModal } = useGlobalModal()
  const showCreateModal = () => {
    showModal('新建仓库', CreateModalView, {
      onSuccess: () => {
        hideModal()
      },
    })
  }

  return (
    <SubHeader title='仓库'>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
        新建仓库
      </Button>
      <FlexibleInput />
    </SubHeader>
  )
}

export default GoodsWarehouseHeader
