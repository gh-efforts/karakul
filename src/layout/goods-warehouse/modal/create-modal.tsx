import React from 'react'
import { Input, Divider, Form } from 'antd'

import { ModalButtonGroup, message, useGlobalModal } from '../../../components'
import styles from './index.module.scss'
import { useCreateWarehouseApi } from '../service'
import { useRouter } from 'next/router'
import { Store } from 'antd/lib/form/interface'

export function CreateModalView() {
  const { hideModal } = useGlobalModal()
  const { submit: create, loading } = useCreateWarehouseApi()
  const [form] = Form.useForm()

  const router = useRouter()
  const onOK = (values: Store) => {
    const { name } = values
    if (name) {
      create(name)
        .then(() => {
          message.success('创建成功')
          hideModal()
          router.replace('/goods-warehouse')
        })
        .catch(() => {
          message.success('创建失败')
        })
    }
  }

  return (
    <div className={styles['create-modal']}>
      <Form form={form} onFinish={onOK}>
        <Form.Item name='name' rules={[{ required: true, message: '请输入仓库名称' }]}>
          <Input placeholder='请输入仓库名称' />
        </Form.Item>
        <Form.Item>
          <Divider />
          <ModalButtonGroup OKText={'创建'} loading={loading} className={styles.btns} position='left' />
        </Form.Item>
      </Form>
    </div>
  )
}
