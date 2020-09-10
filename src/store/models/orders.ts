import { createModel } from '@rematch/core'

import { pageToStart } from '../../helpers/params'

import { fetchOrders } from '../actions/order'

import type { RootModel, TOrder, Pagination, PaginationConnection } from '../type.d'

const orders = createModel<RootModel>()({
  state: { page: 1, size: 10, data: [] as TOrder[], total: 0 },
  reducers: {
    changeData(_, payload: PaginationConnection<TOrder>) {
      return {
        page: payload.page,
        size: payload.size || 10,
        data: payload.data,
        total: payload.total,
      }
    },
  },
  effects: dispatch => ({
    async pageChange({ page = 1, size = 10 }: Pagination) {
      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchOrders({
        start,
        limit,
      })

      dispatch.orders.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.orders
      dispatch.orders.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.orders
      dispatch.orders.pageChange({ page: 1, size })
    },
    init() {
      dispatch.orders.pageChange({ page: 1, size: 10 })
    },
  }),
})

export { orders }
