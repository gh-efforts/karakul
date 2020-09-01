import {
  client,
  OrderMaterialsQueryVariables,
  OrderMaterialsQuery,
  OrderMaterialsDocument,
  OrderMaterial,
} from '../../../services'

export type OrderMaterialType = Pick<
  OrderMaterial,
  'id' | 'created_at' | 'updated_at' | 'order_id' | 'material' | 'amount' | 'model'
>
async function fetchOrderMaterials(
  val: OrderMaterialsQueryVariables & { Authorization?: string | undefined }
): Promise<OrderMaterialType[]> {
  try {
    const { data } = await client.query<OrderMaterialsQuery, OrderMaterialsQueryVariables>({
      query: OrderMaterialsDocument,
      variables: val,
      fetchPolicy: 'network-only',
    })
    return (data?.orderMaterials ?? {}) as OrderMaterialType[]
  } catch (e) {
    return [] as OrderMaterialType[]
  }
}

export { fetchOrderMaterials }
