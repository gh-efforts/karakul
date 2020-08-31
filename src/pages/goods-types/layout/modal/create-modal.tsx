import React from 'react'
import { Input, Divider } from 'antd'
import { ModalButtonGroup } from '../../../../components'
import styles from './index.module.scss'
export default function CreateModalView() {
  const onOK = () => {
    return false
  }
  return (
    <div className={styles['create-modal']}>
      <Input placeholder='请输入商品类型' />
      <Divider />
      <ModalButtonGroup OKText={'创建'} onOK={onOK} loading={false} className={styles.btns} position='left' />
    </div>
  )
}
