import React from 'react'

import ModalBase, { OrderFormVal } from './order-modal-base'
import { useGlobalModal, message } from '../../../components'
import type { TOrder } from '../order.d'

import styles from './index.module.scss'
import { useUpdateOrderApi } from '../services'
import { useRouter } from 'next/router'

export interface EditModalViewProps {
  order?: TOrder
  children?: React.ReactNode
}

function EditModalView({ order }: EditModalViewProps): React.ReactElement {
  const { hideModal } = useGlobalModal()
  const { submit: update, loading } = useUpdateOrderApi()

  const router = useRouter()

  // eslint-disable-next-line camelcase
  const { id, detail, name, amount, delivery_time } = order || {}

  const onSuccess = ({ name, detail, amount, time }: OrderFormVal) => {
    if (id && name && amount && detail && time) {
      update(id, name, amount, detail, time)
        .then(() => {
          message.success('修改成功')
          hideModal()
          router.replace({ pathname: router.pathname, query: router.query })
        })
        .catch(() => {
          message.error('修改失败')
        })
    }
  }
  return (
    <div>
      <div className={styles['order-no']}>订单编号：{id} </div>
      <ModalBase
        OKText='保存'
        onOK={onSuccess}
        loading={loading}
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
