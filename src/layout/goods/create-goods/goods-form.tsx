import React from 'react'
import { Form, Input } from 'antd'
import type { FormInstance } from 'antd/lib/form'

import { CommodityTypeSelect, WarehousesSelect } from '../../../components'

import styles from './index.module.scss'

interface GoodsFormProps {
  form?: FormInstance
}

function GoodsForm({ form }: GoodsFormProps) {
  return (
    <Form className={styles.form} form={form}>
      <Form.Item name='code' rules={[{ required: true, message: '请输入商品编号' }]}>
        <Input placeholder='请输入商品编号' allowClear />
      </Form.Item>
      <CommodityTypeSelect name='commodity_type' noLabel required />
      <WarehousesSelect name='warehouse' noLabel required />
    </Form>
  )
}

export default GoodsForm
