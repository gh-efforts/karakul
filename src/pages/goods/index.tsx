import React from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

import { withLayout } from '../../layout/layout'
import { KPagination } from '../../components'
import { getValueFromCookie } from '../../helpers/cookie'
import { pageToStart } from '../../helpers/params'
import GoodsHeader from '../../layout/goods/header'
import GoodsItem from '../../layout/goods/goods-item'
import { fetchGoodsOrders } from '../../layout/goods/service'

import styles from './index.module.scss'
import { Empty } from 'antd'

export const getServerSideProps = async ({
  req: { headers },
  query: { page, size },
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const [$start, $limit, $page, $size] = pageToStart(page, size)

  const { data, total } = await fetchGoodsOrders({
    Authorization: getValueFromCookie('Authorization', headers.cookie),
    limit: $limit,
    start: $start,
  })

  return {
    props: {
      data,
      total,
      page: $page,
      size: $size,
    },
  }
}

function Goods({ data, page, size, total }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  const onPageChange = (p: number, s?: number | undefined) => {
    router.push({
      pathname: '/goods',
      query: {
        page: p,
        size: s,
      },
    })
  }

  return (
    <div className={styles.goods}>
      <GoodsHeader />
      <div className={styles.table}>
        <div className={styles['table-items']}>
          {data.length > 0 ? (
            data?.map(order => {
              return <GoodsItem key={order?.id} id={order?.id} name={order?.name} />
            })
          ) : (
            <div className={styles.empty}>{<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</div>
          )}
        </div>
        <KPagination total={total} pageSize={size} currentPage={page} onPageChange={onPageChange} />
      </div>
    </div>
  )
}
export default withLayout(Goods)
