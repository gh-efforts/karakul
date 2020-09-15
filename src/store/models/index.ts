import { orders, order, orderHistory } from './orders'
import { orderMaterials, orderMaterial, orderMaterialHistory } from './order-material'

import { RootModel } from '../type.d'

export const models: RootModel = { orders, order, orderHistory, orderMaterials, orderMaterial, orderMaterialHistory }
