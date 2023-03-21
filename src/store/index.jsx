import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { alertReducer } from './slice/alert'
import { dummyReducer } from './slice/dummy'
import { productReducer } from './slice/product'
import { dummysApi } from './apis/dummyApis'
import { globalReducer } from './slice/global'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    alert: alertReducer,
    product: productReducer,
    dummy: dummyReducer,
    [dummysApi.reducerPath]: dummysApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dummysApi.middleware)
  },
})

setupListeners(store.dispatch)
