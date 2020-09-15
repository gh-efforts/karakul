import React from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
import { ModalButtonGroup } from '../../../components'
import { RootState } from '../../../store/type.d'

interface ModalProps {
  OKText: string | false
  onOK?: () => void
  loading?: boolean
  children: React.ReactNode
}

function ModalView({ OKText, onOK, loading, children }: ModalProps): React.ReactElement {
  const { meta } = useSelector<RootState, RootState['orderMaterial']>(s => s.orderMaterial)

  return (
    <div>
      <span>订单编号：{meta?.id ?? ''}</span>
      <div className={styles.content}>
        <div>
          {children}
          {OKText ? (
            <ModalButtonGroup
              OKText={OKText || ''}
              onOK={onOK}
              loading={loading}
              className={styles.btns}
              position='left'
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
export default ModalView
