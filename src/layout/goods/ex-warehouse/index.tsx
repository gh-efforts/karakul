import React, { useRef } from 'react'
import { Form, message } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import { ModalButtonGroup, useGlobalModal } from '../../../components'
import { getLocalStore } from '../../../helpers/cookie'
import GoodsTable from './goods-table'
import ExWarehouseForm from './goods-form'
import { Dispatch, RootState } from '../../../store/type.d'

import styles from './index.module.scss'

interface ExWarehouseViewProps {
  pid?: string
  children?: React.ReactNode
}

function ExWarehouseView({ pid }: ExWarehouseViewProps) {
  const [form] = Form.useForm()
  const dispatch = useDispatch<Dispatch>()
  const { loading } = useSelector<RootState, RootState['commodity']>(s => s.commodity)

  const tablreRef = useRef<{ selectedRowKeys: string[] } | null>(null)
  const { hideModal } = useGlobalModal()

  const onOK = async () => {
    const id = getLocalStore('userId')

    if (!id) {
      message.error('数据错误')
      return
    }

    try {
      await form.validateFields()
    } catch {
      message.info('请确认数据')
      return
    }

    const { destination, delivery_time } = form.getFieldsValue()
    const time = moment(delivery_time).format('YYYY-MM-DD')

    const flag = await dispatch.commodity.exwarehouse({
      id: tablreRef?.current?.selectedRowKeys ?? [],
      destination,
      delivery_time: time,
      pid,
    })

    if (flag) {
      form.resetFields()
      message.success('出库成功')
      hideModal()
    } else {
      message.error('出库失败')
    }
  }

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号{pid ?? ''}</span>
      </div>
      <div className={styles.content}>
        <ExWarehouseForm form={form} />
        <GoodsTable ref={tablreRef} />
        <ModalButtonGroup onOK={onOK} OKText='保存' className={styles.btns} position='left' loading={loading} />
      </div>
    </div>
  )
}

export default ExWarehouseView
