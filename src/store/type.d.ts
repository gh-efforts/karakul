import { Models, RematchDispatch, RematchRootState } from '@rematch/core'

import { OrderFragment, OrdersConnectionQuery } from '../services'

import { orders } from './models/orders'

// global
export interface RootModel extends Models<RootModel> {
  orders: typeof orders
}

export type Store = ReturnType<typeof initStore>
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

// order
export type TOrder = OrderFragment

export type TOrderConnection = NonNullable<OrdersConnectionQuery['order']>

export interface Pagination {
  page: number
  size?: number
}

export interface Connection<T> {
  data: T[]
  total: number
}

export type PaginationConnection<T> = Pagination & Connection<T>
