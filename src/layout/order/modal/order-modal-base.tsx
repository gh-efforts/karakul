import React, { useCallback, useMemo } from 'react'
import { Form, Input, DatePicker, InputNumber } from 'antd'
import type { Store } from 'antd/lib/form/interface'
import moment from 'moment'

import { ModalButtonGroup } from '../../../components'
import styles from './index.module.scss'

export interface OrderFormVal {
  name?: string | null | undefined
  detail?: string | null | undefined
  amount?: number | null | undefined
  time?: string | null | undefined
}

interface ModalBase {
  OKText: string
  onOK: (val: OrderFormVal) => void
  loading?: boolean
  initialValues?: OrderFormVal
}

function ModalBase({ onOK, OKText, loading, initialValues }: ModalBase) {
  const onFinish = ({ name, detail, amount, time }: Store) => {
    const t = moment(time).format('YYYY-MM-DD')

    onOK({
      name,
      detail,
      amount,
      time: t,
    })
  }

  const formatter = useCallback((value: string | number | undefined) => {
    return `${value}`.replace(/[^0-9.]/g, '')
  }, [])

  const parser = useCallback((value: string | undefined) => {
    return parseInt(`${value}`.replace(/[^0-9.]/g, '')) || 0
  }, [])

  const initialVals = useMemo(() => {
    const { name, detail, amount, time } = initialValues || {}

    const t = moment(time).isValid() ? moment(time) : undefined

    return {
      name,
      detail,
      amount,
      time: t,
    }
  }, [initialValues])

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <span>订单名称</span>
        <span>详情</span>
        <span>数量</span>
        <span>交付时间</span>
      </div>

      <Form className={styles.form} onFinish={onFinish} initialValues={initialVals}>
        <Form.Item name='name'>
          <Input placeholder='请输入订单名称' allowClear />
        </Form.Item>
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
