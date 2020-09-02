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
      <Form.Item name='code'>
        <Input placeholder='请输入商品编号' allowClear />
      </Form.Item>
      <CommodityTypeSelect name='commodity_type' noLabel />
      <WarehousesSelect name='warehouse' noLabel />
    </Form>
  )
}

export default GoodsForm
