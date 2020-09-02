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

  // eslint-disable-next-line camelcase
  const { id, detail, name, amount, delivery_time } = order || {}

  return (
    <div>
      <div className={styles['order-no']}>订单编号：{id} </div>
      <ModalBase
        OKText='保存'
        onOK={onSuccess}
        initialValues={{
          name,
          detail,
          amount,
          time: delivery_time,
        }}
      />
    </div>
  )
}

export default EditModalView
