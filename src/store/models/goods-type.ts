import { createModel } from '@rematch/core'

import { pageToStart } from '../../helpers/params'
import {
  createCommodityType,
  deleteCommodityType,
  fetchCommodityTypes,
  updateCommodityType,
} from '../actions/goods-type'

import type { RootModel, Pagination, PaginationConnection, CommodityTypeType } from '../type.d'

// order page list
const goodsType = createModel<RootModel>()({
  state: { page: 1, size: 10, data: [] as CommodityTypeType[], total: 0, loading: false },
  reducers: {
    changeData({ loading }, payload: PaginationConnection<CommodityTypeType>) {
      return {
        ...payload,
        size: payload.size || 10,
        loading,
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
    async pageChange({ page = 1, size = 10 }: Pagination) {
      const [start, limit] = pageToStart(page, size)
      const { data, total } = await fetchCommodityTypes({
        start,
        limit,
      })

      dispatch.goodsType.changeData({
        page,
        size,
        data,
        total,
      })
    },
    pageReload(_, state) {
      const { page, size } = state.goodsType
      dispatch.goodsType.pageChange({ page, size })
    },
    pageReset(_, state) {
      const { size } = state.goodsType
      dispatch.goodsType.pageChange({ page: 1, size })
    },
    init() {
      dispatch.goodsType.pageChange({ page: 1, size: 10 })
    },
    async create(name: string | null | undefined) {
      dispatch.goodsType.toggleLoading(true)
      const [flag] = await createCommodityType(name)

      if (flag) {
        dispatch.goodsType.pageReload()
      }

      dispatch.goodsType.toggleLoading(false)

      return flag
    },

    async update({ id, name }: { id: string | undefined | null; name: string | null | undefined }) {
      dispatch.goodsType.toggleLoading(true)
      const [flag] = await updateCommodityType(id, name)

      if (flag) {
        dispatch.goodsType.pageReload()
      }

      dispatch.goodsType.toggleLoading(false)

      return flag
    },
    async delete(id: string | null | undefined) {
      dispatch.goodsType.toggleLoading(true)
      const [flag] = await deleteCommodityType(id)

      if (flag) {
        dispatch.goodsType.pageReload()
      }

      dispatch.goodsType.toggleLoading(false)

      return flag
    },
  }),
})

export { goodsType }
