import { MaterialsInput, OrderMaterial } from '../../../services'
export type Material = Pick<MaterialsInput, 'id' | 'amount' | 'material' | 'model' | 'action'>
export type Remark = Pick<UpdateOrderMaterialsInput, 'attachment' | 'attachment_desc' | 'remark'>

export type OrderMaterialType = Pick<
  OrderMaterial,
  'id' | 'createdAt' | 'updatedAt' | 'order_id' | 'material' | 'amount' | 'model'
>

export type OMConnectionType = NonNullable<OrderMaterialsConnectionQuery['orderMaterialsConnection']>
