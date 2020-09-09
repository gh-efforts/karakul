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
    name
    createdAt
    updatedAt
    detail
    amount
    delivery_time
    user {
      username
    }
  }
`
export const UploadDocument = gql`
  mutation Upload($refId: ID, $ref: String, $field: String, $source: String, $file: Upload!) {
    upload(refId: $refId, ref: $ref, field: $field, source: $source, file: $file) {
      id
      _id
      createdAt
      updatedAt
      name
      alternativeText
      caption
      width
      height
      formats
      hash
      ext
      mime
      size
      url
      httpUrl
      previewUrl
      provider
      provider_metadata
    }
  }
`
export type UploadMutationFn = Apollo.MutationFunction<Types.UploadMutation, Types.UploadMutationVariables>
export function useUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.UploadMutation, Types.UploadMutationVariables>
) {
  return Apollo.useMutation<Types.UploadMutation, Types.UploadMutationVariables>(UploadDocument, baseOptions)
}
export type UploadMutationHookResult = ReturnType<typeof useUploadMutation>
export type UploadMutationResult = Apollo.MutationResult<Types.UploadMutation>
export type UploadMutationOptions = Apollo.BaseMutationOptions<Types.UploadMutation, Types.UploadMutationVariables>
export const MultipleUploadDocument = gql`
  mutation MultipleUpload($refId: ID, $ref: String, $field: String, $source: String, $files: [Upload]!) {
    multipleUpload(refId: $refId, ref: $ref, field: $field, source: $source, files: $files) {
      id
      _id
      createdAt
      updatedAt
      name
      alternativeText
      caption
      width
      height
      formats
      hash
      ext
      mime
      size
      url
      httpUrl
      previewUrl
      provider
      provider_metadata
    }
  }
`
export type MultipleUploadMutationFn = Apollo.MutationFunction<
  Types.MultipleUploadMutation,
  Types.MultipleUploadMutationVariables
>
export function useMultipleUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.MultipleUploadMutation, Types.MultipleUploadMutationVariables>
) {
  return Apollo.useMutation<Types.MultipleUploadMutation, Types.MultipleUploadMutationVariables>(
    MultipleUploadDocument,
    baseOptions
  )
}
export type MultipleUploadMutationHookResult = ReturnType<typeof useMultipleUploadMutation>
export type MultipleUploadMutationResult = Apollo.MutationResult<Types.MultipleUploadMutation>
export type MultipleUploadMutationOptions = Apollo.BaseMutationOptions<
  Types.MultipleUploadMutation,
  Types.MultipleUploadMutationVariables
>
export const GoodsOrdersDocument = gql`
  query GoodsOrders($limit: Int, $start: Int, $where: JSON) {
    orders: ordersConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      values {
        id
        name
      }
      aggregate {
        count
        totalCount
      }
    }
  }
`
export function useGoodsOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.GoodsOrdersQuery, Types.GoodsOrdersQueryVariables>
) {
  return Apollo.useQuery<Types.GoodsOrdersQuery, Types.GoodsOrdersQueryVariables>(GoodsOrdersDocument, baseOptions)
}
export function useGoodsOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.GoodsOrdersQuery, Types.GoodsOrdersQueryVariables>
) {
  return Apollo.useLazyQuery<Types.GoodsOrdersQuery, Types.GoodsOrdersQueryVariables>(GoodsOrdersDocument, baseOptions)
}
export type GoodsOrdersQueryHookResult = ReturnType<typeof useGoodsOrdersQuery>
export type GoodsOrdersLazyQueryHookResult = ReturnType<typeof useGoodsOrdersLazyQuery>
export type GoodsOrdersQueryResult = Apollo.QueryResult<Types.GoodsOrdersQuery, Types.GoodsOrdersQueryVariables>
export const OrderCommoditiesDocument = gql`
  query OrderCommodities($id: ID!) {
    order(id: $id) {
      id
      commodities(start: 0, limit: 1000, sort: "createdAt:desc") {
        id
        code
        commodity_type {
          id
          name
        }
        warehouse {
          name
          id
        }
        destination
        createdAt
        user {
          username
        }
        accessories
      }
    }
  }
`
export function useOrderCommoditiesQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.OrderCommoditiesQuery, Types.OrderCommoditiesQueryVariables>
) {
  return Apollo.useQuery<Types.OrderCommoditiesQuery, Types.OrderCommoditiesQueryVariables>(
    OrderCommoditiesDocument,
    baseOptions
  )
}
export function useOrderCommoditiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.OrderCommoditiesQuery, Types.OrderCommoditiesQueryVariables>
) {
  return Apollo.useLazyQuery<Types.OrderCommoditiesQuery, Types.OrderCommoditiesQueryVariables>(
    OrderCommoditiesDocument,
    baseOptions
  )
}
export type OrderCommoditiesQueryHookResult = ReturnType<typeof useOrderCommoditiesQuery>
export type OrderCommoditiesLazyQueryHookResult = ReturnType<typeof useOrderCommoditiesLazyQuery>
export type OrderCommoditiesQueryResult = Apollo.QueryResult<
  Types.OrderCommoditiesQuery,
  Types.OrderCommoditiesQueryVariables
>
export const OrderCommoditiesSimpleDocument = gql`
  query OrderCommoditiesSimple($id: ID!, $start: Int, $limit: Int, $state: ENUM_COMMODITY_STATE) {
    commodities: commoditiesConnection(start: $start, limit: $limit, where: { order: $id, state: $state }) {
      values {
        id
        code
        commodity_type {
          id
          name
        }
        destination
        warehouse {
          name
          id
        }
      }
      aggregate {
        count
        totalCount
      }
    }
  }
`
export function useOrderCommoditiesSimpleQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.OrderCommoditiesSimpleQuery, Types.OrderCommoditiesSimpleQueryVariables>
) {
  return Apollo.useQuery<Types.OrderCommoditiesSimpleQuery, Types.OrderCommoditiesSimpleQueryVariables>(
    OrderCommoditiesSimpleDocument,
    baseOptions
  )
}
export function useOrderCommoditiesSimpleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.OrderCommoditiesSimpleQuery,
    Types.OrderCommoditiesSimpleQueryVariables
  >
) {
  return Apollo.useLazyQuery<Types.OrderCommoditiesSimpleQuery, Types.OrderCommoditiesSimpleQueryVariables>(
    OrderCommoditiesSimpleDocument,
    baseOptions
  )
}
export type OrderCommoditiesSimpleQueryHookResult = ReturnType<typeof useOrderCommoditiesSimpleQuery>
export type OrderCommoditiesSimpleLazyQueryHookResult = ReturnType<typeof useOrderCommoditiesSimpleLazyQuery>
export type OrderCommoditiesSimpleQueryResult = Apollo.QueryResult<
  Types.OrderCommoditiesSimpleQuery,
  Types.OrderCommoditiesSimpleQueryVariables
>
export const CommodityTypesSelectDocument = gql`
  query CommodityTypesSelect {
    types: commodityTypes(start: 0, limit: 1000) {
      id
      name
    }
  }
`
export function useCommodityTypesSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.CommodityTypesSelectQuery, Types.CommodityTypesSelectQueryVariables>
) {
  return Apollo.useQuery<Types.CommodityTypesSelectQuery, Types.CommodityTypesSelectQueryVariables>(
    CommodityTypesSelectDocument,
    baseOptions
  )
}
export function useCommodityTypesSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.CommodityTypesSelectQuery, Types.CommodityTypesSelectQueryVariables>
) {
  return Apollo.useLazyQuery<Types.CommodityTypesSelectQuery, Types.CommodityTypesSelectQueryVariables>(
    CommodityTypesSelectDocument,
    baseOptions
  )
}
export type CommodityTypesSelectQueryHookResult = ReturnType<typeof useCommodityTypesSelectQuery>
export type CommodityTypesSelectLazyQueryHookResult = ReturnType<typeof useCommodityTypesSelectLazyQuery>
export type CommodityTypesSelectQueryResult = Apollo.QueryResult<
  Types.CommodityTypesSelectQuery,
  Types.CommodityTypesSelectQueryVariables
>
export const WarehousesSelectDocument = gql`
  query WarehousesSelect {
    pos: warehouses(start: 0, limit: 1000) {
      id
      name
    }
  }
`
export function useWarehousesSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.WarehousesSelectQuery, Types.WarehousesSelectQueryVariables>
) {
  return Apollo.useQuery<Types.WarehousesSelectQuery, Types.WarehousesSelectQueryVariables>(
    WarehousesSelectDocument,
    baseOptions
  )
}
export function useWarehousesSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.WarehousesSelectQuery, Types.WarehousesSelectQueryVariables>
) {
  return Apollo.useLazyQuery<Types.WarehousesSelectQuery, Types.WarehousesSelectQueryVariables>(
    WarehousesSelectDocument,
    baseOptions
  )
}
export type WarehousesSelectQueryHookResult = ReturnType<typeof useWarehousesSelectQuery>
export type WarehousesSelectLazyQueryHookResult = ReturnType<typeof useWarehousesSelectLazyQuery>
export type WarehousesSelectQueryResult = Apollo.QueryResult<
  Types.WarehousesSelectQuery,
  Types.WarehousesSelectQueryVariables
>
export const CommodityExWarehouseDocument = gql`
  mutation CommodityExWarehouse($input: outboundCommodityInput) {
    commodities: outboundCommodity(input: $input) {
      data
    }
  }
`
export type CommodityExWarehouseMutationFn = Apollo.MutationFunction<
  Types.CommodityExWarehouseMutation,
  Types.CommodityExWarehouseMutationVariables
>
export function useCommodityExWarehouseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CommodityExWarehouseMutation,
    Types.CommodityExWarehouseMutationVariables
  >
) {
  return Apollo.useMutation<Types.CommodityExWarehouseMutation, Types.CommodityExWarehouseMutationVariables>(
    CommodityExWarehouseDocument,
    baseOptions
  )
}
export type CommodityExWarehouseMutationHookResult = ReturnType<typeof useCommodityExWarehouseMutation>
export type CommodityExWarehouseMutationResult = Apollo.MutationResult<Types.CommodityExWarehouseMutation>
export type CommodityExWarehouseMutationOptions = Apollo.BaseMutationOptions<
  Types.CommodityExWarehouseMutation,
  Types.CommodityExWarehouseMutationVariables
>
export const CommoditiesDocument = gql`
  query Commodities($sort: String, $limit: Int, $start: Int, $where: JSON) {
    commodities(sort: $sort, limit: $limit, start: $start, where: $where) {
      id
      accessories
    }
  }
`
export function useCommoditiesQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.CommoditiesQuery, Types.CommoditiesQueryVariables>
) {
  return Apollo.useQuery<Types.CommoditiesQuery, Types.CommoditiesQueryVariables>(CommoditiesDocument, baseOptions)
}
export function useCommoditiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.CommoditiesQuery, Types.CommoditiesQueryVariables>
) {
  return Apollo.useLazyQuery<Types.CommoditiesQuery, Types.CommoditiesQueryVariables>(CommoditiesDocument, baseOptions)
}
export type CommoditiesQueryHookResult = ReturnType<typeof useCommoditiesQuery>
export type CommoditiesLazyQueryHookResult = ReturnType<typeof useCommoditiesLazyQuery>
export type CommoditiesQueryResult = Apollo.QueryResult<Types.CommoditiesQuery, Types.CommoditiesQueryVariables>
export const CreateCommodityDocument = gql`
  mutation CreateCommodity($data: CommodityInput) {
    res: createCommodity(input: { data: $data }) {
      commodity {
        id
      }
    }
  }
`
export type CreateCommodityMutationFn = Apollo.MutationFunction<
  Types.CreateCommodityMutation,
  Types.CreateCommodityMutationVariables
>
export function useCreateCommodityMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.CreateCommodityMutation, Types.CreateCommodityMutationVariables>
) {
  return Apollo.useMutation<Types.CreateCommodityMutation, Types.CreateCommodityMutationVariables>(
    CreateCommodityDocument,
    baseOptions
  )
}
export type CreateCommodityMutationHookResult = ReturnType<typeof useCreateCommodityMutation>
export type CreateCommodityMutationResult = Apollo.MutationResult<Types.CreateCommodityMutation>
export type CreateCommodityMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateCommodityMutation,
  Types.CreateCommodityMutationVariables
>
export const UpdateCommodityDocument = gql`
  mutation UpdateCommodity($id: ID!, $data: editCommodityInput) {
    res: updateCommodity(input: { where: { id: $id }, data: $data }) {
      commodity {
        id
      }
    }
  }
`
export type UpdateCommodityMutationFn = Apollo.MutationFunction<
  Types.UpdateCommodityMutation,
  Types.UpdateCommodityMutationVariables
>
export function useUpdateCommodityMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.UpdateCommodityMutation, Types.UpdateCommodityMutationVariables>
) {
  return Apollo.useMutation<Types.UpdateCommodityMutation, Types.UpdateCommodityMutationVariables>(
    UpdateCommodityDocument,
    baseOptions
  )
}
export type UpdateCommodityMutationHookResult = ReturnType<typeof useUpdateCommodityMutation>
export type UpdateCommodityMutationResult = Apollo.MutationResult<Types.UpdateCommodityMutation>
export type UpdateCommodityMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateCommodityMutation,
  Types.UpdateCommodityMutationVariables
>
export const ExWarehouseHistoryDocument = gql`
  query ExWarehouseHistory($limit: Int, $start: Int, $orderId: ID) {
    commodities: commoditiesConnection(
      sort: "createdAt:desc"
      limit: $limit
      start: $start
      where: { order: $orderId, state: "out" }
    ) {
      values {
        id
        code
        destination
        delivery_time
        user {
          username
        }
        outbound_user {
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export function useExWarehouseHistoryQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.ExWarehouseHistoryQuery, Types.ExWarehouseHistoryQueryVariables>
) {
  return Apollo.useQuery<Types.ExWarehouseHistoryQuery, Types.ExWarehouseHistoryQueryVariables>(
    ExWarehouseHistoryDocument,
    baseOptions
  )
}
export function useExWarehouseHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.ExWarehouseHistoryQuery, Types.ExWarehouseHistoryQueryVariables>
) {
  return Apollo.useLazyQuery<Types.ExWarehouseHistoryQuery, Types.ExWarehouseHistoryQueryVariables>(
    ExWarehouseHistoryDocument,
    baseOptions
  )
}
export type ExWarehouseHistoryQueryHookResult = ReturnType<typeof useExWarehouseHistoryQuery>
export type ExWarehouseHistoryLazyQueryHookResult = ReturnType<typeof useExWarehouseHistoryLazyQuery>
export type ExWarehouseHistoryQueryResult = Apollo.QueryResult<
  Types.ExWarehouseHistoryQuery,
  Types.ExWarehouseHistoryQueryVariables
>
export const CommoditiesInWarehouseDocument = gql`
  query CommoditiesInWarehouse($limit: Int, $start: Int, $orderId: ID) {
    commodities: commoditiesConnection(
      sort: "createdAt:desc"
      limit: $limit
      start: $start
      where: { order: $orderId, state: "in" }
    ) {
      values {
        id
        code
        commodity_type {
          name
        }
        warehouse {
          name
        }
        createdAt
        user {
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export function useCommoditiesInWarehouseQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.CommoditiesInWarehouseQuery, Types.CommoditiesInWarehouseQueryVariables>
) {
  return Apollo.useQuery<Types.CommoditiesInWarehouseQuery, Types.CommoditiesInWarehouseQueryVariables>(
    CommoditiesInWarehouseDocument,
    baseOptions
  )
}
export function useCommoditiesInWarehouseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.CommoditiesInWarehouseQuery,
    Types.CommoditiesInWarehouseQueryVariables
  >
) {
  return Apollo.useLazyQuery<Types.CommoditiesInWarehouseQuery, Types.CommoditiesInWarehouseQueryVariables>(
    CommoditiesInWarehouseDocument,
    baseOptions
  )
}
export type CommoditiesInWarehouseQueryHookResult = ReturnType<typeof useCommoditiesInWarehouseQuery>
export type CommoditiesInWarehouseLazyQueryHookResult = ReturnType<typeof useCommoditiesInWarehouseLazyQuery>
export type CommoditiesInWarehouseQueryResult = Apollo.QueryResult<
  Types.CommoditiesInWarehouseQuery,
  Types.CommoditiesInWarehouseQueryVariables
>
export const OmHrysDocument = gql`
  query OMHrys($limit: Int, $start: Int, $where: JSON) {
    hrys: orderMaterialHistories(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
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
  query OrderMaterials($limit: Int, $start: Int, $where: JSON) {
    orderMaterials(limit: $limit, start: $start, where: $where, sort: "createdAt:desc") {
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
export const OrderMaterialsConnectionDocument = gql`
  query OrderMaterialsConnection($limit: Int, $start: Int, $where: JSON) {
    orderMaterialsConnection(limit: $limit, start: $start, where: $where, sort: "createdAt:desc") {
      values {
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
      aggregate {
        count
      }
    }
  }
`
export function useOrderMaterialsConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.OrderMaterialsConnectionQuery,
    Types.OrderMaterialsConnectionQueryVariables
  >
) {
  return Apollo.useQuery<Types.OrderMaterialsConnectionQuery, Types.OrderMaterialsConnectionQueryVariables>(
    OrderMaterialsConnectionDocument,
    baseOptions
  )
}
export function useOrderMaterialsConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.OrderMaterialsConnectionQuery,
    Types.OrderMaterialsConnectionQueryVariables
  >
) {
  return Apollo.useLazyQuery<Types.OrderMaterialsConnectionQuery, Types.OrderMaterialsConnectionQueryVariables>(
    OrderMaterialsConnectionDocument,
    baseOptions
  )
}
export type OrderMaterialsConnectionQueryHookResult = ReturnType<typeof useOrderMaterialsConnectionQuery>
export type OrderMaterialsConnectionLazyQueryHookResult = ReturnType<typeof useOrderMaterialsConnectionLazyQuery>
export type OrderMaterialsConnectionQueryResult = Apollo.QueryResult<
  Types.OrderMaterialsConnectionQuery,
  Types.OrderMaterialsConnectionQueryVariables
>
export const CreateOrderMaterialsDocument = gql`
  mutation CreateOrderMaterials($input: CreateOrderMaterialsInput) {
    batchCreateMaterials(input: $input) {
      order_id
    }
  }
`
export type CreateOrderMaterialsMutationFn = Apollo.MutationFunction<
  Types.CreateOrderMaterialsMutation,
  Types.CreateOrderMaterialsMutationVariables
>
export function useCreateOrderMaterialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CreateOrderMaterialsMutation,
    Types.CreateOrderMaterialsMutationVariables
  >
) {
  return Apollo.useMutation<Types.CreateOrderMaterialsMutation, Types.CreateOrderMaterialsMutationVariables>(
    CreateOrderMaterialsDocument,
    baseOptions
  )
}
export type CreateOrderMaterialsMutationHookResult = ReturnType<typeof useCreateOrderMaterialsMutation>
export type CreateOrderMaterialsMutationResult = Apollo.MutationResult<Types.CreateOrderMaterialsMutation>
export type CreateOrderMaterialsMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateOrderMaterialsMutation,
  Types.CreateOrderMaterialsMutationVariables
>
export const UpdateOrderMaterialsDocument = gql`
  mutation UpdateOrderMaterials($input: UpdateOrderMaterialsInput) {
    batchUpdateMaterials(input: $input) {
      order_id
    }
  }
`
export type UpdateOrderMaterialsMutationFn = Apollo.MutationFunction<
  Types.UpdateOrderMaterialsMutation,
  Types.UpdateOrderMaterialsMutationVariables
>
export function useUpdateOrderMaterialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateOrderMaterialsMutation,
    Types.UpdateOrderMaterialsMutationVariables
  >
) {
  return Apollo.useMutation<Types.UpdateOrderMaterialsMutation, Types.UpdateOrderMaterialsMutationVariables>(
    UpdateOrderMaterialsDocument,
    baseOptions
  )
}
export type UpdateOrderMaterialsMutationHookResult = ReturnType<typeof useUpdateOrderMaterialsMutation>
export type UpdateOrderMaterialsMutationResult = Apollo.MutationResult<Types.UpdateOrderMaterialsMutation>
export type UpdateOrderMaterialsMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateOrderMaterialsMutation,
  Types.UpdateOrderMaterialsMutationVariables
>
export const OrderMaterialHistoriesConnectionDocument = gql`
  query OrderMaterialHistoriesConnection($limit: Int, $start: Int, $id: ID) {
    orderMaterialHistoriesConnection(limit: $limit, start: $start, where: { order_id: $id }, sort: "createdAt:desc") {
      values {
        id
        createdAt
        updatedAt
        remark
        user {
          username
        }
        attachment_desc
        content
        attachment {
          id
          url
          ext
          name
        }
      }
      aggregate {
        count
      }
    }
  }
`
export function useOrderMaterialHistoriesConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.OrderMaterialHistoriesConnectionQuery,
    Types.OrderMaterialHistoriesConnectionQueryVariables
  >
) {
  return Apollo.useQuery<
    Types.OrderMaterialHistoriesConnectionQuery,
    Types.OrderMaterialHistoriesConnectionQueryVariables
  >(OrderMaterialHistoriesConnectionDocument, baseOptions)
}
export function useOrderMaterialHistoriesConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.OrderMaterialHistoriesConnectionQuery,
    Types.OrderMaterialHistoriesConnectionQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    Types.OrderMaterialHistoriesConnectionQuery,
    Types.OrderMaterialHistoriesConnectionQueryVariables
  >(OrderMaterialHistoriesConnectionDocument, baseOptions)
}
export type OrderMaterialHistoriesConnectionQueryHookResult = ReturnType<
  typeof useOrderMaterialHistoriesConnectionQuery
>
export type OrderMaterialHistoriesConnectionLazyQueryHookResult = ReturnType<
  typeof useOrderMaterialHistoriesConnectionLazyQuery
>
export type OrderMaterialHistoriesConnectionQueryResult = Apollo.QueryResult<
  Types.OrderMaterialHistoriesConnectionQuery,
  Types.OrderMaterialHistoriesConnectionQueryVariables
>
export const MaterialsDocument = gql`
  query Materials {
    materials(limit: 1000, start: 0) {
      id
      name
    }
  }
`
export function useMaterialsQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.MaterialsQuery, Types.MaterialsQueryVariables>
) {
  return Apollo.useQuery<Types.MaterialsQuery, Types.MaterialsQueryVariables>(MaterialsDocument, baseOptions)
}
export function useMaterialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.MaterialsQuery, Types.MaterialsQueryVariables>
) {
  return Apollo.useLazyQuery<Types.MaterialsQuery, Types.MaterialsQueryVariables>(MaterialsDocument, baseOptions)
}
export type MaterialsQueryHookResult = ReturnType<typeof useMaterialsQuery>
export type MaterialsLazyQueryHookResult = ReturnType<typeof useMaterialsLazyQuery>
export type MaterialsQueryResult = Apollo.QueryResult<Types.MaterialsQuery, Types.MaterialsQueryVariables>
export const OrdersDocument = gql`
  query Orders($limit: Int, $start: Int, $where: JSON) {
    orders(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
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
export const OrdersConnectionDocument = gql`
  query OrdersConnection($limit: Int, $start: Int, $where: JSON) {
    ordersConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      values {
        ...order
      }
      aggregate {
        count
      }
    }
  }
  ${OrderFragmentDoc}
`
export function useOrdersConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.OrdersConnectionQuery, Types.OrdersConnectionQueryVariables>
) {
  return Apollo.useQuery<Types.OrdersConnectionQuery, Types.OrdersConnectionQueryVariables>(
    OrdersConnectionDocument,
    baseOptions
  )
}
export function useOrdersConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.OrdersConnectionQuery, Types.OrdersConnectionQueryVariables>
) {
  return Apollo.useLazyQuery<Types.OrdersConnectionQuery, Types.OrdersConnectionQueryVariables>(
    OrdersConnectionDocument,
    baseOptions
  )
}
export type OrdersConnectionQueryHookResult = ReturnType<typeof useOrdersConnectionQuery>
export type OrdersConnectionLazyQueryHookResult = ReturnType<typeof useOrdersConnectionLazyQuery>
export type OrdersConnectionQueryResult = Apollo.QueryResult<
  Types.OrdersConnectionQuery,
  Types.OrdersConnectionQueryVariables
>
export const CreateOrderDocument = gql`
  mutation CreateOrder($data: OrderInput) {
    createNewOrder(input: { data: $data }) {
      order {
        ...order
      }
    }
  }
  ${OrderFragmentDoc}
`
export type CreateOrderMutationFn = Apollo.MutationFunction<
  Types.CreateOrderMutation,
  Types.CreateOrderMutationVariables
>
export function useCreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.CreateOrderMutation, Types.CreateOrderMutationVariables>
) {
  return Apollo.useMutation<Types.CreateOrderMutation, Types.CreateOrderMutationVariables>(
    CreateOrderDocument,
    baseOptions
  )
}
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>
export type CreateOrderMutationResult = Apollo.MutationResult<Types.CreateOrderMutation>
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateOrderMutation,
  Types.CreateOrderMutationVariables
>
export const UpdateOrderDocument = gql`
  mutation UpdateOrder($id: ID!, $data: editOrderInput) {
    updateOldOrder(input: { where: { id: $id }, data: $data }) {
      order {
        ...order
      }
    }
  }
  ${OrderFragmentDoc}
`
export type UpdateOrderMutationFn = Apollo.MutationFunction<
  Types.UpdateOrderMutation,
  Types.UpdateOrderMutationVariables
>
export function useUpdateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.UpdateOrderMutation, Types.UpdateOrderMutationVariables>
) {
  return Apollo.useMutation<Types.UpdateOrderMutation, Types.UpdateOrderMutationVariables>(
    UpdateOrderDocument,
    baseOptions
  )
}
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>
export type UpdateOrderMutationResult = Apollo.MutationResult<Types.UpdateOrderMutation>
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateOrderMutation,
  Types.UpdateOrderMutationVariables
>
export const OrderHistoriesConnectionDocument = gql`
  query OrderHistoriesConnection($limit: Int, $start: Int, $id: ID!) {
    orderHistoriesConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: { order: $id }) {
      values {
        id
        createdAt
        updatedAt
        detail
        amount
        delivery_time
        order {
          id
          name
        }
        user {
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export function useOrderHistoriesConnectionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.OrderHistoriesConnectionQuery,
    Types.OrderHistoriesConnectionQueryVariables
  >
) {
  return Apollo.useQuery<Types.OrderHistoriesConnectionQuery, Types.OrderHistoriesConnectionQueryVariables>(
    OrderHistoriesConnectionDocument,
    baseOptions
  )
}
export function useOrderHistoriesConnectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.OrderHistoriesConnectionQuery,
    Types.OrderHistoriesConnectionQueryVariables
  >
) {
  return Apollo.useLazyQuery<Types.OrderHistoriesConnectionQuery, Types.OrderHistoriesConnectionQueryVariables>(
    OrderHistoriesConnectionDocument,
    baseOptions
  )
}
export type OrderHistoriesConnectionQueryHookResult = ReturnType<typeof useOrderHistoriesConnectionQuery>
export type OrderHistoriesConnectionLazyQueryHookResult = ReturnType<typeof useOrderHistoriesConnectionLazyQuery>
export type OrderHistoriesConnectionQueryResult = Apollo.QueryResult<
  Types.OrderHistoriesConnectionQuery,
  Types.OrderHistoriesConnectionQueryVariables
>
export const CommodityTypesDocument = gql`
  query CommodityTypes($limit: Int, $start: Int, $where: JSON) {
    commodityTypesConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
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
        count
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
export const UpdateCommodityTypeDocument = gql`
  mutation UpdateCommodityType($id: ID!, $data: editCommodityTypeInput) {
    updateCommodityType(input: { where: { id: $id }, data: $data }) {
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
export type UpdateCommodityTypeMutationFn = Apollo.MutationFunction<
  Types.UpdateCommodityTypeMutation,
  Types.UpdateCommodityTypeMutationVariables
>
export function useUpdateCommodityTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateCommodityTypeMutation,
    Types.UpdateCommodityTypeMutationVariables
  >
) {
  return Apollo.useMutation<Types.UpdateCommodityTypeMutation, Types.UpdateCommodityTypeMutationVariables>(
    UpdateCommodityTypeDocument,
    baseOptions
  )
}
export type UpdateCommodityTypeMutationHookResult = ReturnType<typeof useUpdateCommodityTypeMutation>
export type UpdateCommodityTypeMutationResult = Apollo.MutationResult<Types.UpdateCommodityTypeMutation>
export type UpdateCommodityTypeMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateCommodityTypeMutation,
  Types.UpdateCommodityTypeMutationVariables
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
  query Warehouses($limit: Int, $start: Int, $where: JSON) {
    warehousesConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
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
        count
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
