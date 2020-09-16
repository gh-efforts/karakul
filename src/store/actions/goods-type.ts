import { getLocalStore } from '../../helpers/cookie'

import {
  CommodityTypesDocument,
  CommodityTypesQuery,
  CommodityTypesQueryVariables,
  CreateCommodityTypeDocument,
  CreateCommodityTypeMutation,
  CreateCommodityTypeMutationVariables,
  DeleteCommodityTypeDocument,
  DeleteCommodityTypeMutation,
  DeleteCommodityTypeMutationVariables,
  NClient,
  UpdateCommodityTypeDocument,
  UpdateCommodityTypeMutation,
  UpdateCommodityTypeMutationVariables,
} from '../../services'
import { CommodityTypeType } from '../type.d'

async function fetchCommodityTypes(val: CommodityTypesQueryVariables) {
  try {
    const { commodityTypesConnection } = await NClient.request<CommodityTypesQuery, CommodityTypesQueryVariables>(
      CommodityTypesDocument,
      val
    )

    return {
      data: (commodityTypesConnection?.values ?? []) as CommodityTypeType[],
      total: commodityTypesConnection?.aggregate?.count ?? 0,
    }
  } catch {
    return {
      data: [],
      total: 0,
    }
  }
}

async function createCommodityType(name: string | null | undefined): Promise<[boolean]> {
  try {
    const user = getLocalStore('userId')

    if (!user || !name) {
      return [false]
    }

    await NClient.request<CreateCommodityTypeMutation, CreateCommodityTypeMutationVariables>(
      CreateCommodityTypeDocument,
      {
        data: {
          name,
          user,
        },
      }
    )
    return [true]
  } catch {
    return [false]
  }
}

async function updateCommodityType(id: string | undefined | null, name: string | null | undefined): Promise<[boolean]> {
  try {
    if (!id || !name) {
      return [false]
    }

    const user = getLocalStore('userId')

    if (!user) {
      return [false]
    }

    await NClient.request<UpdateCommodityTypeMutation, UpdateCommodityTypeMutationVariables>(
      UpdateCommodityTypeDocument,
      {
        id,
        data: {
          name,
          user,
        },
      }
    )
    return [true]
  } catch {
    return [false]
  }
}

async function deleteCommodityType(id: string | null | undefined): Promise<[boolean]> {
  try {
    if (!id) {
      return [false]
    }

    const user = getLocalStore('userId')

    if (!user || !name) {
      return [false]
    }

    await NClient.request<DeleteCommodityTypeMutation, DeleteCommodityTypeMutationVariables>(
      DeleteCommodityTypeDocument,
      {
        id,
      }
    )
    return [true]
  } catch {
    return [false]
  }
}

export { fetchCommodityTypes, createCommodityType, updateCommodityType, deleteCommodityType }
