import React from 'react'
import { Form, Input, Button } from 'antd'

import styles from './index.module.scss'
import { MaterialsSelect, getRealValue } from '../../../components'
import { Store } from 'antd/lib/form/interface'
import { Material } from '../material.d'
import { ActionType } from '../service'

interface CreateFormProps {
  onSubmit: ({ id, amount, material, model }: Material) => void
}
export default function CreateForm({ onSubmit }: CreateFormProps) {
  const [form] = Form.useForm()

  const onFinish = (values: Store) => {
    const { amount, material, model } = values
    if (amount && material && model) {
      const [, mname] = getRealValue(material)

      const id = new Date().getTime().toString()

      onSubmit({ id, amount, material: mname, model, action: ActionType.Create })
      form.resetFields()
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div className={styles['create-form']}>
      <Form layout={'inline'} form={form} onFinish={onFinish} onReset={onReset}>
        <MaterialsSelect name='material' noLabel style={{ width: 188 }} required />
        <Form.Item name='model'>
          <Input size='large' placeholder='请输入型号' allowClear />
        </Form.Item>
        <Form.Item name='amount' rules={[{ required: true, message: '请输入数量' }]}>
          <Input size='large' type='number' placeholder='请输入数量' allowClear />
        </Form.Item>
        <Form.Item>
          <Button type='link' htmlType='submit'>
            保存
          </Button>
          <Button type='text' htmlType='reset'>
            清空
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
