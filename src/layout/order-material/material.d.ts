import { MaterialsInput, OrderMaterial, OrderMaterialsConnectionQuery } from '../../services'

export type EditMaterial = Pick<MaterialsInput, 'id' | 'amount' | 'material' | 'action'>
export type Remark = Pick<UpdateOrderMaterialsInput, 'attachment' | 'attachment_desc' | 'remark'>

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

export type OMConnectionType = NonNullable<OrderMaterialsConnectionQuery['orderMaterialsConnection']>
