import * as Types from './schemas'

export type OrdersQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type OrdersQuery = {
  order?: Types.Maybe<Pick<Types.Order, 'id' | 'created_at' | 'updated_at' | 'detail' | 'amount' | 'delivery_time'>>
}
