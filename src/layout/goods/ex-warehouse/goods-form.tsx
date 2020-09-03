import React from 'react'
import { Form, Input, DatePicker } from 'antd'
import { FormInstance } from 'antd/lib/form'

import styles from './index.module.scss'

interface ExWarehouseFormProps {
  form?: FormInstance
}

function ExWarehouseForm({ form }: ExWarehouseFormProps) {
  return (
    <Form className={styles.form} form={form}>
      <Form.Item name='destination' rules={[{ required: true, message: '请输入目的地' }]}>
        <Input placeholder='请输入目的地' allowClear />
      </Form.Item>
      <Form.Item name='delivery_time' rules={[{ required: true, message: '请选择出库时间' }]}>
        <DatePicker placeholder='请选择出库时间' allowClear />
      </Form.Item>
      <div className={styles.horizontal} />
    </Form>
  )
}

export default ExWarehouseForm
