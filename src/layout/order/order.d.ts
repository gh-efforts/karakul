import { OrderQuery, OrdersConnectionQuery } from '../../services'
export type TOrder = NonNullable<OrderQuery['order']>
export type TOrderHistories = NonNullable<OrderHistoriesQuery['order']>
export type TOrderConnection = NonNullable<OrdersConnectionQuery['order']>
export type TOrderHistoryConnection = NonNullable<OrderHistoriesConnectionQuery['order']>
