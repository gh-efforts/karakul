import React from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import { KTable } from '../../components'
import { Dispatch, RootState, GoodsExHistoryItem } from '../../store/type.d'

import styles from './modal.module.scss'

const columns = [
  {
    title: '商品编号',
    dataIndex: 'code',
  },
  {
    title: '目的地',
    dataIndex: 'destination',
  },
  {
    title: '出库时间',
    dataIndex: 'delivery_time',
    render: (text: string) => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作人',
    dataIndex: ['outbound_user', 'username'],
  },
]

function GoodsExhouseHistoryView() {
  const dispatch = useDispatch<Dispatch>()
  const { data, total, page, size, id } = useSelector<RootState, RootState['exwarehouseHistory']>(
    s => s.exwarehouseHistory
  )

  const onPageChange = (p: number, s?: number) => {
    dispatch.exwarehouseHistory.pageChange({ page: p, size: s })
  }

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号：{id || ''}</span>
      </div>
      <KTable<GoodsExHistoryItem>
        className={styles.border}
        columns={columns}
        data={data}
        total={total}
        rowKey='id'
        currentPage={page}
        pageSize={size}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default GoodsExhouseHistoryView
