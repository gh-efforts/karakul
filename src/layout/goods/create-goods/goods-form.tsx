import React from 'react'
import { Form, Input } from 'antd'
import type { FormInstance } from 'antd/lib/form'

import styles from './index.module.scss'

interface GoodsFormProps {
  form?: FormInstance
}

function GoodsForm({ form }: GoodsFormProps) {
  return (
    <Form className={styles.form} form={form}>
      <Form.Item name='num'>
        <Input placeholder='请输入商品编号' allowClear />
      </Form.Item>
      <Form.Item name='amount'>
        <Input placeholder='请选择商品分类' allowClear />
      </Form.Item>
      <Form.Item name='time'>
        <Input placeholder='请选择仓库' allowClear />
      </Form.Item>
    </Form>
  )
}

export default GoodsForm
