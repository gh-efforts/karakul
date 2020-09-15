import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ModalBase, { OrderFormVal } from './order-modal-base'
import { useGlobalModal, message } from '../../../components'
import { Dispatch, RootState } from '../../../store/type.d'

function CreateModalView() {
  const { hideModal } = useGlobalModal()
  const dispatch = useDispatch<Dispatch>()
  const { loading } = useSelector<RootState, RootState['order']>(s => s.order)

  const onSuccess = async ({ name, detail, amount, time }: OrderFormVal) => {
    if (name && amount && detail && time) {
      const flag = await dispatch.order.create({
        name,
        amount,
        detail,
        delivery_time: time,
      })

      if (flag) {
        message.success('创建成功')
        hideModal()
      } else {
        message.error('创建失败')
      }
    }
  }

  return <ModalBase OKText='创建' onOK={onSuccess} loading={loading} />
}

export default CreateModalView
