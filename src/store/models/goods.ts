import { createModel } from '@rematch/core'

import { pageToStart } from '../../helpers/params'
import { fetchGoodsOrders, fetchOrderCommoditiesById } from '../actions/goods'

import type { RootModel, Pagination, PaginationConnection, GoodsOrder, OrderCommodity } from '../type.d'

// order page list

// cache details
type GoodsDetails = {
  [key: string]: OrderCommodity[]
}

const goods = createModel<RootModel>()({
  state: { page: 1, size: 10, data: [] as GoodsOrder[], total: 0, details: {} as GoodsDetails },
  reducers: {
    changeData(_, payload: PaginationConnection<GoodsOrder>) {
      return {
        ...payload,
        size: payload.size || 10,
        details: {},
      }
    },
    appendDetail(state, { id, data }: { id: string; data: OrderCommodity[] }) {
      const { details } = state
      return {
        ...state,
        details: {
          ...details,
          [id]: data,
        },
      }
    },
    unsetDatails(state) {
      return {
        ...state,
        details: {},
      }
    },
  },
  effects: dispatch => ({
    async pageChange({ page = 1, size = 10 }: Pagination) {
      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchGoodsOrders({
        start,
        limit,
      })

      dispatch.goods.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.goods
      dispatch.goods.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.goods
      dispatch.goods.pageChange({ page: 1, size })
    },
    init() {
      dispatch.goods.pageChange({ page: 1, size: 10 })
    },
    async fetchCommody(id: string | null | undefined) {
      if (!id) {
        return
      }
      const [flag, data] = await fetchOrderCommoditiesById(id)
      if (flag && data) {
        dispatch.goods.appendDetail({
          id,
          data,
        })
      }
    },
  }),
})

export { goods }
