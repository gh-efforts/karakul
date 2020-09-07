import {
  client,
  OrderMaterialsQueryVariables,
  OrderMaterialsConnectionQuery,
  OrderMaterialsConnectionQueryVariables,
  OrderMaterialsConnectionDocument,
  useCreateOrderMaterialsMutation,
  MaterialsInput,
  useUpdateOrderMaterialsMutation,
} from '../../services'
import { getLocalStore } from 'src/helpers/cookie'
import { OMConnectionType } from './material'

export enum ActionType {
  Increase = 1,
  Return = 2,
  Exchange = 3,
  // Create = 4,
}

export const ActionTypeMap = {
  [ActionType.Increase]: '增货',
  [ActionType.Return]: '退货',
  [ActionType.Exchange]: '换货',
  // [ActionType.Create]: '新增',
}
async function fetchOrderMaterials(
  val: OrderMaterialsConnectionQueryVariables & { Authorization?: string | undefined }
): Promise<OMConnectionType> {
  try {
    const { data } = await client.query<OrderMaterialsConnectionQuery, OrderMaterialsQueryVariables>({
      query: OrderMaterialsConnectionDocument,
      variables: val,
      fetchPolicy: 'network-only',
    })

    return data?.orderMaterialsConnection ?? {}
  } catch (e) {
    return {} as OMConnectionType
  }
}

function useCreateOrderMaterialsApi() {
  const [create, { loading }] = useCreateOrderMaterialsMutation()

  const user = getLocalStore('userId') || ''
  const submit = async (data: MaterialsInput[], id: string) => {
    await create({
      variables: {
        input: { order_id: id, materials: data, user },
      },
      fetchPolicy: 'no-cache',
    })
  }

  return {
    submit,
    loading,
  }
}

function useUpdateOrderMaterialsApi() {
  const [update, { loading }] = useUpdateOrderMaterialsMutation()

  const user = getLocalStore('userId') || ''
  const submit = async (
    data: MaterialsInput[],
    id: string,
    attachment: string[],
    attachment_desc: string,
    remark: string
  ) => {
    await update({
      variables: {
        input: { order_id: id, materials: data, user, attachment, attachment_desc, remark },
      },
      fetchPolicy: 'no-cache',
    })
  }

  return {
    submit,
    loading,
  }
}

export { fetchOrderMaterials, useCreateOrderMaterialsApi, useUpdateOrderMaterialsApi }
