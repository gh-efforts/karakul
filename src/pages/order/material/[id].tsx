import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { withLayout } from '../../../layout/layout'
import { KTable } from '../../../components'
import columns from '../../../layout/order-material/table/column'
import { getValueFromCookie } from '../../../helpers/cookie'
import { filterPaginationValue } from '../../../helpers/params'
import MaterialHeader from '../../../layout/order-material/header'
import { OrderMaterial } from '../../../services'
import { fetchOrderMaterials, OrderMaterialType } from '../../../layout/order-material/service'

import styles from './index.module.scss'

export const getServerSideProps = async ({
  req: { headers },
  query: { limit, start },
}: GetServerSidePropsContext<ParsedUrlQuery>): Promise<{
  props: { data: OrderMaterialType[]; limit: number; start: number }
}> => {
  const [$limit, $start] = filterPaginationValue(limit, start)

  const data = await fetchOrderMaterials({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })
  return {
    props: {
      data,
      limit: $limit,
      start: $start,
    },
  }
}

function Material({ data, limit, start }: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  const onChange = () => {
    return false
  }

  return (
    <div className={styles.material}>
      <MaterialHeader />
      <KTable<OrderMaterialType>
        columns={columns}
        data={(data ?? []) as OrderMaterialType[]}
        isEmpty={data?.length === 0}
        pageSize={limit ?? 1}
        currentPage={start}
        total={data?.length ?? 0}
        rowKey={(item: OrderMaterial) => item?.id}
        onPageChange={onChange}
      />
    </div>
  )
}

export default withLayout(Material)
