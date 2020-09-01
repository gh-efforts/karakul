import * as Types from './operations'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export const OrderHistoryFragmentDoc = gql`
  fragment orderHistory on OrderMaterialHistory {
    id
    createdAt
    updatedAt
    order_id {
      id
    }
    remark
    attachment_desc
    content
    user {
      username
    }
  }
`
export const OrderFragmentDoc = gql`
  fragment order on Order {
    id
    createdAt
    updatedAt
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
`
export const OmHrysDocument = gql`
  query OMHrys($sort: String, $limit: Int, $start: Int, $where: JSON) {
    hrys: orderMaterialHistories(sort: $sort, limit: $limit, start: $start, where: $where) {
      ...orderHistory
    }
  }
  ${OrderHistoryFragmentDoc}
`
export function useOmHrysQuery(baseOptions?: Apollo.QueryHookOptions<Types.OmHrysQuery, Types.OmHrysQueryVariables>) {
  return Apollo.useQuery<Types.OmHrysQuery, Types.OmHrysQueryVariables>(OmHrysDocument, baseOptions)
}
export function useOmHrysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.OmHrysQuery, Types.OmHrysQueryVariables>
) {
  return Apollo.useLazyQuery<Types.OmHrysQuery, Types.OmHrysQueryVariables>(OmHrysDocument, baseOptions)
}
export type OmHrysQueryHookResult = ReturnType<typeof useOmHrysQuery>
export type OmHrysLazyQueryHookResult = ReturnType<typeof useOmHrysLazyQuery>
export type OmHrysQueryResult = Apollo.QueryResult<Types.OmHrysQuery, Types.OmHrysQueryVariables>
export const OmHryDocument = gql`
  query OMHry($id: ID!) {
    hry: orderMaterialHistory(id: $id) {
      ...orderHistory
    }
  }
  ${OrderHistoryFragmentDoc}
`
export function useOmHryQuery(baseOptions?: Apollo.QueryHookOptions<Types.OmHryQuery, Types.OmHryQueryVariables>) {
  return Apollo.useQuery<Types.OmHryQuery, Types.OmHryQueryVariables>(OmHryDocument, baseOptions)
}
export function useOmHryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.OmHryQuery, Types.OmHryQueryVariables>
) {
  return Apollo.useLazyQuery<Types.OmHryQuery, Types.OmHryQueryVariables>(OmHryDocument, baseOptions)
}
export type OmHryQueryHookResult = ReturnType<typeof useOmHryQuery>
export type OmHryLazyQueryHookResult = ReturnType<typeof useOmHryLazyQuery>
export type OmHryQueryResult = Apollo.QueryResult<Types.OmHryQuery, Types.OmHryQueryVariables>
export const OrderMaterialsDocument = gql`
  query OrderMaterials($limit: Int, $start: Int, $where: JSON, $sort: String) {
    orderMaterials(limit: $limit, start: $start, where: $where, sort: $sort) {
      id
      createdAt
      updatedAt
      order_id {
        id
      }
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
      ...order
    }
  }
  ${OrderFragmentDoc}
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
      ...order
    }
  }
  ${OrderFragmentDoc}
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
export const CommodityTypesDocument = gql`
  query CommodityTypes($sort: String, $limit: Int, $start: Int, $where: JSON) {
    commodityTypesConnection(sort: $sort, limit: $limit, start: $start, where: $where) {
      values {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
      aggregate {
        totalCount
      }
    }
  }
`
export function useCommodityTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.CommodityTypesQuery, Types.CommodityTypesQueryVariables>
) {
  return Apollo.useQuery<Types.CommodityTypesQuery, Types.CommodityTypesQueryVariables>(
    CommodityTypesDocument,
    baseOptions
  )
}
export function useCommodityTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.CommodityTypesQuery, Types.CommodityTypesQueryVariables>
) {
  return Apollo.useLazyQuery<Types.CommodityTypesQuery, Types.CommodityTypesQueryVariables>(
    CommodityTypesDocument,
    baseOptions
  )
}
export type CommodityTypesQueryHookResult = ReturnType<typeof useCommodityTypesQuery>
export type CommodityTypesLazyQueryHookResult = ReturnType<typeof useCommodityTypesLazyQuery>
export type CommodityTypesQueryResult = Apollo.QueryResult<
  Types.CommodityTypesQuery,
  Types.CommodityTypesQueryVariables
>
export const CreateCommodityTypeDocument = gql`
  mutation CreateCommodityType($data: CommodityTypeInput) {
    createCommodityType(input: { data: $data }) {
      commodityType {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export type CreateCommodityTypeMutationFn = Apollo.MutationFunction<
  Types.CreateCommodityTypeMutation,
  Types.CreateCommodityTypeMutationVariables
>
export function useCreateCommodityTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateCommodityTypeMutation,
    Types.CreateCommodityTypeMutationVariables
  >
) {
  return Apollo.useMutation<Types.CreateCommodityTypeMutation, Types.CreateCommodityTypeMutationVariables>(
    CreateCommodityTypeDocument,
    baseOptions
  )
}
export type CreateCommodityTypeMutationHookResult = ReturnType<typeof useCreateCommodityTypeMutation>
export type CreateCommodityTypeMutationResult = Apollo.MutationResult<Types.CreateCommodityTypeMutation>
export type CreateCommodityTypeMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateCommodityTypeMutation,
  Types.CreateCommodityTypeMutationVariables
>
export const DeleteCommodityTypeDocument = gql`
  mutation DeleteCommodityType($id: ID!) {
    deleteCommodityType(input: { where: { id: $id } }) {
      commodityType {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export type DeleteCommodityTypeMutationFn = Apollo.MutationFunction<
  Types.DeleteCommodityTypeMutation,
  Types.DeleteCommodityTypeMutationVariables
>
export function useDeleteCommodityTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteCommodityTypeMutation,
    Types.DeleteCommodityTypeMutationVariables
  >
) {
  return Apollo.useMutation<Types.DeleteCommodityTypeMutation, Types.DeleteCommodityTypeMutationVariables>(
    DeleteCommodityTypeDocument,
    baseOptions
  )
}
export type DeleteCommodityTypeMutationHookResult = ReturnType<typeof useDeleteCommodityTypeMutation>
export type DeleteCommodityTypeMutationResult = Apollo.MutationResult<Types.DeleteCommodityTypeMutation>
export type DeleteCommodityTypeMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteCommodityTypeMutation,
  Types.DeleteCommodityTypeMutationVariables
>
export const WarehousesDocument = gql`
  query Warehouses($sort: String, $limit: Int, $start: Int, $where: JSON) {
    warehousesConnection(sort: $sort, limit: $limit, start: $start, where: $where) {
      values {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
      aggregate {
        totalCount
      }
    }
  }
`
export function useWarehousesQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.WarehousesQuery, Types.WarehousesQueryVariables>
) {
  return Apollo.useQuery<Types.WarehousesQuery, Types.WarehousesQueryVariables>(WarehousesDocument, baseOptions)
}
export function useWarehousesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.WarehousesQuery, Types.WarehousesQueryVariables>
) {
  return Apollo.useLazyQuery<Types.WarehousesQuery, Types.WarehousesQueryVariables>(WarehousesDocument, baseOptions)
}
export type WarehousesQueryHookResult = ReturnType<typeof useWarehousesQuery>
export type WarehousesLazyQueryHookResult = ReturnType<typeof useWarehousesLazyQuery>
export type WarehousesQueryResult = Apollo.QueryResult<Types.WarehousesQuery, Types.WarehousesQueryVariables>
export const CreateWarehouseDocument = gql`
  mutation CreateWarehouse($data: WarehouseInput) {
    createWarehouse(input: { data: $data }) {
      warehouse {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export type CreateWarehouseMutationFn = Apollo.MutationFunction<
  Types.CreateWarehouseMutation,
  Types.CreateWarehouseMutationVariables
>
export function useCreateWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.CreateWarehouseMutation, Types.CreateWarehouseMutationVariables>
) {
  return Apollo.useMutation<Types.CreateWarehouseMutation, Types.CreateWarehouseMutationVariables>(
    CreateWarehouseDocument,
    baseOptions
  )
}
export type CreateWarehouseMutationHookResult = ReturnType<typeof useCreateWarehouseMutation>
export type CreateWarehouseMutationResult = Apollo.MutationResult<Types.CreateWarehouseMutation>
export type CreateWarehouseMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateWarehouseMutation,
  Types.CreateWarehouseMutationVariables
>
export const DeleteWarehouseDocument = gql`
  mutation DeleteWarehouse($id: ID!) {
    deleteWarehouse(input: { where: { id: $id } }) {
      warehouse {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export type DeleteWarehouseMutationFn = Apollo.MutationFunction<
  Types.DeleteWarehouseMutation,
  Types.DeleteWarehouseMutationVariables
>
export function useDeleteWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.DeleteWarehouseMutation, Types.DeleteWarehouseMutationVariables>
) {
  return Apollo.useMutation<Types.DeleteWarehouseMutation, Types.DeleteWarehouseMutationVariables>(
    DeleteWarehouseDocument,
    baseOptions
  )
}
export type DeleteWarehouseMutationHookResult = ReturnType<typeof useDeleteWarehouseMutation>
export type DeleteWarehouseMutationResult = Apollo.MutationResult<Types.DeleteWarehouseMutation>
export type DeleteWarehouseMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteWarehouseMutation,
  Types.DeleteWarehouseMutationVariables
>
export const UpdateWarehouseDocument = gql`
  mutation UpdateWarehouse($id: ID!, $data: editWarehouseInput) {
    updateWarehouse(input: { where: { id: $id }, data: $data }) {
      warehouse {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export type UpdateWarehouseMutationFn = Apollo.MutationFunction<
  Types.UpdateWarehouseMutation,
  Types.UpdateWarehouseMutationVariables
>
export function useUpdateWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.UpdateWarehouseMutation, Types.UpdateWarehouseMutationVariables>
) {
  return Apollo.useMutation<Types.UpdateWarehouseMutation, Types.UpdateWarehouseMutationVariables>(
    UpdateWarehouseDocument,
    baseOptions
  )
}
export type UpdateWarehouseMutationHookResult = ReturnType<typeof useUpdateWarehouseMutation>
export type UpdateWarehouseMutationResult = Apollo.MutationResult<Types.UpdateWarehouseMutation>
export type UpdateWarehouseMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateWarehouseMutation,
  Types.UpdateWarehouseMutationVariables
>
