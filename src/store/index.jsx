import { configureStore } from '@reduxjs/toolkit'
import { alertReducer } from './slice/alert'
import { productReducer } from './slice/product'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    product: productReducer,
  },
})
