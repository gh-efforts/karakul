import React from 'react'
import { Form } from 'antd'
import type { FormInstance } from 'antd/lib/form'

import { CommodityTypeSelect, WarehousesSelect } from '../../../components'

import styles from './index.module.scss'
import { OrderCommodity } from '../goods.d'

interface GoodsFormProps {
  record?: OrderCommodity
  form?: FormInstance
}

function GoodsForm({ form, record }: GoodsFormProps) {
  return (
    <Form
      className={styles.form}
      form={form}
      initialValues={{
        commodity_type: record?.commodity_type?.name,
        warehouse: record?.warehouse?.name,
      }}
    >
      <CommodityTypeSelect name='commodity_type' noLabel required />
      <WarehousesSelect name='warehouse' noLabel required />
    </Form>
  )
}

export default GoodsForm
