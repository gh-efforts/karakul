import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { message } from 'antd'

import ModalBase, { OrderFormVal } from './order-modal-base'
import { useGlobalModal } from '../../../components'

import styles from './index.module.scss'

import { Dispatch, RootState, TOrder } from '../../../store/type.d'

export interface EditModalViewProps {
  order?: TOrder
  children?: React.ReactNode
}

function EditModalView() {
  const { data, loading } = useSelector<RootState, RootState['order']>(s => s.order)

  const dispatch = useDispatch<Dispatch>()

  const { hideModal } = useGlobalModal()

  // eslint-disable-next-line camelcase
  const { id, detail, name, amount, delivery_time } = data || ({} as TOrder)

  const onSuccess = async ({ name, detail, amount, time }: OrderFormVal) => {
    if (id && name && amount && detail && time) {
      const flag = await dispatch.order.update({ id, name, amount, detail, delivery_time: time })

      if (flag) {
        message.success('修改成功')
        hideModal()
      } else {
        message.error('修改失败')
      }
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
