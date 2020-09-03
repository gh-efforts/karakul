import { message } from 'antd'

import {
  useCreateCommodityMutation,
  useCommoditiesLazyQuery,
  client,
  GoodsOrdersDocument,
  GoodsOrdersQuery,
  GoodsOrdersQueryVariables,
  OutboundCommodityInput,
  useCommodityExWarehouseMutation,
  CommodityInput,
} from '../../services'
import { pageToStart } from '../../helpers/params'
import { GoodsOrder } from './goods.d'

function useCreateCommodityApi() {
  const [create, { loading }] = useCreateCommodityMutation({ fetchPolicy: 'no-cache' })

  const createCommodit = async (data: CommodityInput) => {
    try {
      await create({
        variables: {
          data,
        },
      })

      message.success('创建商品成功')
      return true
    } catch {
      message.error('创建商品失败')
      return false
    }
  }

  return { createCommodit, loading }
}

function useCommoditiesApi() {
  const [fetch, { data, loading }] = useCommoditiesLazyQuery()

  const fetchCommodities = (page?: number, size?: number) => {
    const [start, limit] = pageToStart(page, size)
    fetch({
      variables: {
        start,
        limit,
      },
    })
  }

  return {
    data,
    loading,
    fetchCommodities,
  }
}

async function fetchGoodsOrders(variables: GoodsOrdersQueryVariables & { Authorization?: string | undefined }) {
  try {
    const { data } = await client.query<GoodsOrdersQuery, GoodsOrdersQueryVariables>({
      query: GoodsOrdersDocument,
      variables,
      fetchPolicy: 'network-only',
    })

    return { data: (data?.orders?.values ?? []) as GoodsOrder[], total: data?.orders?.aggregate?.count ?? 0 }
  } catch {
    return { data: [], total: 0 }
  }
}

function useCommodityExWarehouseApi() {
  const [exWarehouseapi, { loading }] = useCommodityExWarehouseMutation()

  const exWarehouse = async (input: OutboundCommodityInput) => {
    try {
      await exWarehouseapi({
        variables: {
          input,
        },
      })

      message.success('出库成功')
      return true
    } catch {
      message.error('出库失败')
      return false
    }
  }

  return {
    exWarehouse,
    loading,
  }
}

export { useCreateCommodityApi, useCommoditiesApi, fetchGoodsOrders, useCommodityExWarehouseApi }
