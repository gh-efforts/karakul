import * as Types from './operations'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

export const OrderMaterialsDocument = gql`
  query OrderMaterials($limit: Int, $start: Int, $where: JSON, $sort: String) {
    orderMaterials(limit: $limit, start: $start, where: $where, sort: $sort) {
      id
      created_at
      updated_at
      order_id
      material
      amount
      model
      user {
        id
        username
      }
    }
  }
`
export function useOrderMaterialsQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.OrderMaterialsQuery, Types.OrderMaterialsQueryVariables>
) {
  return Apollo.useQuery<Types.OrderMaterialsQuery, Types.OrderMaterialsQueryVariables>(
    OrderMaterialsDocument,
    baseOptions
  )
}
export function useOrderMaterialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.OrderMaterialsQuery, Types.OrderMaterialsQueryVariables>
) {
  return Apollo.useLazyQuery<Types.OrderMaterialsQuery, Types.OrderMaterialsQueryVariables>(
    OrderMaterialsDocument,
    baseOptions
  )
}
export type OrderMaterialsQueryHookResult = ReturnType<typeof useOrderMaterialsQuery>
export type OrderMaterialsLazyQueryHookResult = ReturnType<typeof useOrderMaterialsLazyQuery>
export type OrderMaterialsQueryResult = Apollo.QueryResult<
  Types.OrderMaterialsQuery,
  Types.OrderMaterialsQueryVariables
>
export const OrdersDocument = gql`
  query Orders($sort: String, $limit: Int, $start: Int, $where: JSON) {
    orders(sort: $sort, limit: $limit, start: $start, where: $where) {
      id
      created_at
      updated_at
      detail
      amount
      delivery_time
      created_by {
        username
      }
      updated_by {
        username
      }
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
export const OrderDocument = gql`
  query Order($id: ID!) {
    order(id: $id) {
      id
      created_at
      updated_at
      detail
      amount
      delivery_time
      created_by {
        username
      }
      updated_by {
        username
      }
    }
  }
`
export function useOrderQuery(baseOptions?: Apollo.QueryHookOptions<Types.OrderQuery, Types.OrderQueryVariables>) {
  return Apollo.useQuery<Types.OrderQuery, Types.OrderQueryVariables>(OrderDocument, baseOptions)
}
export function useOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.OrderQuery, Types.OrderQueryVariables>
) {
  return Apollo.useLazyQuery<Types.OrderQuery, Types.OrderQueryVariables>(OrderDocument, baseOptions)
}
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>
export type OrderQueryResult = Apollo.QueryResult<Types.OrderQuery, Types.OrderQueryVariables>
