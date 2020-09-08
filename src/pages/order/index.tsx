import React, { useState } from 'react'

import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'

import columns from '../../layout/order/table/columns'
import OrderHeader from '../../layout/order/header'
import type { TOrder } from '../../layout/order/order.d'

import styles from './index.module.scss'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { pageToStart } from '../../helpers/params'
import { getValueFromCookie } from '../../helpers/cookie'
import { fetchOrders } from '../../layout/order/services'
import { useRouter } from 'next/router'
export const getServerSideProps = async ({
  req: { headers },
  query: { page, size },
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const [$start, $limit, $page, $size] = pageToStart(page, size)
  const data = await fetchOrders({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })
  return {
    props: {
      data: (data?.values ?? []) as TOrder[],
      total: data.aggregate?.count ?? 0,
      page: $page,
      size: $size,
    },
  }
}
function Order({
  data,
  page,
  size,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const route = useRouter()
  const onPageChange = (p: number, s?: number) => {
    route.replace({
      pathname: '/order',
      query: {
        page: p,
        size: s,
      },
    })
  }
  return (
    <div className={styles.order}>
      <OrderHeader />
      <KTable<TOrder>
        data={(data ?? []) as TOrder[]}
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

export default withLayout(Order)
