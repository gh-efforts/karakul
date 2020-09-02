import React, { useState } from 'react'

import GoodsTypesHeader from '../../layout/goods-types/header'
import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'
import columns from '../../layout/goods-types/table/columns'

import styles from './index.module.scss'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { CommodityTypeType, fetchCommodityTypes } from '../../layout/goods-types/service'
import { filterPaginationValue } from '../../helpers/params'
import { getValueFromCookie } from '../../helpers/cookie'
import { useRouter } from 'next/router'
export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: CommodityTypeType[]; limit: number; total: number }
}> => {
  const [$limit, $start] = filterPaginationValue(limit, start)

  const data = await fetchCommodityTypes({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })
  return {
    props: {
      data: (data?.values ?? []) as CommodityTypeType[],
      total: data.aggregate?.totalCount ?? 0,
      limit: $limit,
    },
  }
}
function GoodsTypes({
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
    <div className={styles.page}>
      <GoodsTypesHeader />
      <KTable<CommodityTypeType>
        data={(data ?? []) as CommodityTypeType[]}
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

export default withLayout(GoodsTypes)
