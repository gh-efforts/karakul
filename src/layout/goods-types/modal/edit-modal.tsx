import React from 'react'
import { Input, Divider, Form, message } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { useDispatch, useSelector } from 'react-redux'

import { ModalButtonGroup, useGlobalModal } from '../../../components'
import { Dispatch, RootState } from '../../../store/type.d'

import styles from './index.module.scss'

export interface UpdateModalViewProps {
  id?: string
  name?: string
  children?: React.ReactNode
}

export default function UpdateModalView({ id, name }: UpdateModalViewProps) {
  const dispatch = useDispatch<Dispatch>()
  const { loading } = useSelector<RootState, RootState['goodsType']>(s => s.goodsType)

  const { hideModal } = useGlobalModal()

  const [form] = Form.useForm()

  const onOK = async ({ name: Kname }: Store) => {
    const flag = await dispatch.goodsType.update({
      name: Kname,
      id,
    })
    if (flag) {
      message.success('修改成功')
      hideModal()
    } else {
      message.error('修改失败')
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
