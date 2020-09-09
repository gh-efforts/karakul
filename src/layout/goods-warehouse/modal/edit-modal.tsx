import React from 'react'
import { Input, Divider, Form } from 'antd'

import { ModalButtonGroup, message, useGlobalModal } from '../../../components'
import styles from './index.module.scss'
import { useUpdateWarehouseApi } from '../service'
import { useRouter } from 'next/router'
import { Store } from 'antd/lib/form/interface'

export interface UpdateModalViewProps {
  id?: string
  name?: string
  children?: React.ReactNode
}

export function UpdateModalView({ id, name }: UpdateModalViewProps): React.ReactElement {
  const { hideModal } = useGlobalModal()
  const { submit: update, loading } = useUpdateWarehouseApi()
  const [form] = Form.useForm()

  const router = useRouter()
  const onOK = (values: Store) => {
    const { name: Kname } = values
    if (id && Kname) {
      update(id, Kname)
        .then(() => {
          message.success('修改成功')
          hideModal()
          router.replace('/goods-warehouse')
        })
        .catch(() => {
          message.success('修改失败')
        })
    }
  }

  return (
    <div className={styles['update-modal']}>
      <Form form={form} onFinish={onOK}>
        <Form.Item name='name' initialValue={name} rules={[{ required: true, message: '请输入仓库名称' }]}>
          <Input size='large' placeholder='请输入仓库名称' />
        </Form.Item>
        <Form.Item>
          <Divider />
          <ModalButtonGroup OKText={'保存'} loading={loading} className={styles.btns} position='left' />
        </Form.Item>
      </Form>
    </div>
  )
}
