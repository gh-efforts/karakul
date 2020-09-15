import {
  useCreateCommodityMutation,
  useCommoditiesLazyQuery,
  NClient,
  GoodsOrdersDocument,
  GoodsOrdersQuery,
  GoodsOrdersQueryVariables,
  OutboundCommodityInput,
  useCommodityExWarehouseMutation,
  CommodityInput,
  useUpdateCommodityMutation,
  OrderCommoditiesQuery,
  OrderCommoditiesQueryVariables,
  OrderCommoditiesDocument,
} from '../../services'
import { GoodsOrder, OrderCommodity } from '../type.d'

async function fetchGoodsOrders(variables: GoodsOrdersQueryVariables) {
  try {
    const { orders } = await NClient.request<GoodsOrdersQuery, GoodsOrdersQueryVariables>(
      GoodsOrdersDocument,
      variables
    )

    return { data: (orders?.values ?? []) as GoodsOrder[], total: orders?.aggregate?.count ?? 0 }
  } catch {
    return { data: [], total: 0 }
  }
}

async function fetchOrderCommoditiesById(id: string | null | undefined): Promise<[boolean, OrderCommodity[] | null]> {
  try {
    if (!id) {
      return [false, null]
    }
    const { order } = await NClient.request<OrderCommoditiesQuery, OrderCommoditiesQueryVariables>(
      OrderCommoditiesDocument,
      { id }
    )

    if (order?.commodities?.length) {
      return [true, order?.commodities?.filter(Boolean) as OrderCommodity[]]
    }

    return [true, []]
  } catch {
    return [false, null]
  }
}

export { fetchGoodsOrders, fetchOrderCommoditiesById }
