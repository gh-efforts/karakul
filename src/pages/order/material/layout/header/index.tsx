import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { SubHeader, FlexibleInput, SubNav, useGlobalModal, TableHeader, Svg } from '../../../../../components'
import CreateModalView from '../modal/creat-modal'
import EditModalView from '../modal/edit-modal'
import HistroyModalView from '../modal/history-modal'

function OrderMHeader() {
  const { showModal, hideModal } = useGlobalModal()

  const showCreateModal = () => {
    showModal(
      '预定原材料',
      CreateModalView,
      {
        onSuccess: hideModal,
      },
      1072
    )
  }

  const showEditModal = () => {
    showModal(
      '预定原材料',
      EditModalView,
      {
        onSuccess: hideModal,
      },
      1072
    )
  }

  const showHistroyModal = () => {
    showModal(
      '原材料订单历史',
      HistroyModalView,
      {
        onSuccess: hideModal,
      },
      1072
    )
  }

  return (
    <>
      <SubHeader
        title={
          <SubNav
            links={[
              { name: '订单', url: '/order' },
              { name: '原材料', url: '#' },
            ]}
          />
        }
      >
        <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
          预定原材料
        </Button>
        <FlexibleInput />
      </SubHeader>
      <TableHeader title={<span>订单编号：1234</span>}>
        <Button
          type='text'
          icon={<Svg name='btn-revise-h' color='#FF9C7C' offsetY='3' />}
          onClick={showEditModal}
        ></Button>
        <Button
          type='text'
          icon={<Svg name='btn-history-h' color='#FFBB0B' offsetY='3' />}
          onClick={showHistroyModal}
        ></Button>
      </TableHeader>
    </>
  )
}

export default OrderMHeader
