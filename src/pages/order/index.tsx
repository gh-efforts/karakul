import React, { useState } from 'react'

import { withLayout } from '../../layout/layout'
import { KTable } from '../../components'

import columns from '../../layout/order/table/columns'
import OrderHeader from '../../layout/order/header'
import type { TOrder } from '../../layout/order/order.d'

import styles from './index.module.scss'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { filterPaginationValue } from '../../helpers/params'
import { getValueFromCookie } from '../../helpers/cookie'
import { fetchOrders } from '../../layout/order/services'
import { useRouter } from 'next/router'
export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: TOrder[]; limit: number; total: number }
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
      limit: $limit,
    },
  }
}
function Order({ data, limit, total }: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
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
    <div className={styles.order}>
      <OrderHeader />
      <KTable<TOrder>
        data={(data ?? []) as TOrder[]}
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

export default withLayout(Order)
