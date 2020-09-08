import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { withLayout } from '../../../../layout/layout'
import { KTable } from '../../../../components'
import columns, { MaterialHistoriesExpandedRowRender } from '../../../../layout/order-material-history/table/column'
import { getValueFromCookie } from '../../../../helpers/cookie'
import { pageToStart } from '../../../../helpers/params'
import HistoryHeader from '../../../../layout/order-material-history/header'

import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { HistoryInfo } from '../../../../layout/order-material-history/history.d'
import { fetchOrderMaterialHistory } from '../../../../layout/order-material-history/services'

export const getServerSideProps = async ({
  req: { headers },
  query: { page, size, id },
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const [$start, $limit, $page, $size] = pageToStart(page, size)
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
      page: $page,
      size: $size,
    },
  }
}

function History({
  data,
  page,
  size,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const router = useRouter()
  const id = router.query.id
  const name = router.query.name

  const onChange = (p: number, s?: number) => {
    router.replace({
      pathname: '/order/material/history/' + id,
      query: {
        name,
        page: p,
        size: s,
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
        pageSize={size}
        currentPage={page}
        total={total}
        rowKey={(item: HistoryInfo) => item?.id}
        onPageChange={onChange}
        expandedRowRender={(record: HistoryInfo) => MaterialHistoriesExpandedRowRender(record)}
      />
    </div>
  )
}

export default withLayout(History)
