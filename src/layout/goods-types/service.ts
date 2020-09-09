import {
  client,
  CommodityType,
  CommodityTypeConnection,
  CommodityTypesDocument,
  CommodityTypesQueryVariables,
  CommodityTypesQuery,
  useCreateCommodityTypeMutation,
  useDeleteCommodityTypeMutation,
  useUpdateCommodityTypeMutation,
} from '../../services'
import { getLocalStore } from '../../helpers/cookie'
export type CommodityTypeType = Pick<CommodityType, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'user'>
export type CommodityTypeConnectionType = Pick<CommodityTypeConnection, 'values' | 'aggregate'>
async function fetchCommodityTypes(
  val: CommodityTypesQueryVariables & { Authorization?: string | undefined }
): Promise<CommodityTypeConnectionType> {
  try {
    const { data } = await client.query<CommodityTypesQuery, CommodityTypesQueryVariables>({
      query: CommodityTypesDocument,
      variables: val,
      fetchPolicy: 'network-only',
    })

    return (data?.commodityTypesConnection ?? {}) as CommodityTypeConnectionType
  } catch (e) {
    return {} as CommodityTypeConnectionType
  }
}

function useCreateCommodityTypeApi() {
  const [createCommodityType, { loading }] = useCreateCommodityTypeMutation()

  const user = getLocalStore('userId') || ''
  const submit = async (name: string) => {
    await createCommodityType({
      variables: {
        data: { name, user },
      },
      fetchPolicy: 'no-cache',
    })
  }

  return {
    submit,
    loading,
  }
}

function useUpdateCommodityTypeApi() {
  const [updateCommodityType, { loading }] = useUpdateCommodityTypeMutation()

  const user = getLocalStore('userId') || ''
  const submit = async (id: string, name: string) => {
    await updateCommodityType({
      variables: {
        id,
        data: { name, user },
      },
      fetchPolicy: 'no-cache',
    })
  }

  return {
    submit,
    loading,
  }
}

function useDeleteCommodityTypeApi() {
  const [deleteCommodityType, { loading }] = useDeleteCommodityTypeMutation()

  const submit = async (id: string) => {
    await deleteCommodityType({
      variables: {
        id,
      },
      fetchPolicy: 'no-cache',
    })
  }

  return {
    submit,
    loading,
  }
}
export { fetchCommodityTypes, useCreateCommodityTypeApi, useDeleteCommodityTypeApi, useUpdateCommodityTypeApi }
