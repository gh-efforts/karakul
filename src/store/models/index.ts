import { orders, order, orderHistory } from './orders'
import { orderMaterials, orderMaterial, orderMaterialHistory } from './order-material'
import { goods, commodity, exwarehouse } from './goods'

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
}
