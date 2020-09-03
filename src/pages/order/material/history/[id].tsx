import React, { useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { withLayout } from '../../../../layout/layout'
import { KTable } from '../../../../components'
import columns from '../../../../layout/order-material-history/table/column'
import { getValueFromCookie } from '../../../../helpers/cookie'
import { filterPaginationValue } from '../../../../helpers/params'
import HistoryHeader from '../../../../layout/order-material-history/header'

import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { HistoryInfo } from 'src/layout/order-material-history/history'

// export const getServerSideProps = async ({
//   req: { headers },
//   query: { limit, start, id },
// }: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
//   props: { data: OrderMaterialType[]; limit: number; start: number; total: number }
// }> => {
//   const [$limit, $start] = filterPaginationValue(limit, start)
//   const $order_id = id
//   const data = await fetchOrderMaterials({
//     Authorization: getValueFromCookie('Authorization', headers.cookie),
//     limit: $limit,
//     start: $start,
//     where: {
//       order_id: $order_id,
//     },
//   })

//   return {
//     props: {
//       data: (data.values ?? []) as OrderMaterialType[],
//       total: data.aggregate?.count ?? 0,
//       limit: $limit,
//       start: $start,
//     },
//   }
// }

// { data, limit, total }: InferGetServerSidePropsType<typeof getServerSideProps>
function History(): React.ReactElement {
  const router = useRouter()
  const [current, setCurrent] = useState(1)
  const id = router.query.id
  const name = router.query.name

  const onChange = (page: number, size?: number) => {
    setCurrent(page)
    router.replace({
      pathname: '/order/material/' + id,
      query: {
        limit: size || 10,
        start: (page - 1) * (size || 10),
      },
    })
  }

  return (
    <div className={styles.material}>
      <HistoryHeader id={id ?? ''} name={name ?? ''} />
      <KTable<HistoryInfo>
        columns={columns}
        data={[] as HistoryInfo[]}
        isEmpty={true}
        pageSize={1}
        currentPage={current}
        total={0}
        rowKey={(item: HistoryInfo) => item?.id}
        onPageChange={onChange}
      />
    </div>
  )
}

export default withLayout(History)
