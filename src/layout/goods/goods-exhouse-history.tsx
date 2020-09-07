import React, { useEffect, useState } from 'react'

import styles from './modal.module.scss'
import { KTable } from '../../components'
import { ExWarehouseHistoryQuery, useExWarehouseHistoryQuery } from '../../services'

interface GoodsHistoryViewProps {
  id?: string
  children?: React.ReactNode
}

type GoodsExHistoryItem = NonNullable<
  NonNullable<NonNullable<ExWarehouseHistoryQuery['commodities']>['values']>[number]
>

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
  },
  {
    title: '操作人',
    dataIndex: ['user', 'username'],
  },
]

function GoodsExhouseHistoryView({ id }: GoodsHistoryViewProps) {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const { data, loading, refetch } = useExWarehouseHistoryQuery({
    variables: {
      orderId: id,
    },
    skip: !id,
  })

  const onPageChange = (p: number, s?: number | undefined) => {
    const _s = s || size

    if (id) {
      refetch?.({
        orderId: id,
        limit: s || size,
        start: (p - 1) * _s,
      })
    }

    setPage(p)
    setSize(_s)
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div>
      <div className={styles.title}>
        <span>订单编号：{id || ''}</span>
      </div>
      <KTable<GoodsExHistoryItem>
        className={styles.border}
        columns={columns}
        data={(data?.commodities?.values ?? []) as GoodsExHistoryItem[]}
        total={data?.commodities?.aggregate?.count ?? 0}
        rowKey='id'
        currentPage={page}
        pageSize={size}
        onPageChange={onPageChange}
        loading={loading}
      />
    </div>
  )
}

export default GoodsExhouseHistoryView
