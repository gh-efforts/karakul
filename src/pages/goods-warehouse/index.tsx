import React from 'react'

import { withLayout } from '../../layout/layout'
import GoodsWarehouseHeader from '../../layout/goods-warehouse/header'
import { KTable } from '../../components'
import columns from '../../layout/goods-warehouse/table/column'
import styles from './index.module.scss'
import { pageToStart } from '../../helpers/params'
import { fetchWarehouses, WarehouseType } from '../../layout/goods-warehouse/service'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getValueFromCookie } from '../../helpers/cookie'
import { useRouter } from 'next/router'

export const getServerSideProps = async ({
  req: { headers },
  query: { page, size },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: WarehouseType[]; page: number; size: number; total: number }
}> => {
  const [$start, $limit, $page, $size] = pageToStart(page, size)

  const data = await fetchWarehouses({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })
  return {
    props: {
      data: (data?.values ?? []) as WarehouseType[],
      total: data.aggregate?.count ?? 0,
      page: $page,
      size: $size,
    },
  }
}

function GoodsWarehouse({
  data,
  total,
  page,
  size,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const route = useRouter()
  const onPageChange = (p: number, s?: number) => {
    route.replace({
      pathname: '/goods-warehouse',
      query: {
        page: p,
        size: s,
      },
    })
  }
  return (
    <div className={styles.warehouse}>
      <GoodsWarehouseHeader />
      <KTable<WarehouseType>
        data={(data ?? []) as WarehouseType[]}
        columns={columns}
        total={total}
        currentPage={page}
        pageSize={size}
        rowKey={item => item.id}
        onPageChange={onPageChange}
      />
    </div>
  )
}
export default withLayout(GoodsWarehouse)
