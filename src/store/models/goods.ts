import { createModel } from '@rematch/core'

import { Enum_Commodity_State } from '../../services'
import { pageToStart } from '../../helpers/params'
import {
  createCommodity,
  fetchGoodsOrders,
  fetchOrderCommoditiesById,
  PCreateCommodity,
  PUpdateCommodity,
  updateCommodity,
  exWarehouse,
  PExWarehouse,
  fetchExGooods,
  fetchExWarehouseHistory,
  fetchInWarehouse,
} from '../actions/goods'

import type {
  RootModel,
  Pagination,
  PaginationConnection,
  GoodsOrder,
  OrderCommodity,
  ExWGoodsItem,
  GoodsExHistoryItem,
} from '../type.d'

// TODO: pick commom logic

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
        loading: false,
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
    async fetchCommodity(id: string | null | undefined) {
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

const commodity = createModel<RootModel>()({
  state: {
    loading: false,
  },
  reducers: {
    toggleLoading(state, loading: boolean) {
      return {
        ...state,
        loading,
      }
    },
  },
  effects: dispatch => ({
    async update(
      params: PUpdateCommodity & {
        pid?: string | null | undefined
      }
    ) {
      dispatch.commodity.toggleLoading(true)

      const [flag] = await updateCommodity(params)

      if (flag && params.pid) {
        dispatch.goods.fetchCommodity(params.pid)
      }

      dispatch.commodity.toggleLoading(false)

      return flag
    },

    async create(
      params: PCreateCommodity & {
        pid?: string | null | undefined
      }
    ) {
      dispatch.commodity.toggleLoading(true)

      const [flag] = await createCommodity(params)

      if (flag && params.pid) {
        dispatch.goods.fetchCommodity(params.pid)
      }

      dispatch.commodity.toggleLoading(false)

      return flag
    },

    async exwarehouse(
      params: PExWarehouse & {
        pid?: string | null | undefined
      }
    ) {
      const [flag] = await exWarehouse(params)

      if (flag && params.pid) {
        dispatch.goods.fetchCommodity(params.pid)
      }

      return flag
    },
  }),
})

// exwarehouse modal
const exwarehouse = createModel<RootModel>()({
  state: { page: 1, size: 10, data: [] as ExWGoodsItem[], total: 0, id: null as string | null | undefined },
  reducers: {
    changeData({ id }, payload: PaginationConnection<ExWGoodsItem>) {
      return {
        ...payload,
        size: payload.size || 10,
        id,
      }
    },
    changeId(_, id: string) {
      return {
        id,
        page: 1,
        size: 10,
        data: [],
        total: 0,
      }
    },
    unsetData() {
      return {
        id: null,
        page: 1,
        size: 10,
        data: [],
        total: 0,
      }
    },
  },
  effects: dispatch => ({
    async pageChange({ page = 1, size = 10 }: Pagination, state) {
      const { id } = state.exwarehouse
      if (!id) {
        return
      }

      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchExGooods({
        start,
        limit,
        id,
        state: Enum_Commodity_State.In,
      })

      dispatch.exwarehouse.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.exwarehouse
      dispatch.exwarehouse.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.exwarehouse
      dispatch.exwarehouse.pageChange({ page: 1, size })
    },
    init(id: string | null | undefined) {
      if (!id) {
        dispatch.exwarehouse.unsetData()
        return
      }

      dispatch.exwarehouse.changeId(id)
      dispatch.exwarehouse.pageChange({ page: 1, size: 10 })
    },
  }),
})

// exwarehouse modal
const exwarehouseHistory = createModel<RootModel>()({
  state: { page: 1, size: 10, data: [] as GoodsExHistoryItem[], total: 0, id: null as string | null | undefined },
  reducers: {
    changeData({ id }, payload: PaginationConnection<GoodsExHistoryItem>) {
      return {
        ...payload,
        size: payload.size || 10,
        id,
      }
    },
    changeId(_, id: string) {
      return {
        id,
        page: 1,
        size: 10,
        data: [],
        total: 0,
      }
    },
    unsetData() {
      return {
        id: null,
        page: 1,
        size: 10,
        data: [],
        total: 0,
      }
    },
  },
  effects: dispatch => ({
    async pageChange({ page = 1, size = 10 }: Pagination, state) {
      const { id } = state.exwarehouseHistory
      if (!id) {
        return
      }

      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchExWarehouseHistory({
        start,
        limit,
        orderId: id,
      })

      dispatch.exwarehouseHistory.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.exwarehouseHistory
      dispatch.exwarehouseHistory.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.exwarehouseHistory
      dispatch.exwarehouseHistory.pageChange({ page: 1, size })
    },
    init(id: string | null | undefined) {
      if (!id) {
        dispatch.exwarehouseHistory.unsetData()
        return
      }

      dispatch.exwarehouseHistory.changeId(id)
      dispatch.exwarehouseHistory.pageChange({ page: 1, size: 10 })
    },
  }),
})

// goods inhouse modal

const inwarehouse = createModel<RootModel>()({
  state: { page: 1, size: 10, data: [] as GoodsExHistoryItem[], total: 0, id: null as string | null | undefined },
  reducers: {
    changeData({ id }, payload: PaginationConnection<GoodsExHistoryItem>) {
      return {
        ...payload,
        size: payload.size || 10,
        id,
      }
    },
    changeId(_, id: string) {
      return {
        id,
        page: 1,
        size: 10,
        data: [],
        total: 0,
      }
    },
    unsetData() {
      return {
        id: null,
        page: 1,
        size: 10,
        data: [],
        total: 0,
      }
    },
  },
  effects: dispatch => ({
    async pageChange({ page = 1, size = 10 }: Pagination, state) {
      const { id } = state.inwarehouse
      if (!id) {
        return
      }

      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchInWarehouse({
        start,
        limit,
        orderId: id,
      })

      dispatch.inwarehouse.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.inwarehouse
      dispatch.inwarehouse.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.inwarehouse
      dispatch.inwarehouse.pageChange({ page: 1, size })
    },
    init(id: string | null | undefined) {
      if (!id) {
        dispatch.inwarehouse.unsetData()
        return
      }

      dispatch.inwarehouse.changeId(id)
      dispatch.inwarehouse.pageChange({ page: 1, size: 10 })
    },
  }),
})

export { goods, commodity, exwarehouse, exwarehouseHistory, inwarehouse }
