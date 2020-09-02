import React, { useState } from 'react'

import { withLayout } from '../../layout/layout'
import GoodsWarehouseHeader from '../../layout/goods-warehouse/header'
import { KTable } from '../../components'
import columns from '../../layout/goods-warehouse/table/column'
import styles from './index.module.scss'
import { filterPaginationValue } from '../../helpers/params'
import { fetchWarehouses, WarehouseType } from '../../layout/goods-warehouse/service'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getValueFromCookie } from '../../helpers/cookie'
import { useRouter } from 'next/router'

export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: WarehouseType[]; limit: number; total: number }
}> => {
  const [$limit, $start] = filterPaginationValue(limit, start)

  const data = await fetchWarehouses({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })
  return {
    props: {
      data: (data?.values ?? []) as WarehouseType[],
      total: data.aggregate?.totalCount ?? 0,
      limit: $limit,
    },
  }
}

function GoodsWarehouse({
  data,
  limit,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const route = useRouter()
  const [current, setCurrent] = useState(1)
  const onPageChange = (page: number, size?: number) => {
    setCurrent(page)
    route.replace({
      pathname: '/order',
      query: {
        limit: size || 10,
        start: (page - 1) * (size || 10),
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
        currentPage={current}
        pageSize={limit}
        rowKey={item => item.id}
        onPageChange={onPageChange}
      />
    </div>
  )
}
export default withLayout(GoodsWarehouse)
