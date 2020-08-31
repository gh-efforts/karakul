export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
  /** A time string with format: HH:mm:ss.SSS */
  Time: any
  /** The `Long` scalar type represents 52-bit integers */
  Long: any
}

export type Query = {
  material?: Maybe<Material>
  materials?: Maybe<Array<Maybe<Material>>>
  materialsConnection?: Maybe<MaterialConnection>
  orderHistory?: Maybe<OrderHistory>
  orderHistories?: Maybe<Array<Maybe<OrderHistory>>>
  orderHistoriesConnection?: Maybe<OrderHistoryConnection>
  orderMaterialHistory?: Maybe<OrderMaterialHistory>
  orderMaterialHistories?: Maybe<Array<Maybe<OrderMaterialHistory>>>
  orderMaterialHistoriesConnection?: Maybe<OrderMaterialHistoryConnection>
  orderMaterial?: Maybe<OrderMaterial>
  orderMaterials?: Maybe<Array<Maybe<OrderMaterial>>>
  orderMaterialsConnection?: Maybe<OrderMaterialConnection>
  order?: Maybe<Order>
  orders?: Maybe<Array<Maybe<Order>>>
  ordersConnection?: Maybe<OrderConnection>
  files?: Maybe<Array<Maybe<UploadFile>>>
  filesConnection?: Maybe<UploadFileConnection>
  role?: Maybe<UsersPermissionsRole>
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>
  user?: Maybe<UsersPermissionsUser>
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>
  usersConnection?: Maybe<UsersPermissionsUserConnection>
  me?: Maybe<UsersPermissionsMe>
}

export type QueryMaterialArgs = {
  id: Scalars['ID']
}

export type QueryMaterialsArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryMaterialsConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrderHistoryArgs = {
  id: Scalars['ID']
}

export type QueryOrderHistoriesArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrderHistoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrderMaterialHistoryArgs = {
  id: Scalars['ID']
}

export type QueryOrderMaterialHistoriesArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrderMaterialHistoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrderMaterialArgs = {
  id: Scalars['ID']
}

export type QueryOrderMaterialsArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrderMaterialsConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrderArgs = {
  id: Scalars['ID']
}

export type QueryOrdersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryOrdersConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryRoleArgs = {
  id: Scalars['ID']
}

export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type Material = {
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  name?: Maybe<Scalars['String']>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
}

export type AdminUser = {
  id: Scalars['ID']
  username?: Maybe<Scalars['String']>
}

export type MaterialConnection = {
  values?: Maybe<Array<Maybe<Material>>>
  groupBy?: Maybe<MaterialGroupBy>
  aggregate?: Maybe<MaterialAggregator>
}

export type MaterialGroupBy = {
  id?: Maybe<Array<Maybe<MaterialConnectionId>>>
  created_at?: Maybe<Array<Maybe<MaterialConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<MaterialConnectionUpdated_At>>>
  name?: Maybe<Array<Maybe<MaterialConnectionName>>>
  created_by?: Maybe<Array<Maybe<MaterialConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<MaterialConnectionUpdated_By>>>
}

export type MaterialConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<MaterialConnection>
}

export type MaterialConnectionCreated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<MaterialConnection>
}

export type MaterialConnectionUpdated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<MaterialConnection>
}

export type MaterialConnectionName = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<MaterialConnection>
}

export type MaterialConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<MaterialConnection>
}

export type MaterialConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<MaterialConnection>
}

export type MaterialAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type OrderHistory = {
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  order_id?: Maybe<Scalars['Int']>
  detail?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  delivery_time?: Maybe<Scalars['Date']>
  user?: Maybe<UsersPermissionsUser>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
}

export type UsersPermissionsUser = {
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  username: Scalars['String']
  email: Scalars['String']
  provider?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<UsersPermissionsRole>
  avatar?: Maybe<Scalars['String']>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
}

export type UsersPermissionsRole = {
  id: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>
}

export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UsersPermissionsPermission = {
  id: Scalars['ID']
  type: Scalars['String']
  controller: Scalars['String']
  action: Scalars['String']
  enabled: Scalars['Boolean']
  policy?: Maybe<Scalars['String']>
  role?: Maybe<UsersPermissionsRole>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
}

export type OrderHistoryConnection = {
  values?: Maybe<Array<Maybe<OrderHistory>>>
  groupBy?: Maybe<OrderHistoryGroupBy>
  aggregate?: Maybe<OrderHistoryAggregator>
}

export type OrderHistoryGroupBy = {
  id?: Maybe<Array<Maybe<OrderHistoryConnectionId>>>
  created_at?: Maybe<Array<Maybe<OrderHistoryConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<OrderHistoryConnectionUpdated_At>>>
  order_id?: Maybe<Array<Maybe<OrderHistoryConnectionOrder_Id>>>
  detail?: Maybe<Array<Maybe<OrderHistoryConnectionDetail>>>
  amount?: Maybe<Array<Maybe<OrderHistoryConnectionAmount>>>
  delivery_time?: Maybe<Array<Maybe<OrderHistoryConnectionDelivery_Time>>>
  user?: Maybe<Array<Maybe<OrderHistoryConnectionUser>>>
  created_by?: Maybe<Array<Maybe<OrderHistoryConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<OrderHistoryConnectionUpdated_By>>>
}

export type OrderHistoryConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionCreated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionUpdated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionOrder_Id = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionDetail = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionAmount = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionDelivery_Time = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionUser = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderHistoryConnection>
}

export type OrderHistoryAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
  sum?: Maybe<OrderHistoryAggregatorSum>
  avg?: Maybe<OrderHistoryAggregatorAvg>
  min?: Maybe<OrderHistoryAggregatorMin>
  max?: Maybe<OrderHistoryAggregatorMax>
}

export type OrderHistoryAggregatorSum = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderHistoryAggregatorAvg = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderHistoryAggregatorMin = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderHistoryAggregatorMax = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterialHistory = {
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  order_id?: Maybe<Scalars['Int']>
  material?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  model?: Maybe<Scalars['String']>
  user?: Maybe<UsersPermissionsUser>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
}

export type OrderMaterialHistoryConnection = {
  values?: Maybe<Array<Maybe<OrderMaterialHistory>>>
  groupBy?: Maybe<OrderMaterialHistoryGroupBy>
  aggregate?: Maybe<OrderMaterialHistoryAggregator>
}

export type OrderMaterialHistoryGroupBy = {
  id?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionId>>>
  created_at?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionUpdated_At>>>
  order_id?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionOrder_Id>>>
  material?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionMaterial>>>
  amount?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionAmount>>>
  model?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionModel>>>
  user?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionUser>>>
  created_by?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<OrderMaterialHistoryConnectionUpdated_By>>>
}

export type OrderMaterialHistoryConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionCreated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionUpdated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionOrder_Id = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionMaterial = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionAmount = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionModel = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionUser = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialHistoryConnection>
}

export type OrderMaterialHistoryAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
  sum?: Maybe<OrderMaterialHistoryAggregatorSum>
  avg?: Maybe<OrderMaterialHistoryAggregatorAvg>
  min?: Maybe<OrderMaterialHistoryAggregatorMin>
  max?: Maybe<OrderMaterialHistoryAggregatorMax>
}

export type OrderMaterialHistoryAggregatorSum = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterialHistoryAggregatorAvg = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterialHistoryAggregatorMin = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterialHistoryAggregatorMax = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterial = {
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  order_id?: Maybe<Scalars['Int']>
  material?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  model?: Maybe<Scalars['String']>
  user?: Maybe<UsersPermissionsUser>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
}

export type OrderMaterialConnection = {
  values?: Maybe<Array<Maybe<OrderMaterial>>>
  groupBy?: Maybe<OrderMaterialGroupBy>
  aggregate?: Maybe<OrderMaterialAggregator>
}

export type OrderMaterialGroupBy = {
  id?: Maybe<Array<Maybe<OrderMaterialConnectionId>>>
  created_at?: Maybe<Array<Maybe<OrderMaterialConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<OrderMaterialConnectionUpdated_At>>>
  order_id?: Maybe<Array<Maybe<OrderMaterialConnectionOrder_Id>>>
  material?: Maybe<Array<Maybe<OrderMaterialConnectionMaterial>>>
  amount?: Maybe<Array<Maybe<OrderMaterialConnectionAmount>>>
  model?: Maybe<Array<Maybe<OrderMaterialConnectionModel>>>
  user?: Maybe<Array<Maybe<OrderMaterialConnectionUser>>>
  created_by?: Maybe<Array<Maybe<OrderMaterialConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<OrderMaterialConnectionUpdated_By>>>
}

export type OrderMaterialConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionCreated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionUpdated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionOrder_Id = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionMaterial = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionAmount = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionModel = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionUser = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderMaterialConnection>
}

export type OrderMaterialAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
  sum?: Maybe<OrderMaterialAggregatorSum>
  avg?: Maybe<OrderMaterialAggregatorAvg>
  min?: Maybe<OrderMaterialAggregatorMin>
  max?: Maybe<OrderMaterialAggregatorMax>
}

export type OrderMaterialAggregatorSum = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterialAggregatorAvg = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterialAggregatorMin = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type OrderMaterialAggregatorMax = {
  order_id?: Maybe<Scalars['Float']>
  amount?: Maybe<Scalars['Float']>
}

export type Order = {
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  detail?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  delivery_time?: Maybe<Scalars['Date']>
  user?: Maybe<UsersPermissionsUser>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
}

export type OrderConnection = {
  values?: Maybe<Array<Maybe<Order>>>
  groupBy?: Maybe<OrderGroupBy>
  aggregate?: Maybe<OrderAggregator>
}

export type OrderGroupBy = {
  id?: Maybe<Array<Maybe<OrderConnectionId>>>
  created_at?: Maybe<Array<Maybe<OrderConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<OrderConnectionUpdated_At>>>
  detail?: Maybe<Array<Maybe<OrderConnectionDetail>>>
  amount?: Maybe<Array<Maybe<OrderConnectionAmount>>>
  delivery_time?: Maybe<Array<Maybe<OrderConnectionDelivery_Time>>>
  user?: Maybe<Array<Maybe<OrderConnectionUser>>>
  created_by?: Maybe<Array<Maybe<OrderConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<OrderConnectionUpdated_By>>>
}

export type OrderConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionCreated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionUpdated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionDetail = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionAmount = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionDelivery_Time = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionUser = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderConnection>
}

export type OrderConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<OrderConnection>
}

export type OrderAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
  sum?: Maybe<OrderAggregatorSum>
  avg?: Maybe<OrderAggregatorAvg>
  min?: Maybe<OrderAggregatorMin>
  max?: Maybe<OrderAggregatorMax>
}

export type OrderAggregatorSum = {
  amount?: Maybe<Scalars['Float']>
}

export type OrderAggregatorAvg = {
  amount?: Maybe<Scalars['Float']>
}

export type OrderAggregatorMin = {
  amount?: Maybe<Scalars['Float']>
}

export type OrderAggregatorMax = {
  amount?: Maybe<Scalars['Float']>
}

export type UploadFile = {
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  name: Scalars['String']
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  ext?: Maybe<Scalars['String']>
  mime: Scalars['String']
  size: Scalars['Float']
  url: Scalars['String']
  httpUrl: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  created_by?: Maybe<AdminUser>
  updated_by?: Maybe<AdminUser>
  related?: Maybe<Array<Maybe<Morph>>>
}

export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type Morph =
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsLoginPayload
  | UserPermissionsPasswordPayload
  | Material
  | MaterialConnection
  | MaterialAggregator
  | MaterialGroupBy
  | MaterialConnectionId
  | MaterialConnectionCreated_At
  | MaterialConnectionUpdated_At
  | MaterialConnectionName
  | MaterialConnectionCreated_By
  | MaterialConnectionUpdated_By
  | CreateMaterialPayload
  | UpdateMaterialPayload
  | DeleteMaterialPayload
  | OrderHistory
  | OrderHistoryConnection
  | OrderHistoryAggregator
  | OrderHistoryAggregatorSum
  | OrderHistoryAggregatorAvg
  | OrderHistoryAggregatorMin
  | OrderHistoryAggregatorMax
  | OrderHistoryGroupBy
  | OrderHistoryConnectionId
  | OrderHistoryConnectionCreated_At
  | OrderHistoryConnectionUpdated_At
  | OrderHistoryConnectionOrder_Id
  | OrderHistoryConnectionDetail
  | OrderHistoryConnectionAmount
  | OrderHistoryConnectionDelivery_Time
  | OrderHistoryConnectionUser
  | OrderHistoryConnectionCreated_By
  | OrderHistoryConnectionUpdated_By
  | CreateOrderHistoryPayload
  | UpdateOrderHistoryPayload
  | DeleteOrderHistoryPayload
  | OrderMaterialHistory
  | OrderMaterialHistoryConnection
  | OrderMaterialHistoryAggregator
  | OrderMaterialHistoryAggregatorSum
  | OrderMaterialHistoryAggregatorAvg
  | OrderMaterialHistoryAggregatorMin
  | OrderMaterialHistoryAggregatorMax
  | OrderMaterialHistoryGroupBy
  | OrderMaterialHistoryConnectionId
  | OrderMaterialHistoryConnectionCreated_At
  | OrderMaterialHistoryConnectionUpdated_At
  | OrderMaterialHistoryConnectionOrder_Id
  | OrderMaterialHistoryConnectionMaterial
  | OrderMaterialHistoryConnectionAmount
  | OrderMaterialHistoryConnectionModel
  | OrderMaterialHistoryConnectionUser
  | OrderMaterialHistoryConnectionCreated_By
  | OrderMaterialHistoryConnectionUpdated_By
  | CreateOrderMaterialHistoryPayload
  | UpdateOrderMaterialHistoryPayload
  | DeleteOrderMaterialHistoryPayload
  | OrderMaterial
  | OrderMaterialConnection
  | OrderMaterialAggregator
  | OrderMaterialAggregatorSum
  | OrderMaterialAggregatorAvg
  | OrderMaterialAggregatorMin
  | OrderMaterialAggregatorMax
  | OrderMaterialGroupBy
  | OrderMaterialConnectionId
  | OrderMaterialConnectionCreated_At
  | OrderMaterialConnectionUpdated_At
  | OrderMaterialConnectionOrder_Id
  | OrderMaterialConnectionMaterial
  | OrderMaterialConnectionAmount
  | OrderMaterialConnectionModel
  | OrderMaterialConnectionUser
  | OrderMaterialConnectionCreated_By
  | OrderMaterialConnectionUpdated_By
  | CreateOrderMaterialPayload
  | UpdateOrderMaterialPayload
  | DeleteOrderMaterialPayload
  | Order
  | OrderConnection
  | OrderAggregator
  | OrderAggregatorSum
  | OrderAggregatorAvg
  | OrderAggregatorMin
  | OrderAggregatorMax
  | OrderGroupBy
  | OrderConnectionId
  | OrderConnectionCreated_At
  | OrderConnectionUpdated_At
  | OrderConnectionDetail
  | OrderConnectionAmount
  | OrderConnectionDelivery_Time
  | OrderConnectionUser
  | OrderConnectionCreated_By
  | OrderConnectionUpdated_By
  | CreateOrderPayload
  | UpdateOrderPayload
  | DeleteOrderPayload
  | UploadFile
  | UploadFileConnection
  | UploadFileAggregator
  | UploadFileAggregatorSum
  | UploadFileAggregatorAvg
  | UploadFileAggregatorMin
  | UploadFileAggregatorMax
  | UploadFileGroupBy
  | UploadFileConnectionId
  | UploadFileConnectionCreated_At
  | UploadFileConnectionUpdated_At
  | UploadFileConnectionName
  | UploadFileConnectionAlternativeText
  | UploadFileConnectionCaption
  | UploadFileConnectionWidth
  | UploadFileConnectionHeight
  | UploadFileConnectionFormats
  | UploadFileConnectionHash
  | UploadFileConnectionExt
  | UploadFileConnectionMime
  | UploadFileConnectionSize
  | UploadFileConnectionUrl
  | UploadFileConnectionHttpUrl
  | UploadFileConnectionPreviewUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | UploadFileConnectionCreated_By
  | UploadFileConnectionUpdated_By
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionType
  | UsersPermissionsRoleConnectionCreated_By
  | UsersPermissionsRoleConnectionUpdated_By
  | CreateRolePayload
  | UpdateRolePayload
  | DeleteRolePayload
  | UsersPermissionsUser
  | UsersPermissionsUserConnection
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserGroupBy
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionCreated_At
  | UsersPermissionsUserConnectionUpdated_At
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionRole
  | UsersPermissionsUserConnectionAvatar
  | UsersPermissionsUserConnectionCreated_By
  | UsersPermissionsUserConnectionUpdated_By
  | CreateUserPayload
  | UpdateUserPayload
  | DeleteUserPayload

export type UsersPermissionsMe = {
  id: Scalars['ID']
  username: Scalars['String']
  email: Scalars['String']
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<UsersPermissionsMeRole>
}

export type UsersPermissionsMeRole = {
  id: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type UsersPermissionsLoginPayload = {
  jwt?: Maybe<Scalars['String']>
  user: UsersPermissionsMe
}

export type UserPermissionsPasswordPayload = {
  ok: Scalars['Boolean']
}

export type CreateMaterialPayload = {
  material?: Maybe<Material>
}

export type UpdateMaterialPayload = {
  material?: Maybe<Material>
}

export type DeleteMaterialPayload = {
  material?: Maybe<Material>
}

export type CreateOrderHistoryPayload = {
  orderHistory?: Maybe<OrderHistory>
}

export type UpdateOrderHistoryPayload = {
  orderHistory?: Maybe<OrderHistory>
}

export type DeleteOrderHistoryPayload = {
  orderHistory?: Maybe<OrderHistory>
}

export type CreateOrderMaterialHistoryPayload = {
  orderMaterialHistory?: Maybe<OrderMaterialHistory>
}

export type UpdateOrderMaterialHistoryPayload = {
  orderMaterialHistory?: Maybe<OrderMaterialHistory>
}

export type DeleteOrderMaterialHistoryPayload = {
  orderMaterialHistory?: Maybe<OrderMaterialHistory>
}

export type CreateOrderMaterialPayload = {
  orderMaterial?: Maybe<OrderMaterial>
}

export type UpdateOrderMaterialPayload = {
  orderMaterial?: Maybe<OrderMaterial>
}

export type DeleteOrderMaterialPayload = {
  orderMaterial?: Maybe<OrderMaterial>
}

export type CreateOrderPayload = {
  order?: Maybe<Order>
}

export type UpdateOrderPayload = {
  order?: Maybe<Order>
}

export type DeleteOrderPayload = {
  order?: Maybe<Order>
}

export type UploadFileConnection = {
  values?: Maybe<Array<Maybe<UploadFile>>>
  groupBy?: Maybe<UploadFileGroupBy>
  aggregate?: Maybe<UploadFileAggregator>
}

export type UploadFileGroupBy = {
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>
  httpUrl?: Maybe<Array<Maybe<UploadFileConnectionHttpUrl>>>
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>
  created_by?: Maybe<Array<Maybe<UploadFileConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<UploadFileConnectionUpdated_By>>>
}

export type UploadFileConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionCreated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionUpdated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionName = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionAlternativeText = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionCaption = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionWidth = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionHeight = {
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionFormats = {
  key?: Maybe<Scalars['JSON']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionHash = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionExt = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionMime = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionSize = {
  key?: Maybe<Scalars['Float']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionUrl = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionHttpUrl = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionPreviewUrl = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionProvider = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionProvider_Metadata = {
  key?: Maybe<Scalars['JSON']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
  sum?: Maybe<UploadFileAggregatorSum>
  avg?: Maybe<UploadFileAggregatorAvg>
  min?: Maybe<UploadFileAggregatorMin>
  max?: Maybe<UploadFileAggregatorMax>
}

export type UploadFileAggregatorSum = {
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorAvg = {
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorMin = {
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorMax = {
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UsersPermissionsRoleConnection = {
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>
  aggregate?: Maybe<UsersPermissionsRoleAggregator>
}

export type UsersPermissionsRoleGroupBy = {
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>
  created_by?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionUpdated_By>>>
}

export type UsersPermissionsRoleConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionName = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionDescription = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionType = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type CreateRolePayload = {
  role?: Maybe<UsersPermissionsRole>
}

export type UpdateRolePayload = {
  role?: Maybe<UsersPermissionsRole>
}

export type DeleteRolePayload = {
  role?: Maybe<UsersPermissionsRole>
}

export type UsersPermissionsUserConnection = {
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>
  groupBy?: Maybe<UsersPermissionsUserGroupBy>
  aggregate?: Maybe<UsersPermissionsUserAggregator>
}

export type UsersPermissionsUserGroupBy = {
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>
  avatar?: Maybe<Array<Maybe<UsersPermissionsUserConnectionAvatar>>>
  created_by?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_By>>>
  updated_by?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_By>>>
}

export type UsersPermissionsUserConnectionId = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionCreated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionUpdated_At = {
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionUsername = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionEmail = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionProvider = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionConfirmed = {
  key?: Maybe<Scalars['Boolean']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionBlocked = {
  key?: Maybe<Scalars['Boolean']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionRole = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionAvatar = {
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionCreated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionUpdated_By = {
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserAggregator = {
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type CreateUserPayload = {
  user?: Maybe<UsersPermissionsUser>
}

export type UpdateUserPayload = {
  user?: Maybe<UsersPermissionsUser>
}

export type DeleteUserPayload = {
  user?: Maybe<UsersPermissionsUser>
}

export type Mutation = {
  createMaterial?: Maybe<CreateMaterialPayload>
  updateMaterial?: Maybe<UpdateMaterialPayload>
  deleteMaterial?: Maybe<DeleteMaterialPayload>
  createOrderHistory?: Maybe<CreateOrderHistoryPayload>
  updateOrderHistory?: Maybe<UpdateOrderHistoryPayload>
  deleteOrderHistory?: Maybe<DeleteOrderHistoryPayload>
  createOrderMaterialHistory?: Maybe<CreateOrderMaterialHistoryPayload>
  updateOrderMaterialHistory?: Maybe<UpdateOrderMaterialHistoryPayload>
  deleteOrderMaterialHistory?: Maybe<DeleteOrderMaterialHistoryPayload>
  createOrderMaterial?: Maybe<CreateOrderMaterialPayload>
  updateOrderMaterial?: Maybe<UpdateOrderMaterialPayload>
  deleteOrderMaterial?: Maybe<DeleteOrderMaterialPayload>
  createOrder?: Maybe<CreateOrderPayload>
  updateOrder?: Maybe<UpdateOrderPayload>
  deleteOrder?: Maybe<DeleteOrderPayload>
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>
  upload: UploadFile
  multipleUpload: Array<Maybe<UploadFile>>
  login: UsersPermissionsLoginPayload
  register: UsersPermissionsLoginPayload
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
}

export type MutationCreateMaterialArgs = {
  input?: Maybe<CreateMaterialInput>
}

export type MutationUpdateMaterialArgs = {
  input?: Maybe<UpdateMaterialInput>
}

export type MutationDeleteMaterialArgs = {
  input?: Maybe<DeleteMaterialInput>
}

export type MutationCreateOrderHistoryArgs = {
  input?: Maybe<CreateOrderHistoryInput>
}

export type MutationUpdateOrderHistoryArgs = {
  input?: Maybe<UpdateOrderHistoryInput>
}

export type MutationDeleteOrderHistoryArgs = {
  input?: Maybe<DeleteOrderHistoryInput>
}

export type MutationCreateOrderMaterialHistoryArgs = {
  input?: Maybe<CreateOrderMaterialHistoryInput>
}

export type MutationUpdateOrderMaterialHistoryArgs = {
  input?: Maybe<UpdateOrderMaterialHistoryInput>
}

export type MutationDeleteOrderMaterialHistoryArgs = {
  input?: Maybe<DeleteOrderMaterialHistoryInput>
}

export type MutationCreateOrderMaterialArgs = {
  input?: Maybe<CreateOrderMaterialInput>
}

export type MutationUpdateOrderMaterialArgs = {
  input?: Maybe<UpdateOrderMaterialInput>
}

export type MutationDeleteOrderMaterialArgs = {
  input?: Maybe<DeleteOrderMaterialInput>
}

export type MutationCreateOrderArgs = {
  input?: Maybe<CreateOrderInput>
}

export type MutationUpdateOrderArgs = {
  input?: Maybe<UpdateOrderInput>
}

export type MutationDeleteOrderArgs = {
  input?: Maybe<DeleteOrderInput>
}

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>
}

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>
}

export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>
}

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
}

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>
}

export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>
}

export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>
  ref?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  file: Scalars['Upload']
}

export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>
  ref?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  files: Array<Maybe<Scalars['Upload']>>
}

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
}

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationResetPasswordArgs = {
  password: Scalars['String']
  passwordConfirmation: Scalars['String']
  code: Scalars['String']
}

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']
}

export type CreateMaterialInput = {
  data?: Maybe<MaterialInput>
}

export type MaterialInput = {
  name?: Maybe<Scalars['String']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UpdateMaterialInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditMaterialInput>
}

export type InputId = {
  id: Scalars['ID']
}

export type EditMaterialInput = {
  name?: Maybe<Scalars['String']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteMaterialInput = {
  where?: Maybe<InputId>
}

export type CreateOrderHistoryInput = {
  data?: Maybe<OrderHistoryInput>
}

export type OrderHistoryInput = {
  order_id?: Maybe<Scalars['Int']>
  detail?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  delivery_time?: Maybe<Scalars['Date']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UpdateOrderHistoryInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditOrderHistoryInput>
}

export type EditOrderHistoryInput = {
  order_id?: Maybe<Scalars['Int']>
  detail?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  delivery_time?: Maybe<Scalars['Date']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteOrderHistoryInput = {
  where?: Maybe<InputId>
}

export type CreateOrderMaterialHistoryInput = {
  data?: Maybe<OrderMaterialHistoryInput>
}

export type OrderMaterialHistoryInput = {
  order_id?: Maybe<Scalars['Int']>
  material?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  model?: Maybe<Scalars['String']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UpdateOrderMaterialHistoryInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditOrderMaterialHistoryInput>
}

export type EditOrderMaterialHistoryInput = {
  order_id?: Maybe<Scalars['Int']>
  material?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  model?: Maybe<Scalars['String']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteOrderMaterialHistoryInput = {
  where?: Maybe<InputId>
}

export type CreateOrderMaterialInput = {
  data?: Maybe<OrderMaterialInput>
}

export type OrderMaterialInput = {
  order_id?: Maybe<Scalars['Int']>
  material?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  model?: Maybe<Scalars['String']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UpdateOrderMaterialInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditOrderMaterialInput>
}

export type EditOrderMaterialInput = {
  order_id?: Maybe<Scalars['Int']>
  material?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  model?: Maybe<Scalars['String']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteOrderMaterialInput = {
  where?: Maybe<InputId>
}

export type CreateOrderInput = {
  data?: Maybe<OrderInput>
}

export type OrderInput = {
  detail?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  delivery_time?: Maybe<Scalars['Date']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UpdateOrderInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditOrderInput>
}

export type EditOrderInput = {
  detail?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['Int']>
  delivery_time?: Maybe<Scalars['Date']>
  user?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteOrderInput = {
  where?: Maybe<InputId>
}

export type CreateRoleInput = {
  data?: Maybe<RoleInput>
}

export type RoleInput = {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>
  users?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UpdateRoleInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditRoleInput>
}

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>
  users?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteRoleInput = {
  where?: Maybe<InputId>
}

export type CreateUserInput = {
  data?: Maybe<UserInput>
}

export type UserInput = {
  username: Scalars['String']
  email: Scalars['String']
  provider?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  resetPasswordToken?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<Scalars['ID']>
  avatar?: Maybe<Scalars['String']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type UpdateUserInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditUserInput>
}

export type EditUserInput = {
  username?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  resetPasswordToken?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<Scalars['ID']>
  avatar?: Maybe<Scalars['String']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteUserInput = {
  where?: Maybe<InputId>
}

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']
  password: Scalars['String']
  provider?: Maybe<Scalars['String']>
}

export type UsersPermissionsRegisterInput = {
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type FileInput = {
  name: Scalars['String']
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  ext?: Maybe<Scalars['String']>
  mime: Scalars['String']
  size: Scalars['Float']
  url: Scalars['String']
  httpUrl: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditFileInput = {
  name?: Maybe<Scalars['String']>
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  formats?: Maybe<Scalars['JSON']>
  hash?: Maybe<Scalars['String']>
  ext?: Maybe<Scalars['String']>
  mime?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  url?: Maybe<Scalars['String']>
  httpUrl?: Maybe<Scalars['String']>
  previewUrl?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}
