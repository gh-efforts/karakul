import React from 'react'
import { Input, Divider, Form, message } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { useDispatch, useSelector } from 'react-redux'

import { ModalButtonGroup, useGlobalModal } from '../../../components'
import { Dispatch, RootState } from '../../../store/type.d'

import styles from './index.module.scss'

export function CreateModalView() {
  const dispatch = useDispatch<Dispatch>()
  const { loading } = useSelector<RootState, RootState['warehouse']>(s => s.warehouse)
  const { hideModal } = useGlobalModal()

  const [form] = Form.useForm()

  const onOK = async ({ name }: Store) => {
    const flag = dispatch.warehouse.create(name)

    if (flag) {
      message.success('创建成功')
      hideModal()
    } else {
      message.error('创建失败')
    }
  }

  return (
    <div className={styles['create-modal']}>
      <Form form={form} onFinish={onOK}>
        <Form.Item name='name' rules={[{ required: true, message: '请输入仓库名称' }]}>
          <Input size='large' placeholder='请输入仓库名称' />
        </Form.Item>
        <Form.Item>
          <Divider />
          <ModalButtonGroup OKText={'创建'} loading={loading} className={styles.btns} position='left' />
        </Form.Item>
      </Form>
    </div>
  )
}
