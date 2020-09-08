import React, { useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { withLayout } from '../../../layout/layout'
import { KTable } from '../../../components'
import columns from '../../../layout/order-material/table/column'
import { getValueFromCookie } from '../../../helpers/cookie'
import { filterPaginationValue, pageToStart } from '../../../helpers/params'
import MaterialHeader from '../../../layout/order-material/header'
import { fetchOrderMaterials } from '../../../layout/order-material/service'

import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { OrderMaterialType } from '../../../layout/order-material/material'

export const getServerSideProps = async ({
  req: { headers },
  query: { page, size, id },
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const [$start, $limit, $page, $size] = pageToStart(page, size)
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
      page: $page,
      size: $size,
    },
  }
}

function Material({
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
      pathname: '/order/material/' + id,
      query: {
        name,
        page: p,
        size: s,
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
        pageSize={size}
        currentPage={page}
        total={total}
        rowKey={(item: OrderMaterialType) => item?.id}
        onPageChange={onChange}
      />
    </div>
  )
}

export default withLayout(Material)
