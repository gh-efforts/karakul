import { Models, RematchDispatch, RematchRootState } from '@rematch/core'

import {
  OrderFragment,
  OrdersConnectionQuery,
  OrderMaterial,
  OrderMaterialsConnectionQuery,
  OrderMaterialHistory,
  OrderCommoditiesQuery,
  Order,
  OrderCommoditiesSimpleQuery,
} from '../services'

import { orders, order, orderHistory } from './models/orders'
import { orderMaterials, orderMaterial, orderMaterialHistory } from './models/order-material'
import { goods, commodity, exwarehouse } from './models/goods'

export interface Pagination {
  page: number
  size?: number
}

export interface Connection<T> {
  data: T[]
  total: number
}

export type PaginationConnection<T> = Pagination & Connection<T>

// global
export interface RootModel extends Models<RootModel> {
  orders: typeof orders
  order: typeof order
  orderHistory: typeof orderHistory
  orderMaterials: typeof orderMaterials
  orderMaterial: typeof orderMaterial
  orderMaterialHistory: typeof orderMaterialHistory
  goods: typeof goods
  commodity: typeof commodity
  exwarehouse: typeof exwarehouse
}

export type Store = ReturnType<typeof initStore>
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

// order
export type TOrder = OrderFragment

export type TOrderConnection = NonNullable<OrdersConnectionQuery['order']>

export type TOrderHistories = NonNullable<OrderHistoriesQuery['order']>

// order material
export type OrderMaterialType = Pick<
  OrderMaterial,
  'id' | 'createdAt' | 'updatedAt' | 'material' | 'amount' | 'model'
> & {
  order_id?: string
  user?: {
    id: string
    username: string
  }
}

export type Material = Pick<MaterialsInput, 'id' | 'amount' | 'material' | 'model' | 'action'>

export type OMConnectionType = NonNullable<OrderMaterialsConnectionQuery['orderMaterialsConnection']>

export enum ActionType {
  Increase = 1,
  Return = 2,
  Exchange = 3,
  Create = 4,
}

export const ActionTypeMap = {
  [ActionType.Increase]: '增货',
  [ActionType.Return]: '退货',
  [ActionType.Exchange]: '换货',
  [ActionType.Create]: '新增',
}

// order material history page

export type HistoryInfo = Pick<
  OrderMaterialHistory,
  'id' | 'createdAt' | 'content' | 'updatedAt' | 'remark' | 'user' | 'attachment_desc' | 'attachment' | 'order_id'
>

// goods page

// 商品属性
export type OrderCommodity = NonNullable<
  NonNullable<NonNullable<OrderCommoditiesQuery['order']>['commodities']>[number]
>

export type GoodsOrder = Pick<Order, 'id' | 'name'>

// exwarehouse modal

export type ExWGoodsItem = NonNullable<
  NonNullable<NonNullable<OrderCommoditiesSimpleQuery['commodities']>['values']>[number]
>
