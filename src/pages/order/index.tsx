import React from 'react'

import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'

import columns from '../../layout/order/columns'
import OrderHeader from '../../layout/order/header'
import type { TOrder } from '../../layout/order/order.d'

import styles from './index.module.scss'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { filterPaginationValue } from '../../helpers/params'
import { getValueFromCookie } from '../../helpers/cookie'
import { fetchOrders } from '../../layout/order/services'
export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: TOrder[]; currentPage: number; limit: number; total: number }
}> => {
  const [$limit, $start] = filterPaginationValue(limit, start)

  const data = await fetchOrders({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })
  return {
    props: {
      data: (data?.values ?? []) as TOrder[],
      total: data.aggregate?.totalCount ?? 0,
      currentPage: Math.floor($start % $limit) ?? 1,
      limit: $limit,
    },
  }
}
function Order({
  data,
  currentPage,
  limit,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  return (
    <div className={styles.order}>
      <OrderHeader />
      <KTable<TOrder>
        data={(data ?? []) as TOrder[]}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={limit}
        rowKey={item => item.id}
      />
    </div>
  )
}

export default withLayout(Order)
