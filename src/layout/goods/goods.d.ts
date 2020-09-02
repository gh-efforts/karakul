/* eslint-disable camelcase */
//  S for schema

// 商品零件
export interface SAccessory {
  // 配件编号
  id?: string
  // 型号
  type?: string
  // 标示
  label?: string
  // 分类名称
  mName?: string
  // 分类 id
  mId?: string
}

// 商品属性
export interface SAccessorie {
  id?: string
  commodity_type?: string
  warehouse?: string
  accessories?: SAccessory[]
}
