import React, { useState } from 'react'
import { Input, Divider } from 'antd'

import { ModalButtonGroup, useGlobalModal, message } from '../../../components'
import styles from './index.module.scss'
import { useCreateCommodityTypeApi } from '../service'

export default function CreateModalView() {
  const [name, setname] = useState('')
  const { hideModal } = useGlobalModal()
  const { submit: create, loading } = useCreateCommodityTypeApi()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setname(value)
  }
  const onOK = () => {
    if (name) {
      create(name)
        .then(() => {
          message.success('创建成功')
          hideModal()
        })
        .catch(() => {
          message.success('创建失败')
        })
    }
  }

  return (
    <div className={styles['create-modal']}>
      <Input placeholder='请输入商品类型' onChange={onChange} />
      <Divider />
      <ModalButtonGroup OKText={'创建'} onOK={onOK} loading={loading} className={styles.btns} position='left' />
    </div>
  )
}
