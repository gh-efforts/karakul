import React from 'react'
import { Form, Input, DatePicker } from 'antd'

import { ModalButtonGroup } from '../../../components'
import GoodsTable from './goods-table'

import styles from './index.module.scss'

interface ExWarehouseViewProps {
  id?: string
  children?: React.ReactNode
}

function ExWarehouseView({ id }: ExWarehouseViewProps) {
  const onFinish = () => {
    return {}
  }

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号{id}</span>
      </div>
      <div className={styles.content}>
        <Form className={styles.form} onFinish={onFinish}>
          <Form.Item name='num'>
            <Input placeholder='请输入商品编号' allowClear />
          </Form.Item>
          <Form.Item name='time'>
            <DatePicker placeholder='请选择仓库' allowClear />
          </Form.Item>
          <div className={styles.horizontal} />
          <GoodsTable />
          <ModalButtonGroup OKText='保存' className={styles.btns} position='left' />
        </Form>
      </div>
    </div>
  )
}

export default ExWarehouseView
