import React from 'react'
import { Input, Divider, Form } from 'antd'

import { ModalButtonGroup, useGlobalModal, message } from '../../../components'
import styles from './index.module.scss'
import { useUpdateCommodityTypeApi } from '../service'
import { useRouter } from 'next/router'
import { Store } from 'antd/lib/form/interface'
export interface UpdateModalViewProps {
  id?: string
  name?: string
  children?: React.ReactNode
}
export default function UpdateModalView({ id, name }: UpdateModalViewProps) {
  const { hideModal } = useGlobalModal()
  const { submit: update, loading } = useUpdateCommodityTypeApi()
  const [form] = Form.useForm()

  const router = useRouter()
  const onOK = (values: Store) => {
    const { name: Kname } = values
    if (id && Kname) {
      update(id, Kname)
        .then(() => {
          message.success('修改成功')
          hideModal()
          router.replace('/goods-types')
        })
        .catch(() => {
          message.success('修改失败')
        })
    }
  }

  return (
    <div className={styles['update-modal']}>
      <Form form={form} onFinish={onOK}>
        <Form.Item name='name' initialValue={name} rules={[{ required: true, message: '请输入商品类型' }]}>
          <Input size='large' placeholder='请输入商品类型' />
        </Form.Item>
        <Form.Item>
          <Divider />
          <ModalButtonGroup OKText={'保存'} loading={loading} className={styles.btns} position='left' />
        </Form.Item>
      </Form>
    </div>
  )
}
