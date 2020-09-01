import React from 'react'

import ModalBase from './order-modal-base'
import { useGlobalModal } from '../../../components'

function CreateModalView() {
  const { hideModal } = useGlobalModal()
  const onSuccess = () => {
    hideModal()
  }

  return <ModalBase OKText='创建' onOK={onSuccess} />
}

export default CreateModalView
