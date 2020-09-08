import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { SubHeader, FlexibleInput, SubNav, useGlobalModal, TableHeader, Svg } from '../../../components'
import CreateModalView from '../modal/creat-modal'
import EditModalView from '../modal/edit-modal'
import { useRouter } from 'next/router'
export interface OrderMHeaderProps {
  id: string | string[]
  name: string | string[]
}
function OrderMHeader({ id, name }: OrderMHeaderProps) {
  const { showModal } = useGlobalModal()
  const router = useRouter()
  const showCreateModal = () => {
    showModal(
      '预定原材料',
      CreateModalView,
      {
        id,
      },
      1072
    )
  }

  const showEditModal = () => {
    showModal(
      '修改原材料',
      EditModalView,
      {
        id,
      },
      1072
    )
  }

  const showHistroyModal = () => {
    router.push('/order/material/history?id=' + id + '&name=' + name)
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
      <TableHeader title={<span>订单编号：{`${id}-${name}`}</span>}>
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
