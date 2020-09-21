import React from 'react'
import { Input, Divider, Form } from 'antd'

import { ModalButtonGroup, useGlobalModal, message } from '../../../components'
import styles from './index.module.scss'
import { useCreateCommodityTypeApi } from '../service'
import { useRouter } from 'next/router'
import { Store } from 'antd/lib/form/interface'

export default function CreateModalView() {
  const { hideModal } = useGlobalModal()
  const { submit: create, loading } = useCreateCommodityTypeApi()
  const [form] = Form.useForm()

  const router = useRouter()
  const onOK = (values: Store) => {
    const { name } = values
    if (name) {
      create(name)
        .then(() => {
          message.success('创建成功')
          hideModal()
          router.replace('/goods-types')
        })
        .catch(() => {
          message.success('创建失败')
        })
    }
  }

  return (
    <div className={styles['create-modal']}>
      <Form form={form} onFinish={onOK}>
        <Form.Item name='name' rules={[{ required: true, message: '请输入商品类型' }]}>
          <Input size='large' placeholder='请输入商品类型' />
        </Form.Item>
        <Form.Item>
          <Divider />
          <ModalButtonGroup OKText={'创建'} loading={loading} className={styles.btns} position='left' />
        </Form.Item>
      </Form>
    </div>
  )
}
