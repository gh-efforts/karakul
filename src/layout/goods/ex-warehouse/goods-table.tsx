import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { ColumnProps } from 'antd/lib/table'

import { KTable, KPagination } from '../../../components'
import { useOrderCommoditiesSimpleQuery, OrderCommoditiesSimpleQuery, Enum_Commodity_State } from '../../../services'

import styles from './index.module.scss'

type GoodsItem = NonNullable<NonNullable<NonNullable<OrderCommoditiesSimpleQuery['commodities']>['values']>[number]>

const columns: ColumnProps<GoodsItem>[] = [
  {
    title: '商品编号',
    dataIndex: 'code',
  },
  {
    title: '商品类型',
    dataIndex: ['commodity_type', 'name'],
  },
  {
    title: '仓库',
    dataIndex: ['warehouse', 'name'],
  },
]

interface GoodsTableProps {
  id: string
  children?: React.ReactNode
}

function GoodsTable({ id }: GoodsTableProps, ref: React.Ref<{ selectedRowKeys: string[] }>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const { data, loading, refetch } = useOrderCommoditiesSimpleQuery({
    fetchPolicy: 'network-only',
    variables: {
      limit: 10,
      start: 0,
      id,
      state: Enum_Commodity_State.In,
    },
    skip: !id,
  })

  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  useImperativeHandle(ref, () => ({
    selectedRowKeys,
  }))

  const onPageChange = (p: number, s?: number | undefined) => {
    const _s = s || size

    if (id) {
      refetch?.({
        id,
        limit: s || size,
        start: (p - 1) * _s,
      })
    }

    setPage(p)
    setSize(_s)
  }

  const onSelect = (record: GoodsItem, selected: boolean) => {
    setSelectedRowKeys(keys => {
      if (selected) {
        return [...new Set([...keys, record?.id ?? ''])]
      } else {
        return keys.filter(key => key !== record?.id)
      }
    })
  }

  const onSelectAll = (selected: boolean, selectedRows: GoodsItem[]) => {
    setSelectedRowKeys(keys => {
      const selectedIds = selectedRows.map(rows => rows?.id).filter(Boolean) as string[]

      if (selected) {
        return [...new Set([...keys, ...selectedIds])]
      } else {
        return keys.filter(key => selectedIds.includes(`${key}`))
      }
    })
  }

  return (
    <div className={styles.tablebox}>
      <KTable<GoodsItem>
        columns={columns}
        data={(data?.commodities?.values ?? []) as GoodsItem[]}
        rowKey='id'
        pagination={false}
        className={styles.table}
        rowSelection={{
          type: 'checkbox',
          // onChange,
          onSelect,
          onSelectAll,
          selectedRowKeys,
        }}
        scroll={{ y: 400 }}
        loading={loading}
      />
      <KPagination
        currentPage={page}
        total={data?.commodities?.aggregate?.count ?? 0}
        pageSize={size}
        onPageChange={onPageChange}
        className={styles.pagination}
      />
    </div>
  )
}

export default forwardRef(GoodsTable)
