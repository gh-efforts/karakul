import React from 'react'

import styles from './index.module.scss'
import { ModalButtonGroup } from '../../../../components'

interface ModalProps {
  orderId: string
  OKText: string
  onOK: () => void
  loading?: boolean
  children: React.ReactNode
}
function ModalView({ orderId, OKText, onOK, loading, children }: ModalProps): React.ReactElement {
  return (
    <div>
      <span>订单编号：{orderId}</span>
      <div className={styles.content}>
        <div>
          {children}
          <ModalButtonGroup OKText={OKText} onOK={onOK} loading={loading} className={styles.btns} position='left' />
        </div>
      </div>
    </div>
  )
}
export default ModalView
