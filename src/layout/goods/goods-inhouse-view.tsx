import React from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

import { KTable } from '../../components'
import { Dispatch, RootState, GoodsInhouseItem } from '../../store/type.d'

import styles from './modal.module.scss'

const columns = [
  {
    title: '商品编号',
    dataIndex: 'code',
  },
  {
    title: '所在仓库',
    dataIndex: ['warehouse', 'name'],
  },
  {
    title: '入库时间',
    dataIndex: 'createdAt',
    render: (text: string) => moment(text).format('YYYY-MM-DD hh:mm:ss'),
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
]

function GoodsInhouseView() {
  const dispatch = useDispatch<Dispatch>()
  const { data, total, page, size, id } = useSelector<RootState, RootState['inwarehouse']>(s => s.inwarehouse)

  const onPageChange = (p: number, s?: number) => {
    dispatch.inwarehouse.pageChange({ page: p, size: s })
  }

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号：{id || ''}</span>
      </div>
      <KTable<GoodsInhouseItem>
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

export default GoodsInhouseView
