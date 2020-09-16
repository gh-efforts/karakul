import type { DocumentNode } from 'graphql'
import { useEffect, useReducer, useRef, useState } from 'react'

import {
  CommodityTypesSelectDocument,
  CommodityTypesSelectQuery,
  CommodityTypesSelectQueryVariables,
  MaterialsDocument,
  MaterialsQuery,
  MaterialsQueryVariables,
  NClient,
  OrderMaterialsDocument,
  OrderMaterialsQuery,
  OrderMaterialsQueryVariables,
  WarehousesSelectDocument,
  WarehousesSelectQuery,
  WarehousesSelectQueryVariables,
} from '../../services'

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
  return useQuery<OrderMaterialsQuery, OrderMaterialsQueryVariables>(OrderMaterialsDocument, options, skip)
}

function useCommodityTypesSelectQuery() {
  return useQuery<CommodityTypesSelectQuery, CommodityTypesSelectQueryVariables>(CommodityTypesSelectDocument)
}

function useWarehousesSelectQuery() {
  return useQuery<WarehousesSelectQuery, WarehousesSelectQueryVariables>(WarehousesSelectDocument)
}

export { useMaterialsQuery, useCommodityTypesSelectQuery, useWarehousesSelectQuery, useOrderMaterialsQuery }
