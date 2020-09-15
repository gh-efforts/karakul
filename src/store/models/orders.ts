import { createModel } from '@rematch/core'

import { pageToStart } from '../../helpers/params'

import { fetchOrders, fetchOrderById, updateOrder, PUpdateOrder } from '../actions/order'

import type { RootModel, TOrder, Pagination, PaginationConnection } from '../type.d'

// order page list
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

// order modal

type OrderTag = 'edit' | 'create'

const order = createModel<RootModel>()({
  state: {
    data: null as TOrder | null | undefined,
    tag: 'create' as OrderTag,
    loading: false,
  },
  reducers: {
    changeData(_, payload: { tag: OrderTag; data?: TOrder | null | undefined; loading: boolean }) {
      const { tag = 'create', data, loading } = payload

      return {
        tag,
        data,
        loading,
      }
    },
    unsetData({ tag }) {
      return {
        data: null,
        tag,
        loading: false,
      }
    },
    toggleLoading(state, loading: boolean) {
      return {
        ...state,
        loading,
      }
    },
  },
  effects: dispatch => ({
    async init(id: string | null | undefined) {
      if (!id) {
        dispatch.order.unsetData()
        return
      }

      dispatch.order.toggleLoading(true)

      const data = await fetchOrderById(id)

      dispatch.order.changeData({ tag: 'edit', data, loading: false })
    },

    async reload(id: string | null | undefined) {
      if (!id) {
        return
      }
      dispatch.order.toggleLoading(true)

      const data = await fetchOrderById(id)

      dispatch.order.changeData({ tag: 'edit', data, loading: false })
    },

    async update(payload: PUpdateOrder) {
      dispatch.order.toggleLoading(true)

      const [flag] = await updateOrder(payload)

      if (!flag) {
        dispatch.order.toggleLoading(false)
        return false
      }

      dispatch.orders.pageReload()

      return true
    },
  }),
})

export { orders, order }
