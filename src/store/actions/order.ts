import {
  OrdersQueryVariables,
  OrdersConnectionQuery,
  OrdersConnectionDocument,
  NClient,
  OrderQuery,
  OrderDocument,
  OrderQueryVariables,
  UpdateOrderMutation,
  UpdateOrderDocument,
  UpdateOrderMutationVariables,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderDocument,
  OrderHistoriesConnectionDocument,
  OrderHistoriesConnectionQueryVariables,
  OrderHistoriesConnectionQuery,
} from '../../services'

import type { TOrder, Connection, TOrderHistories } from '../type.d'
import { getLocalStore } from '../../helpers/cookie'

async function fetchOrders(val: OrdersQueryVariables) {
  try {
    const { ordersConnection } = await NClient.request<OrdersConnectionQuery, OrdersQueryVariables>(
      OrdersConnectionDocument,
      val
    )

    return {
      data: (ordersConnection?.values ?? []) as TOrder[],
      total: ordersConnection?.aggregate?.count ?? 0,
    }
  } catch (e) {
    return { data: [], total: 0 } as Connection<TOrder>
  }
}

async function fetchOrderById(id: string | null | undefined): Promise<TOrder | null | undefined> {
  try {
    if (!id) {
      return null
    }

    const { order } = await NClient.request<OrderQuery, OrderQueryVariables>(OrderDocument, { id })

    return order
  } catch {
    return null
  }
}

type PUpdateOrder = Pick<TOrder, 'id' | 'name' | 'amount' | 'detail' | 'delivery_time'>

async function updateOrder({
  id,
  name,
  amount,
  detail,
  delivery_time,
}: PUpdateOrder): Promise<[boolean, PUpdateOrder | null]> {
  try {
    // TODO: redirect
    const user = getLocalStore('userId') || ''

    await NClient.request<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, {
      id,
      data: { name, amount, detail, user, delivery_time },
    })

    return [
      true,
      {
        id,
        name,
        amount,
        detail,
        delivery_time,
      },
    ]
  } catch {
    return [false, null]
  }
}

type PCreateOrder = Pick<TOrder, 'name' | 'amount' | 'detail' | 'delivery_time'>

async function createOrder({
  name,
  amount,
  detail,
  delivery_time,
}: PCreateOrder): Promise<[boolean, PCreateOrder | null]> {
  try {
    const user = getLocalStore('userId') || ''
    await NClient.request<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, {
      data: { name, amount, detail, user, delivery_time },
    })

    return [true, { name, amount, detail, delivery_time }]
  } catch {
    return [false, null]
  }
}

async function fetchHistoryByOrderId({ id, limit, start }: OrderHistoriesConnectionQueryVariables) {
  try {
    const { orderHistoriesConnection } = await NClient.request<
      OrderHistoriesConnectionQuery,
      OrderHistoriesConnectionQueryVariables
    >(OrderHistoriesConnectionDocument, { id, limit, start })

    return {
      data: (orderHistoriesConnection?.values ?? []) as TOrderHistories[],
      total: orderHistoriesConnection?.aggregate?.count ?? 0,
    }
  } catch {
    return { data: [], total: 0 } as Connection<TOrderHistories>
  }
}

export { fetchOrders, fetchOrderById, updateOrder, createOrder, fetchHistoryByOrderId }

export type { PUpdateOrder, PCreateOrder }
