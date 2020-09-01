import { OrderQuery } from '../../services'
export type TOrder = NonNullable<OrderQuery['order']>
