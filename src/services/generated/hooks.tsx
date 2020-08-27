import * as Types from './operations'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export const OrdersDocument = gql`
  query Orders($id: ID!) {
    order(id: $id) {
      id
      created_at
      updated_at
      detail
      amount
      delivery_time
    }
  }
`
export function useOrdersQuery(baseOptions?: Apollo.QueryHookOptions<Types.OrdersQuery, Types.OrdersQueryVariables>) {
  return Apollo.useQuery<Types.OrdersQuery, Types.OrdersQueryVariables>(OrdersDocument, baseOptions)
}
export function useOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.OrdersQuery, Types.OrdersQueryVariables>
) {
  return Apollo.useLazyQuery<Types.OrdersQuery, Types.OrdersQueryVariables>(OrdersDocument, baseOptions)
}
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>
export type OrdersQueryResult = Apollo.QueryResult<Types.OrdersQuery, Types.OrdersQueryVariables>
