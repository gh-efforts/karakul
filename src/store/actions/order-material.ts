import {
  NClient,
  OrderMaterialsQueryVariables,
  OrderMaterialsConnectionQuery,
  OrderMaterialsConnectionQueryVariables,
  OrderMaterialsConnectionDocument,
  CreateOrderMaterialsMutation,
  CreateOrderMaterialsMutationVariables,
  CreateOrderMaterialsDocument,
  MaterialsInput,
  UpdateOrderMaterialsMutation,
  UpdateOrderMaterialsDocument,
  UpdateOrderMaterialsInput,
  UpdateOrderMaterialsMutationVariables,
  OrderMaterialHistoriesConnectionQuery,
  OrderMaterialHistoriesConnectionQueryVariables,
  OrderMaterialHistoriesConnectionDocument,
  OrderMaterialHistory,
} from '../../services'
import { getLocalStore } from '../../helpers/cookie'

import { OrderMaterialType, Connection } from '../type.d'

async function fetchOrderMaterials(val: OrderMaterialsConnectionQueryVariables) {
  try {
    const { orderMaterialsConnection } = await NClient.request<
      OrderMaterialsConnectionQuery,
      OrderMaterialsQueryVariables
    >(OrderMaterialsConnectionDocument, val)

    return {
      data: (orderMaterialsConnection?.values ?? []) as OrderMaterialType[],
      total: orderMaterialsConnection?.aggregate?.count ?? 0,
    }
  } catch (e) {
    return { data: [], total: 0 } as Connection<OrderMaterialType>
  }
}

async function createMaterials(materials: MaterialsInput[], order_id: string | null | undefined): Promise<[boolean]> {
  if (!order_id) {
    return [false]
  }

  try {
    const user = getLocalStore('userId') || ''

    await NClient.request<CreateOrderMaterialsMutation, CreateOrderMaterialsMutationVariables>(
      CreateOrderMaterialsDocument,
      {
        input: { order_id, materials, user },
      }
    )
    return [true]
  } catch {
    return [false]
  }
}

type PUpdateMaterials = Omit<UpdateOrderMaterialsInput, 'user' | 'order_id'>

async function updateMaterials(val: PUpdateMaterials, order_id: string | null | undefined): Promise<[boolean]> {
  if (!order_id) {
    return [false]
  }

  try {
    const user = getLocalStore('userId') || ''

    await NClient.request<UpdateOrderMaterialsMutation, UpdateOrderMaterialsMutationVariables>(
      UpdateOrderMaterialsDocument,
      {
        input: {
          ...val,
          user,
          order_id,
        },
      }
    )
    return [true]
  } catch {
    return [false]
  }
}

async function fetchOrderMaterialHistory(val: OrderMaterialHistoriesConnectionQueryVariables) {
  try {
    const { orderMaterialHistoriesConnection } = await NClient.request<
      OrderMaterialHistoriesConnectionQuery,
      OrderMaterialHistoriesConnectionQueryVariables
    >(OrderMaterialHistoriesConnectionDocument, val)

    return {
      data: (orderMaterialHistoriesConnection?.values ?? []) as OrderMaterialHistory[],
      total: orderMaterialHistoriesConnection?.aggregate?.count ?? 0,
    }
  } catch (e) {
    return { data: [], total: 0 } as Connection<OrderMaterialHistory>
  }
}

export { fetchOrderMaterials, createMaterials, updateMaterials, fetchOrderMaterialHistory }
export type { PUpdateMaterials }
