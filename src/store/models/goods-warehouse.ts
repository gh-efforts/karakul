import { createModel } from '@rematch/core'

import { pageToStart } from '../../helpers/params'
import { createWarehouse, deleteWarehouse, fetchWarehouses, updateWarehouse } from '../actions/goods-warehouse'

import type { RootModel, Pagination, PaginationConnection, GoodsWarehouseType } from '../type.d'

// goods-warehouse page list
const goodsWarehouse = createModel<RootModel>()({
  state: { page: 1, size: 10, data: [] as GoodsWarehouseType[], total: 0 },
  reducers: {
    changeData(_, payload: PaginationConnection<GoodsWarehouseType>) {
      return {
        ...payload,
        size: payload.size || 10,
      }
    },
  },
  effects: dispatch => ({
    async pageChange({ page = 1, size = 10 }: Pagination) {
      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchWarehouses({
        start,
        limit,
      })

      dispatch.goodsWarehouse.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.goodsWarehouse
      dispatch.goodsWarehouse.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.goodsWarehouse
      dispatch.goodsWarehouse.pageChange({ page: 1, size })
    },
    init() {
      dispatch.goodsWarehouse.pageChange({ page: 1, size: 10 })
    },
  }),
})

const warehouse = createModel<RootModel>()({
  state: { loading: false },
  reducers: {
    toggleLoading(state, loading: boolean) {
      return {
        ...state,
        loading,
      }
    },
  },
  effects: dispatch => ({
    async create(name: string | null | undefined) {
      dispatch.warehouse.toggleLoading(true)
      const [flag] = await createWarehouse(name)

      if (flag) {
        dispatch.goodsWarehouse.pageReload()
      }

      dispatch.warehouse.toggleLoading(false)

      return flag
    },

    async update({ id, name }: { id: string | undefined | null; name: string | null | undefined }) {
      dispatch.warehouse.toggleLoading(true)
      const [flag] = await updateWarehouse(id, name)

      if (flag) {
        dispatch.goodsWarehouse.pageReload()
      }

      dispatch.warehouse.toggleLoading(false)

      return flag
    },
    async delete(id: string | null | undefined) {
      dispatch.warehouse.toggleLoading(true)
      const [flag] = await deleteWarehouse(id)

      if (flag) {
        dispatch.goodsWarehouse.pageReload()
      }

      dispatch.warehouse.toggleLoading(false)

      return flag
    },
  }),
})
export { goodsWarehouse, warehouse }
