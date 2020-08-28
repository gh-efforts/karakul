import React, { useCallback } from 'react'
import { Form, Input, DatePicker, InputNumber } from 'antd'
import type { Store } from 'antd/lib/form/interface'

import { ModalButtonGroup } from '../../../../components'
import styles from './index.module.scss'

interface OrderFormVal {
  detail: string
  amount: number
  time: string
}

interface ModalBase {
  OKText: string
  onOK: (val: OrderFormVal) => void
  loading?: boolean
}

function ModalBase({ onOK, OKText, loading }: ModalBase) {
  const onFinish = ({ detail, amount, time }: Store) => {
    onOK({
      detail,
      amount,
      time,
    })
  }

  const formatter = useCallback((value: string | number | undefined) => {
    return `${value}`.replace(/[^0-9.]/g, '')
  }, [])

  const parser = useCallback((value: string | undefined) => {
    return parseInt(`${value}`.replace(/[^0-9.]/g, '')) || 0
  }, [])

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <span>详情</span>
        <span>数量</span>
        <span>交付时间</span>
      </div>

      <Form className={styles.form} onFinish={onFinish}>
        <Form.Item name='detail'>
          <Input placeholder='请输入详情' allowClear />
        </Form.Item>
        <Form.Item name='amount'>
          <InputNumber placeholder='请输入数量' formatter={formatter} parser={parser} />
        </Form.Item>
        <Form.Item name='time'>
          <DatePicker placeholder='请选择交付时间' format='YYYY.MM.DD' />
        </Form.Item>
        <div className={styles.horizontal} />
        <ModalButtonGroup OKText={OKText} loading={loading} className={styles.btns} position='left' />
      </Form>
    </div>
  )
}

export default ModalBase
