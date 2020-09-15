import { message } from 'antd'

import {
  useCreateCommodityMutation,
  useCommoditiesLazyQuery,
  OutboundCommodityInput,
  useCommodityExWarehouseMutation,
  CommodityInput,
  useUpdateCommodityMutation,
} from '../../services'
import { pageToStart } from '../../helpers/params'

function useCreateCommodityApi() {
  const [create, { loading }] = useCreateCommodityMutation({ fetchPolicy: 'no-cache' })

  const createCommodit = async (data: CommodityInput) => {
    try {
      await create({
        variables: {
          data,
        },
      })

      message.success('创建商品成功')
      return true
    } catch {
      message.error('创建商品失败')
      return false
    }
  }

  return { createCommodit, loading }
}

function useUpdateCommodityApi() {
  const [update, { loading }] = useUpdateCommodityMutation({ fetchPolicy: 'no-cache' })

  const updateCommodit = async (id: string, data: CommodityInput) => {
    try {
      await update({
        variables: {
          id,
          data: JSON.parse(JSON.stringify(data)), // fix `Cannot assign to read only property` error
        },
      })

      message.success('修改商品成功')
      return true
    } catch (e) {
      message.error('修改商品失败')
      return false
    }
  }

  return { updateCommodit, loading }
}
function useCommoditiesApi() {
  const [fetch, { data, loading }] = useCommoditiesLazyQuery()

  const fetchCommodities = (page?: number, size?: number) => {
    const [start, limit] = pageToStart(page, size)
    fetch({
      variables: {
        start,
        limit,
      },
    })
  }

  return {
    data,
    loading,
    fetchCommodities,
  }
}

function useCommodityExWarehouseApi() {
  const [exWarehouseapi, { loading }] = useCommodityExWarehouseMutation()

  const exWarehouse = async (input: OutboundCommodityInput) => {
    try {
      await exWarehouseapi({
        variables: {
          input,
        },
      })

      message.success('出库成功')
      return true
    } catch {
      message.error('出库失败')
      return false
    }
  }

  return {
    exWarehouse,
    loading,
  }
}

export { useCreateCommodityApi, useCommoditiesApi, useCommodityExWarehouseApi, useUpdateCommodityApi }
