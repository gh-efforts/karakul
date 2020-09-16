import { orders, order, orderHistory } from './orders'
import { orderMaterials, orderMaterial, orderMaterialHistory } from './order-material'
import { goods, commodity, exwarehouse, exwarehouseHistory, inwarehouse } from './goods'

import { goodsType } from './goods-type'
import { goodsWarehouse, warehouse } from './goods-warehouse'

import { RootModel } from '../type.d'

export const models: RootModel = {
  orders,
  order,
  orderHistory,
  orderMaterials,
  orderMaterial,
  orderMaterialHistory,
  goods,
  commodity,
  exwarehouse,
  exwarehouseHistory,
  inwarehouse,
  goodsType,
  goodsWarehouse,
  warehouse,
}
