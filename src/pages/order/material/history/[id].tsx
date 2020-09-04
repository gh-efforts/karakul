import React, { useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { withLayout } from '../../../../layout/layout'
import { KTable } from '../../../../components'
import columns, { MaterialHistoriesExpandedRowRender } from '../../../../layout/order-material-history/table/column'
import { getValueFromCookie } from '../../../../helpers/cookie'
import { filterPaginationValue } from '../../../../helpers/params'
import HistoryHeader from '../../../../layout/order-material-history/header'

import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { HistoryInfo } from 'src/layout/order-material-history/history'
import { fetchOrderMaterialHistory } from 'src/layout/order-material-history/services'

export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start, id },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: HistoryInfo[]; limit: number; start: number; total: number }
}> => {
  const [$limit, $start] = filterPaginationValue(limit, start)
  const $order_id = id?.toString()
  const data = await fetchOrderMaterialHistory({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
    id: $order_id,
  })

  return {
    props: {
      data: (data.values ?? []) as HistoryInfo[],
      total: data.aggregate?.count ?? 0,
      limit: $limit,
      start: $start,
    },
  }
}

function History({ data, limit, total }: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const router = useRouter()
  const [current, setCurrent] = useState(1)
  const id = router.query.id
  const name = router.query.name

  const onChange = (page: number, size?: number) => {
    setCurrent(page)
    router.replace({
      pathname: '/order/material/history/' + id,
      query: {
        name,
        limit: size || 10,
        start: (page - 1) * (size || 10),
      },
    })
  }

  return (
    <div className={styles.history}>
      <HistoryHeader id={id ?? ''} name={name ?? ''} />
      <KTable<HistoryInfo>
        columns={columns}
        data={(data ?? []) as HistoryInfo[]}
        isEmpty={true}
        pageSize={limit}
        currentPage={current}
        total={total}
        rowKey={(item: HistoryInfo) => item?.id}
        onPageChange={onChange}
        expandedRowRender={(record: HistoryInfo) => MaterialHistoriesExpandedRowRender(record)}
      />
    </div>
  )
}

export default withLayout(History)
