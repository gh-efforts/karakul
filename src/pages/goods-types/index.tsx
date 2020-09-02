import React from 'react'

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
export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: CommodityTypeType[]; currentPage: number; limit: number; total: number }
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
      currentPage: Math.floor($start % $limit) ?? 1,
      limit: $limit,
    },
  }
}
function GoodsTypes({
  data,
  currentPage,
  limit,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  return (
    <div className={styles.page}>
      <GoodsTypesHeader />
      <KTable<CommodityTypeType>
        data={(data ?? []) as CommodityTypeType[]}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={limit}
        rowKey={item => item.id}
      />
    </div>
  )
}

export default withLayout(GoodsTypes)
