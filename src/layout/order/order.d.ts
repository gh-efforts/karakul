import { OrderQuery, OrdersConnectionQuery } from '../../services'
export type TOrder = NonNullable<OrderQuery['order']>
export type TOrderConnection = NonNullable<OrdersConnectionQuery['order']>
