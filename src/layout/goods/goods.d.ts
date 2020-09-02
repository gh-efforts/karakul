/* eslint-disable camelcase */
//  S for schema

import { OrderCommoditiesQuery, Order } from '../../services'

// 商品零件
export interface SAccessory {
  id?: string
  // 配件编号
  sn?: string
  // 型号
  model?: string
  // 标示
  label?: string
  // 分类名称
  material?: {
    id?: string
    name?: string
  }
  // 流程行为 操作
  action?: number
  // 数量
  amount?: number
}

// 商品属性
export type OrderCommodity = NonNullable<
  NonNullable<NonNullable<OrderCommoditiesQuery['order']>['commodities']>[number]
>

export type GoodsOrder = Pick<Order, 'id' | 'name'>
