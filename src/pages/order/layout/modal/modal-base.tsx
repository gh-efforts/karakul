import React, { useCallback, useMemo } from 'react'
import { Form, Input, DatePicker, InputNumber } from 'antd'
import type { Store } from 'antd/lib/form/interface'
import moment from 'moment'

import { ModalButtonGroup } from '../../../../components'
import styles from './index.module.scss'

interface OrderFormVal {
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

  const initialVals = useMemo(() => {
    const { detail, amount, time } = initialValues || {}

    return {
      detail,
      amount,
      time: moment(time),
    }
  }, [initialValues])

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <span>详情</span>
        <span>数量</span>
        <span>交付时间</span>
      </div>

      <Form className={styles.form} onFinish={onFinish} initialValues={initialVals}>
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
