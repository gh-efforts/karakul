import {
  CreateWarehouseDocument,
  CreateWarehouseMutation,
  CreateWarehouseMutationVariables,
  DeleteWarehouseDocument,
  DeleteWarehouseMutation,
  DeleteWarehouseMutationVariables,
  NClient,
  UpdateWarehouseDocument,
  UpdateWarehouseMutation,
  UpdateWarehouseMutationVariables,
  WarehousesDocument,
  WarehousesQuery,
  WarehousesQueryVariables,
} from '../../services'
import { getLocalStore } from '../../helpers/cookie'

import { GoodsWarehouseType } from '../type.d'

async function fetchWarehouses(val: WarehousesQueryVariables) {
  try {
    const { warehousesConnection } = await NClient.request<WarehousesQuery, WarehousesQueryVariables>(
      WarehousesDocument,
      val
    )

    return {
      data: (warehousesConnection?.values ?? []) as GoodsWarehouseType[],
      total: warehousesConnection?.aggregate?.count ?? 0,
    }
  } catch {
    return {
      data: [],
      total: 0,
    }
  }
}

async function createWarehouse(name: string | null | undefined): Promise<[boolean]> {
  try {
    const user = getLocalStore('userId')

    if (!user || !name) {
      return [false]
    }

    await NClient.request<CreateWarehouseMutation, CreateWarehouseMutationVariables>(CreateWarehouseDocument, {
      data: { name, user },
    })
    return [true]
  } catch {
    return [false]
  }
}

async function updateWarehouse(id: string | null | undefined, name: string | null | undefined): Promise<[boolean]> {
  try {
    if (!id || !name) {
      return [false]
    }

    const user = getLocalStore('userId')

    if (!user) {
      return [false]
    }

    await NClient.request<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>(UpdateWarehouseDocument, {
      id,
      data: { name, user },
    })
    return [true]
  } catch {
    return [false]
  }
}

async function deleteWarehouse(id: string | null | undefined): Promise<[boolean]> {
  try {
    if (!id) {
      return [false]
    }

    const user = getLocalStore('userId')

    if (!user) {
      return [false]
    }

    await NClient.request<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>(DeleteWarehouseDocument, {
      id,
    })
    return [true]
  } catch {
    return [false]
  }
}

export { fetchWarehouses, createWarehouse, updateWarehouse, deleteWarehouse }
