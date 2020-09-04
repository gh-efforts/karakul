import {
  client,
  OrderMaterialHistoriesConnectionQuery,
  OrderMaterialHistoriesConnectionQueryVariables,
  OrderMaterialHistoriesConnectionDocument,
  OrderMaterialHistoryConnection,
} from '../../services'

async function fetchOrderMaterialHistory(
  val: OrderMaterialHistoriesConnectionQueryVariables & { Authorization?: string | undefined }
): Promise<OrderMaterialHistoryConnection> {
  try {
    const { data } = await client.query<
      OrderMaterialHistoriesConnectionQuery,
      OrderMaterialHistoriesConnectionQueryVariables
    >({
      query: OrderMaterialHistoriesConnectionDocument,
      variables: val,
      fetchPolicy: 'network-only',
    })

    return (data?.orderMaterialHistoriesConnection ?? {}) as OrderMaterialHistoryConnection
  } catch (e) {
    return {} as OrderMaterialHistoryConnection
  }
}
export { fetchOrderMaterialHistory }
