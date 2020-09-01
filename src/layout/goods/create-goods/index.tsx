import React from 'react'
import { Form, Input } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'

import { ModalButtonGroup } from '../../../components'
import CreateGoodsTable from './goods-table'
import styles from './index.module.scss'

interface CreateGoodsViewProps {
  id?: string
  children?: React.ReactNode
}

function CreateGoodsView({ id }: CreateGoodsViewProps) {
  const onFinish = () => {
    return {}
  }

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号{id}</span>
        <span className={styles['title-right']}>
          <PlusSquareOutlined />
          导入
        </span>
      </div>
      <div className={styles.content}>
        <Form className={styles.form} onFinish={onFinish}>
          <Form.Item name='num'>
            <Input placeholder='请输入商品编号' allowClear />
          </Form.Item>
          <Form.Item name='amount'>
            <Input placeholder='请选择商品分类' allowClear />
          </Form.Item>
          <Form.Item name='time'>
            <Input placeholder='请选择仓库' allowClear />
          </Form.Item>
          <div className={styles.horizontal} />
          <CreateGoodsTable />
          <ModalButtonGroup OKText='保存' className={styles.btns} position='left' />
        </Form>
      </div>
    </div>
  )
}

export default CreateGoodsView
