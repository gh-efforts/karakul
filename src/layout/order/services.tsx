import {
  OrdersQueryVariables,
  client,
  OrdersConnectionQuery,
  OrdersConnectionQueryVariables,
  OrdersConnectionDocument,
  useCreateOrderMutation,
} from '../../services'
import { TOrderConnection } from './order'
import { getLocalStore } from 'src/helpers/cookie'

async function fetchOrders(
  val: OrdersQueryVariables & { Authorization?: string | undefined }
): Promise<TOrderConnection> {
  try {
    const { data } = await client.query<OrdersConnectionQuery, OrdersConnectionQueryVariables>({
      query: OrdersConnectionDocument,
      variables: val,
      fetchPolicy: 'network-only',
    })

    return (data?.ordersConnection ?? {}) as TOrderConnection
  } catch (e) {
    return {} as TOrderConnection
  }
}

function useCreateOrderApi() {
  const [createOrder, { loading }] = useCreateOrderMutation()

  const user = getLocalStore('userId') || ''
  const submit = async (name: string, amount: number, detail: string, time: string) => {
    await createOrder({
      variables: {
        data: { name, amount, detail, user, delivery_time: time },
      },
      fetchPolicy: 'no-cache',
    })
  }

  return {
    submit,
    loading,
  }
}

export { fetchOrders, useCreateOrderApi }
