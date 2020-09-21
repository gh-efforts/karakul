import React from 'react'

import GoodsTypesHeader from '../../layout/goods-types/header'
import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'
import columns from '../../layout/goods-types/table/columns'

import styles from './index.module.scss'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { CommodityTypeType, fetchCommodityTypes } from '../../layout/goods-types/service'
import { pageToStart } from '../../helpers/params'
import { getValueFromCookie } from '../../helpers/cookie'
import { useRouter } from 'next/router'
export const getServerSideProps = async ({
  req: { headers },
  query: { page, size },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: CommodityTypeType[]; page: number; size: number; total: number }
}> => {
  const [$start, $limit, $page, $size] = pageToStart(page, size)

  const data = await fetchCommodityTypes({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })
  return {
    props: {
      data: (data?.values ?? []) as CommodityTypeType[],
      total: data.aggregate?.count ?? 0,
      page: $page,
      size: $size,
    },
  }
}
function GoodsTypes({
  data,
  page,
  size,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const route = useRouter()
  const onPageChange = (p: number, s?: number) => {
    route.replace({
      pathname: '/goods-types',
      query: {
        page: p,
        size: s,
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
        currentPage={page}
        pageSize={size}
        rowKey={item => item.id}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default withLayout(GoodsTypes)
