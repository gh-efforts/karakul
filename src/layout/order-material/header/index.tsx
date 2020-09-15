import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { SubHeader, FlexibleInput, SubNav, useGlobalModal, TableHeader, Svg } from '../../../components'
import CreateModalView from '../modal/creat-modal'
import EditModalView from '../modal/edit-modal'
import { Dispatch, RootState } from '../../../store/type.d'

function OrderMHeader() {
  const router = useRouter()
  const dispatch = useDispatch<Dispatch>()

  const { showModal } = useGlobalModal()
  const { meta } = useSelector<RootState, RootState['orderMaterials']>(s => s.orderMaterials)

  const showCreateModal = () => {
    dispatch.orderMaterial.changeMeta({ id: meta?.id, tag: 'create' })
    showModal('预定原材料', CreateModalView, {}, 1072)
  }

  const showEditModal = () => {
    dispatch.orderMaterial.changeMeta({ id: meta?.id, tag: 'edit' })
    showModal('修改原材料', EditModalView, {}, 1072)
  }

  const showHistroyModal = () => {
    router.push('/order/material/history?id=' + meta?.id + '&name=' + meta?.name)
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
        <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal} disabled={!!meta?.id}>
          预定原材料
        </Button>
        <FlexibleInput />
      </SubHeader>
      <TableHeader title={<span>订单编号：{`${meta?.id ?? ''}-${name}`}</span>}>
        <Button
          type='text'
          icon={<Svg name='btn-revise-h' color='#FF9C7C' offsetY='3' />}
          onClick={showEditModal}
          disabled={!meta?.id}
        />
        <Button
          type='text'
          icon={<Svg name='btn-history-h' color='#FFBB0B' offsetY='3' />}
          onClick={showHistroyModal}
          disabled={!meta?.id}
        />
      </TableHeader>
    </>
  )
}

export default OrderMHeader
