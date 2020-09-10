import { OrdersQueryVariables, OrdersConnectionQuery, OrdersConnectionDocument, NClient } from '../../services'

import type { TOrder, Connection } from '../type.d'

async function fetchOrders(val: OrdersQueryVariables & { Authorization?: string | undefined }) {
  try {
    const { ordersConnection } = await NClient.request<OrdersConnectionQuery>(OrdersConnectionDocument, val)

    return {
      data: (ordersConnection?.values ?? []) as TOrder[],
      total: ordersConnection?.aggregate?.count ?? 0,
    }
  } catch (e) {
    return { data: [], total: 0 } as Connection<TOrder>
  }
}

export { fetchOrders }
