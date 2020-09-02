import { message } from 'antd'

import { useCreateCommodityMutation, useCommoditiesLazyQuery } from '../../services'
import { pageToStart } from '../../helpers/params'
import { SAccessorie } from './goods.d'

function useCreateCommodityApi() {
  const [create, { loading }] = useCreateCommodityMutation({ fetchPolicy: 'no-cache' })

  const createCommodit = async (data: SAccessorie) => {
    try {
      await create({
        variables: {
          data,
        },
      })

      message.success('创建商品成功')
    } catch {
      message.error('创建商品失败')
    }
  }

  return { createCommodit, loading }
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

export { useCreateCommodityApi, useCommoditiesApi }
