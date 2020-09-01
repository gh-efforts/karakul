import * as Types from './schemas'

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

export type OrderFragment = Pick<
  Types.Order,
  'id' | 'createdAt' | 'updatedAt' | 'detail' | 'amount' | 'delivery_time'
> & {
  created_by?: Types.Maybe<Pick<Types.AdminUser, 'username'>>
  updated_by?: Types.Maybe<Pick<Types.AdminUser, 'username'>>
}

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

export type WarehousesQueryVariables = Types.Exact<{
  sort?: Types.Maybe<Types.Scalars['String']>
  limit?: Types.Maybe<Types.Scalars['Int']>
  start?: Types.Maybe<Types.Scalars['Int']>
  where?: Types.Maybe<Types.Scalars['JSON']>
}>

export type WarehousesQuery = {
  warehouses?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'name'> & {
          user?: Types.Maybe<Pick<Types.UsersPermissionsUser, 'id' | 'username'>>
        }
      >
    >
  >
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
