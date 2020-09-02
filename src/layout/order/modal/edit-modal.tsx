import React from 'react'

import ModalBase from './order-modal-base'
import { useGlobalModal } from '../../../components'
import type { TOrder } from '../order.d'

import styles from './index.module.scss'

export interface EditModalViewProps {
  order?: TOrder
  children?: React.ReactNode
}

function EditModalView({ order }: EditModalViewProps): React.ReactElement {
  const { hideModal } = useGlobalModal()
  const onSuccess = () => {
    hideModal()
  }

  const { detail, amount, delivery_time } = order || {}

  return (
    <div>
      <div className={styles['order-no']}>订单编号：3647 </div>
      <ModalBase
        OKText='保存'
        onOK={onSuccess}
        initialValues={{
          detail,
          amount,
          time: delivery_time,
        }}
      />
    </div>
  )
}

export default EditModalView
