import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { SubHeader, useGlobalModal, FlexibleInput } from '../../../../components'
import CreateModalView from '../modal/create-modal'

function GoodsWarehouseHeader() {
  const { showModal, hideModal } = useGlobalModal()
  const showCreateModal = () => {
    showModal(
      '商品入库',
      CreateModalView,
      {
        onSuccess: () => {
          hideModal()
        },
      },
      832
    )
  }

  const toSotre = () => {
    return false
  }

  return (
    <SubHeader title='仓库'>
      <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
        商品入库
      </Button>
      <Button size='large' onClick={toSotre}>
        仓库管理
      </Button>
      <FlexibleInput />
    </SubHeader>
  )
}

export default GoodsWarehouseHeader
