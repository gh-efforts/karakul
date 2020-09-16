import type { DocumentNode } from 'graphql'

import {
  CommodityTypesSelectQuery,
  CommodityTypesSelectQueryVariables,
  MaterialsDocument,
  MaterialsQuery,
  MaterialsQueryVariables,
  NClient,
  OrderMaterialsQuery,
  OrderMaterialsQueryVariables,
  WarehousesSelectQuery,
  WarehousesSelectQueryVariables,
} from '../../services'
import { useEffect, useReducer, useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery<TD = any, TV = any>(
  query: DocumentNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: TV = {} as any,
  skip = false
) {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const queryDataRef = useRef<TD | null>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (skip) {
      return
    }
    if (loading) {
      return
    }

    if (!queryDataRef.current) {
      NClient.request<TD, TV>(query, options)
        .then(res => {
          queryDataRef.current = res
          forceUpdate()
        })
        .catch(() => {
          queryDataRef.current = null
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [options, query, loading, skip])

  return {
    loading,
    data: queryDataRef.current,
  }
}

function useMaterialsQuery() {
  return useQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument)
}

function useOrderMaterialsQuery(options: OrderMaterialsQueryVariables, skip = false) {
  return useQuery<OrderMaterialsQuery, OrderMaterialsQueryVariables>(MaterialsDocument, options, skip)
}

function useCommodityTypesSelectQuery() {
  return useQuery<CommodityTypesSelectQuery, CommodityTypesSelectQueryVariables>(MaterialsDocument)
}

function useWarehousesSelectQuery() {
  return useQuery<WarehousesSelectQuery, WarehousesSelectQueryVariables>(MaterialsDocument)
}

export { useMaterialsQuery, useCommodityTypesSelectQuery, useWarehousesSelectQuery, useOrderMaterialsQuery }
