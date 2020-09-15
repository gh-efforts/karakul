import { init } from '@rematch/core'

import { models } from './models'

import type { Store, RootState } from './type.d'

let store: Store | undefined

const InitialPagination = {
  page: 1,
  size: 10,
  data: [],
  total: 0,
}

const InitialState: RootState = {
  orders: {
    ...InitialPagination,
  },
  order: {
    data: null,
    tag: 'create',
    loading: false,
  },
  orderHistory: {
    id: null,
    ...InitialPagination,
  },
  orderMaterials: {
    meta: null,
    ...InitialPagination,
  },
  orderMaterial: {
    meta: {
      id: null,
      tag: 'create',
    },
    loading: false,
  },
}

export const initStore = (initialState: RootState = InitialState) =>
  init({
    models,
    redux: {
      initialState,
    },
  })

export const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}
