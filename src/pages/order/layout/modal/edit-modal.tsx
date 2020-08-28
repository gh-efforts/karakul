import React from 'react'
import { EditOutlined } from '@ant-design/icons'

import ModalBase from './modal-base'
import { useGlobalModal } from '../../../../components'
import type { TOrder } from '../../order.d'

import styles from './index.module.scss'

interface EditModalViewProps {
  order?: TOrder
  children?: React.ReactNode
}

function EditModalView({ order }: EditModalViewProps): React.ReactElement {
  const { hideModal } = useGlobalModal()
  const onSuccess = () => {
    hideModal()
  }

  // eslint-disable-next-line camelcase
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
          time: undefined,
        }}
      />
    </div>
  )
}

function EditButton({ order }: EditModalViewProps) {
  const { showModal } = useGlobalModal()

  const show = () => {
    showModal('编辑订单', EditModalView, { order })
  }

  return <EditOutlined style={{ color: '#FF9C7C' }} onClick={show} />
}

export default EditButton
