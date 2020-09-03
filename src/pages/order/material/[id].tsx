import React, { useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { withLayout } from '../../../layout/layout'
import { KTable } from '../../../components'
import columns from '../../../layout/order-material/table/column'
import { getValueFromCookie } from '../../../helpers/cookie'
import { filterPaginationValue } from '../../../helpers/params'
import MaterialHeader from '../../../layout/order-material/header'
import { fetchOrderMaterials, OrderMaterialType } from '../../../layout/order-material/service'

import styles from './index.module.scss'
import { useRouter } from 'next/router'

export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start, id },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: OrderMaterialType[]; limit: number; start: number; total: number }
}> => {
  const [$limit, $start] = filterPaginationValue(limit, start)
  const $order_id = id
  const data = await fetchOrderMaterials({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
    where: {
      order_id: $order_id,
    },
  })

  return {
    props: {
      data: (data.values ?? []) as OrderMaterialType[],
      total: data.aggregate?.count ?? 0,
      limit: $limit,
      start: $start,
    },
  }
}

function Material({ data, limit, total }: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
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
      <MaterialHeader id={id ?? ''} name={name ?? ''} />
      <KTable<OrderMaterialType>
        columns={columns}
        data={(data ?? []) as OrderMaterialType[]}
        isEmpty={total === 0}
        pageSize={limit ?? 1}
        currentPage={current}
        total={total}
        rowKey={(item: OrderMaterialType) => item?.id}
        onPageChange={onChange}
      />
    </div>
  )
}

export default withLayout(Material)
