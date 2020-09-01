import React from 'react'
import { Form, Input, Button, Select } from 'antd'

import styles from './index.module.scss'

const { Option } = Select

export default function CreateForm() {
  const [form] = Form.useForm()

  const handleChange = () => {
    return false
  }

  return (
    <div className={styles['create-form']}>
      <Form layout={'inline'} form={form}>
        <Form.Item name='layout'>
          <Select size='large' style={{ width: 188 }} onChange={handleChange} placeholder='请选择分类'>
            <Option value='lucy'>Jack</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Input size='large' placeholder='请输入型号' />
        </Form.Item>
        <Form.Item>
          <Input size='large' placeholder='请输入备注信息' />
        </Form.Item>
        <Form.Item>
          <Button type='link'>保存</Button>
          <Button type='text'>清空</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
