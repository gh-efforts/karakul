import { Models, RematchDispatch, RematchRootState } from '@rematch/core'

import {
  OrderFragment,
  OrdersConnectionQuery,
  OrderMaterial,
  OrderMaterialsConnectionQuery,
  OrderMaterialHistory,
} from '../services'

import { orders, order, orderHistory } from './models/orders'
import { orderMaterials, orderMaterial, orderMaterialHistory } from './models/order-material'

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
