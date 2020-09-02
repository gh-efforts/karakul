/* eslint-disable camelcase */
//  S for schema

import { OrderCommoditiesQuery } from '../../services'

// 商品零件
export interface SAccessory {
  // 型号
  model?: string
  // 标示
  label?: string
  // 分类名称
  material?: string
  // 流程行为
  action?: number
  // 数量
  amount?: number
}

// 商品属性
export type OrderCommodity = NonNullable<
  NonNullable<NonNullable<OrderCommoditiesQuery['order']>['commodities']>[number]
>
