import { getLocalStore } from '../../helpers/cookie'
import {
  NClient,
  GoodsOrdersDocument,
  GoodsOrdersQuery,
  GoodsOrdersQueryVariables,
  CommodityInput,
  OrderCommoditiesQuery,
  OrderCommoditiesQueryVariables,
  OrderCommoditiesDocument,
  UpdateCommodityMutation,
  UpdateCommodityMutationVariables,
  UpdateCommodityDocument,
  CreateCommodityMutation,
  CreateCommodityMutationVariables,
  CreateCommodityDocument,
  CommodityExWarehouseMutation,
  CommodityExWarehouseMutationVariables,
  CommodityExWarehouseDocument,
  OutboundCommodityInput,
  OrderCommoditiesSimpleQuery,
  OrderCommoditiesSimpleQueryVariables,
  OrderCommoditiesSimpleDocument,
  ExWarehouseHistoryQuery,
  ExWarehouseHistoryQueryVariables,
  ExWarehouseHistoryDocument,
  CommoditiesInWarehouseQuery,
  CommoditiesInWarehouseQueryVariables,
  CommoditiesInWarehouseDocument,
} from '../../services'
import { ExWGoodsItem, GoodsExHistoryItem, GoodsInhouseItem, GoodsOrder, OrderCommodity } from '../type.d'

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

interface PUpdateCommodity {
  id: string | null | undefined
  data: Omit<CommodityInput, 'user'>
}

async function updateCommodity({ id, data }: PUpdateCommodity): Promise<[boolean]> {
  if (!id) {
    return [false]
  }

  try {
    const user = getLocalStore('userId')

    await NClient.request<UpdateCommodityMutation, UpdateCommodityMutationVariables>(UpdateCommodityDocument, {
      id,
      data: {
        ...data,
        user,
      },
    })
    return [true]
  } catch (error) {
    return [false]
  }
}

type PCreateCommodity = Omit<CommodityInput, 'user'>

async function createCommodity(data: PCreateCommodity) {
  try {
    if (!data?.order) {
      return [false]
    }

    const user = getLocalStore('userId')

    await NClient.request<CreateCommodityMutation, CreateCommodityMutationVariables>(CreateCommodityDocument, {
      data: {
        ...data,
        user,
      },
    })
    return [true]
  } catch {
    return [false]
  }
}

type PExWarehouse = Omit<OutboundCommodityInput, 'outbound_user'>
async function exWarehouse(input: PExWarehouse) {
  try {
    const outbound_user = getLocalStore('userId')

    if (!outbound_user) {
      return [false]
    }

    await NClient.request<CommodityExWarehouseMutation, CommodityExWarehouseMutationVariables>(
      CommodityExWarehouseDocument,
      {
        input: {
          ...input,
          outbound_user,
        },
      }
    )
    return [true]
  } catch {
    return [false]
  }
}

async function fetchExGooods(val: OrderCommoditiesSimpleQueryVariables) {
  try {
    if (!val.id) {
      throw new Error('miss pagination id')
    }

    const { commodities } = await NClient.request<OrderCommoditiesSimpleQuery, OrderCommoditiesSimpleQueryVariables>(
      OrderCommoditiesSimpleDocument,
      val
    )

    return {
      data: (commodities?.values ?? []) as ExWGoodsItem[],
      total: commodities?.aggregate?.count ?? 0,
    }
  } catch {
    return {
      data: [],
      total: 0,
    }
  }
}

async function fetchExWarehouseHistory(val: ExWarehouseHistoryQueryVariables) {
  try {
    const { commodities } = await NClient.request<ExWarehouseHistoryQuery, ExWarehouseHistoryQueryVariables>(
      ExWarehouseHistoryDocument,
      val
    )

    return {
      total: commodities?.aggregate?.count ?? 0,
      data: (commodities?.values ?? []) as GoodsExHistoryItem[],
    }
  } catch {
    return {
      total: 0,
      data: [] as GoodsExHistoryItem[],
    }
  }
}

async function fetchInWarehouse(val: CommoditiesInWarehouseQueryVariables) {
  try {
    const { commodities } = await NClient.request<CommoditiesInWarehouseQuery, CommoditiesInWarehouseQueryVariables>(
      CommoditiesInWarehouseDocument,
      val
    )

    return {
      total: commodities?.aggregate?.count ?? 0,
      data: (commodities?.values ?? []) as GoodsInhouseItem[],
    }
  } catch {
    return {
      total: 0,
      data: [] as GoodsInhouseItem[],
    }
  }
}

export {
  fetchGoodsOrders,
  fetchOrderCommoditiesById,
  updateCommodity,
  createCommodity,
  exWarehouse,
  fetchExGooods,
  fetchExWarehouseHistory,
  fetchInWarehouse,
}

export type { PUpdateCommodity, PCreateCommodity, PExWarehouse }
