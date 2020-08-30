import React from 'react'
import { withLayout } from '../../layout'
import { Button, Breadcrumb } from 'antd'
import styles from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { SubHeader, Svg, KTable, useGlobalModal, TableHeader } from '../../components'
import columns from './table/column'
import { fetchOrderMaterials, OrderMaterialType } from './service'
import { getValueFromCookie } from '../../helpers/cookie'
import { filterPaginationValue } from '../../helpers/params'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { OrderMaterial } from '../../services'
import CreateModalView from './modal/creat-modal'

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
  const { showModal, hideModal } = useGlobalModal()
  const showCreateModal = () => {
    showModal(
      '预定原材料',
      CreateModalView,
      {
        onSuccess: () => {
          hideModal()
        },
      },
      1072
    )
  }
  const onChange = () => {
    return false
  }

  return (
    <div className={styles.material}>
      <SubHeader
        title={
          <Breadcrumb separator=' | '>
            <Breadcrumb.Item href='/order'>订单</Breadcrumb.Item>
            <Breadcrumb.Item>原材料</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Button type='primary' icon={<PlusOutlined />} size='large' onClick={showCreateModal}>
          预定原材料
        </Button>
        <Button icon={<Svg name='ico-search-h' offsetX='-2' offsetY='2' />} size='large' />
      </SubHeader>
      <TableHeader title={<span>订单编号：1234</span>}>
        <Svg name='btn-revise-h' color='#FF9C7C' offsetY='3' />
        <Svg name='btn-history-h' color='#FFBB0B' offsetY='3' />
      </TableHeader>
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
