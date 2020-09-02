import React from 'react'

import ModalBase, { OrderFormVal } from './order-modal-base'
import { useGlobalModal, message } from '../../../components'
import { useCreateOrderApi } from '../services'
import { useRouter } from 'next/router'

function CreateModalView() {
  const { submit: create, loading } = useCreateOrderApi()
  const { hideModal } = useGlobalModal()
  const router = useRouter()
  const onSuccess = ({ name, detail, amount, time }: OrderFormVal) => {
    if (name && amount && detail && time) {
      create(name, amount, detail, time)
        .then(() => {
          message.success('创建成功')
          hideModal()
          router.replace('/order')
        })
        .catch(() => {
          message.error('创建失败')
        })
    }
  }

  return <ModalBase OKText='创建' onOK={onSuccess} loading={loading} />
}

export default CreateModalView
