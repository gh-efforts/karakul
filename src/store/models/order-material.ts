import { createModel } from '@rematch/core'

import { pageToStart } from '../../helpers/params'

import type { RootModel, Pagination, PaginationConnection, OrderMaterialType } from '../type.d'
import { fetchOrderMaterials, createMaterials, updateMaterials, PUpdateMaterials } from '../actions/order-material'
import { MaterialsInput } from '../../services'

// order material page list
type OrderMaterialsMeta =
  | {
      id: string | null | undefined
      name: string | null | undefined
    }
  | null
  | undefined

const orderMaterials = createModel<RootModel>()({
  state: {
    page: 1,
    size: 10,
    data: [] as OrderMaterialType[],
    total: 0,
    meta: null as OrderMaterialsMeta,
  },
  reducers: {
    changeData({ meta }, payload: PaginationConnection<OrderMaterialType>) {
      return {
        ...payload,
        size: payload.size || 10,
        meta,
      }
    },
    changeMeta(_, meta: OrderMaterialsMeta) {
      return {
        meta,
        size: 10,
        page: 1,
        total: 0,
        data: [],
      }
    },
  },
  effects: dispatch => ({
    async pageChange({ page = 1, size = 10 }: Pagination, state) {
      const { id } = state.orderMaterials.meta || {}
      if (!id) {
        return
      }

      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchOrderMaterials({
        start,
        limit,
        where: {
          order_id: id,
        },
      })

      dispatch.orderMaterials.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.orders
      dispatch.orderMaterials.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.orders
      dispatch.orderMaterials.pageChange({ page: 1, size })
    },
    init(meta: OrderMaterialsMeta) {
      dispatch.orderMaterials.changeMeta(meta)
      dispatch.orderMaterials.pageChange({ page: 1, size: 10 })
    },
  }),
})

// order material modal

type OrderMaterialMeta =
  | {
      id: null | string | undefined
      tag: 'edit' | 'create'
    }
  | null
  | undefined

const orderMaterial = createModel<RootModel>()({
  state: {
    loading: false,
    meta: null as OrderMaterialMeta,
  },
  reducers: {
    changeMeta(_, meta: OrderMaterialMeta) {
      return {
        meta,
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
    async create(materials: MaterialsInput[], state) {
      const { id } = state.orderMaterial.meta || {}

      if (!id) {
        return false
      }

      dispatch.orderMaterial.toggleLoading(true)

      const [flag] = await createMaterials(materials, id)
      dispatch.orderMaterial.toggleLoading(false)

      if (flag) {
        dispatch.orderMaterials.pageReset()
        return true
      }

      return false
    },

    async update(params: PUpdateMaterials, state) {
      const { id } = state.orderMaterial.meta || {}

      if (!id) {
        return false
      }

      dispatch.orderMaterial.toggleLoading(true)

      const [flag] = await updateMaterials(params, id)

      dispatch.orderMaterial.toggleLoading(false)

      if (flag) {
        dispatch.orderMaterials.pageReload()
        return true
      }

      return false
    },
  }),
})

export { orderMaterials, orderMaterial }
