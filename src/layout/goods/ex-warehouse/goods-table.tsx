import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { useSelector, useDispatch } from 'react-redux'

import { KTable, KPagination } from '../../../components'
import { Dispatch, RootState, ExWGoodsItem } from '../../../store/type.d'

import styles from './index.module.scss'

const columns: ColumnProps<ExWGoodsItem>[] = [
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
  children?: React.ReactNode
}

function GoodsTable(props: GoodsTableProps, ref: React.Ref<{ selectedRowKeys: string[] }>) {
  const dispatch = useDispatch<Dispatch>()
  const { data, total, page, size } = useSelector<RootState, RootState['exwarehouse']>(s => s.exwarehouse)

  const onPageChange = (p: number, s?: number) => {
    dispatch.exwarehouse.pageChange({ page: p, size: s })
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  useImperativeHandle(ref, () => ({
    selectedRowKeys,
  }))

  const onSelect = (record: ExWGoodsItem, selected: boolean) => {
    setSelectedRowKeys(keys => {
      if (selected) {
        return [...new Set([...keys, record?.id ?? ''])]
      } else {
        return keys.filter(key => key !== record?.id)
      }
    })
  }

  const onSelectAll = (selected: boolean, selectedRows: ExWGoodsItem[]) => {
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
      <KTable<ExWGoodsItem>
        columns={columns}
        data={data}
        rowKey='id'
        pagination={false}
        className={styles.table}
        rowSelection={{
          type: 'checkbox',
          onSelect,
          onSelectAll,
          selectedRowKeys,
        }}
        scroll={{ y: 400 }}
      />
      <KPagination
        currentPage={page}
        total={total}
        pageSize={size}
        onPageChange={onPageChange}
        className={styles.pagination}
      />
    </div>
  )
}

export default forwardRef(GoodsTable)
