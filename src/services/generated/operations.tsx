import * as Types from './schemas'

export type CommoditiesQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type CommoditiesQuery = {
  commodities?: Types.Maybe<Array<Types.Maybe<Pick<Types.Commodity, 'id' | 'accessories'>>>>
}

export type CreateCommodityMutationVariables = Types.Exact<{
  data?: Types.Maybe<Types.CommodityInput>
}>

export type CreateCommodityMutation = { res?: Types.Maybe<{ commodity?: Types.Maybe<Pick<Types.Commodity, 'id'>> }> }

export type CommodityTypesSelectQueryVariables = Types.Exact<{ [key: string]: never }>

export type CommodityTypesSelectQuery = {
  types?: Types.Maybe<Array<Types.Maybe<Pick<Types.CommodityType, 'id' | 'name'>>>>
}

export type WarehousesSelectQueryVariables = Types.Exact<{ [key: string]: never }>

export type WarehousesSelectQuery = { pos?: Types.Maybe<Array<Types.Maybe<Pick<Types.Warehouse, 'id' | 'name'>>>> }

export type GoodsOrdersQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type GoodsOrdersQuery = {
  orders?: Types.Maybe<{
    values?: Types.Maybe<Array<Types.Maybe<Pick<Types.Order, 'id' | 'name'>>>>
    aggregate?: Types.Maybe<Pick<Types.OrderAggregator, 'count' | 'totalCount'>>
  }>
}

export type OrderCommoditiesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type OrderCommoditiesQuery = {
  order?: Types.Maybe<
    Pick<Types.Order, 'id'> & {
      commodities?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<Types.Commodity, 'id' | 'createdAt' | 'accessories'> & {
              commodity_type?: Types.Maybe<Pick<Types.CommodityType, 'id' | 'name'>>
              warehouse?: Types.Maybe<Pick<Types.Warehouse, 'name' | 'id'>>
              user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'username'>>
            }
          >
        >
      >
    }
  >
}

export type OrderHistoryFragment = Pick<
  Types.OrderMaterialHistory,
  'id' | 'createdAt' | 'updatedAt' | 'remark' | 'attachment_desc' | 'content'
> & {
  order_id?: Types.Maybe<Pick<Types.Material, 'id'>>
  user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'username'>>
}

export type OmHrysQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type OmHrysQuery = { hrys?: Types.Maybe<Array<Types.Maybe<OrderHistoryFragment>>> }

export type OmHryQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type OmHryQuery = { hry?: Types.Maybe<OrderHistoryFragment> }

export type OrderMaterialsQueryVariables = Types.Exact<{
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
  sort?: Types.Maybe<Types.Scalars['String']>
}>

export type OrderMaterialsQuery = {
  orderMaterials?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.OrderMaterial, 'id' | 'createdAt' | 'updatedAt' | 'material' | 'amount' | 'model'> & {
          order_id?: Types.Maybe<Pick<Types.Order, 'id'>>
          user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
        }
      >
    >
  >
}

export type MaterialsQueryVariables = Types.Exact<{ [key: string]: never }>

export type MaterialsQuery = { materials?: Types.Maybe<Array<Types.Maybe<Pick<Types.Material, 'id' | 'name'>>>> }

export type OrderFragment = Pick<
  Types.Order,
  'id' | 'name' | 'createdAt' | 'updatedAt' | 'detail' | 'amount' | 'delivery_time'
> & { user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'username'>> }

export type OrdersQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type OrdersQuery = { orders?: Types.Maybe<Array<Types.Maybe<OrderFragment>>> }

export type OrderQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type OrderQuery = { order?: Types.Maybe<OrderFragment> }

export type OrdersConnectionQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type OrdersConnectionQuery = {
  ordersConnection?: Types.Maybe<{
    values?: Types.Maybe<Array<Types.Maybe<OrderFragment>>>
    aggregate?: Types.Maybe<Pick<Types.OrderAggregator, 'count' | 'totalCount'>>
  }>
}

export type CreateOrderMutationVariables = Types.Exact<{
  data?: Types.Maybe<Types.OrderInput>
}>

export type CreateOrderMutation = { createOrder?: Types.Maybe<{ order?: Types.Maybe<OrderFragment> }> }

export type UpdateOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
  data?: Types.Maybe<Types.EditOrderInput>
}>

export type UpdateOrderMutation = { updateOrder?: Types.Maybe<{ order?: Types.Maybe<OrderFragment> }> }

export type OrderHistoriesConnectionQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type OrderHistoriesConnectionQuery = {
  orderHistoriesConnection?: Types.Maybe<{
    values?: Types.Maybe<
      Array<
        Types.Maybe<
          Pick<Types.OrderHistory, 'id' | 'createdAt' | 'updatedAt' | 'detail' | 'amount' | 'delivery_time'> & {
            order?: Types.Maybe<Pick<Types.Order, 'id' | 'name'>>
            user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'username'>>
          }
        >
      >
    >
    aggregate?: Types.Maybe<Pick<Types.OrderHistoryAggregator, 'count' | 'totalCount'>>
  }>
}

export type CommodityTypesQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type CommodityTypesQuery = {
  commodityTypesConnection?: Types.Maybe<{
    values?: Types.Maybe<
      Array<
        Types.Maybe<
          Pick<Types.CommodityType, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
            user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
          }
        >
      >
    >
    aggregate?: Types.Maybe<Pick<Types.CommodityTypeAggregator, 'totalCount'>>
  }>
}

export type CreateCommodityTypeMutationVariables = Types.Exact<{
  data?: Types.Maybe<Types.CommodityTypeInput>
}>

export type CreateCommodityTypeMutation = {
  createCommodityType?: Types.Maybe<{
    commodityType?: Types.Maybe<
      Pick<Types.CommodityType, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
        user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
      }
    >
  }>
}

export type DeleteCommodityTypeMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type DeleteCommodityTypeMutation = {
  deleteCommodityType?: Types.Maybe<{
    commodityType?: Types.Maybe<
      Pick<Types.CommodityType, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
        user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
      }
    >
  }>
}

export type WarehousesQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type WarehousesQuery = {
  warehousesConnection?: Types.Maybe<{
    values?: Types.Maybe<
      Array<
        Types.Maybe<
          Pick<Types.Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
            user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
          }
        >
      >
    >
    aggregate?: Types.Maybe<Pick<Types.WarehouseAggregator, 'totalCount'>>
  }>
}

export type CreateWarehouseMutationVariables = Types.Exact<{
  data?: Types.Maybe<Types.WarehouseInput>
}>

export type CreateWarehouseMutation = {
  createWarehouse?: Types.Maybe<{
    warehouse?: Types.Maybe<
      Pick<Types.Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
        user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
      }
    >
  }>
}

export type DeleteWarehouseMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type DeleteWarehouseMutation = {
  deleteWarehouse?: Types.Maybe<{
    warehouse?: Types.Maybe<
      Pick<Types.Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
        user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
      }
    >
  }>
}

export type UpdateWarehouseMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
  data?: Types.Maybe<Types.EditWarehouseInput>
}>

export type UpdateWarehouseMutation = {
  updateWarehouse?: Types.Maybe<{
    warehouse?: Types.Maybe<
      Pick<Types.Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
        user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
      }
    >
  }>
}
