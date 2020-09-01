import {
  WarehousesQuery,
  WarehousesQueryVariables,
  client,
  WarehousesDocument,
  Warehouse,
  WarehouseConnection,
  useCreateWarehouseMutation,
  useDeleteWarehouseMutation,
} from '../../services'
import { getLocalStore } from 'src/helpers/cookie'
export type WarehouseType = Pick<Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'user'>
export type WarehouseConnectionType = Pick<WarehouseConnection, 'values' | 'aggregate'>
async function fetchWarehouses(
  val: WarehousesQueryVariables & { Authorization?: string | undefined }
): Promise<WarehouseConnectionType> {
  try {
    const { data } = await client.query<WarehousesQuery, WarehousesQueryVariables>({
      query: WarehousesDocument,
      variables: val,
      fetchPolicy: 'network-only',
    })

    return (data?.warehousesConnection ?? {}) as WarehouseConnectionType
  } catch (e) {
    return {} as WarehouseConnectionType
  }
}

function useCreateWarehouseApi() {
  const [createWarehouse, { loading }] = useCreateWarehouseMutation()

  const user = getLocalStore('userId') || ''
  const submit = async (name: string) => {
    await createWarehouse({
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

function useDeleteWarehouseApi() {
  const [deleteWarehouse, { loading }] = useDeleteWarehouseMutation()

  const submit = async (id: string) => {
    await deleteWarehouse({
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
export { fetchWarehouses, useCreateWarehouseApi, useDeleteWarehouseApi }
