import React, { useRef } from 'react'
import { Form } from 'antd'
import moment from 'moment'

import { ModalButtonGroup, message, useGlobalModal } from '../../../components'
import { useCommodityExWarehouseApi } from '../service'
import { getLocalStore } from '../../../helpers/cookie'
import GoodsTable from './goods-table'
import ExWarehouseForm from './goods-form'

import styles from './index.module.scss'
import { useRouter } from 'next/router'

interface ExWarehouseViewProps {
  id?: string
  children?: React.ReactNode
}

function ExWarehouseView({ id }: ExWarehouseViewProps) {
  const [form] = Form.useForm()
  const tablreRef = useRef<{ selectedRowKeys: string[] } | null>(null)
  const { hideModal } = useGlobalModal()
  const router = useRouter()
  const { exWarehouse, loading } = useCommodityExWarehouseApi()

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

    const flag = await exWarehouse({
      id: tablreRef?.current?.selectedRowKeys ?? [],
      destination,
      delivery_time: time,
      outbound_user: id,
    })

    if (flag) {
      // 出库正常
      form.resetFields()
      router.replace('/goods')
      hideModal()
      return flag
    }
  }

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号{id}</span>
      </div>
      <div className={styles.content}>
        <ExWarehouseForm form={form} />
        <GoodsTable ref={tablreRef} id={id || ''} />
        <ModalButtonGroup onOK={onOK} OKText='保存' className={styles.btns} position='left' loading={loading} />
      </div>
    </div>
  )
}

export default ExWarehouseView
