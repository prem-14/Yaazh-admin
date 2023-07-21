import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { alertReducer } from './slice/alert'
import { authReducer } from './slice/auth'
import { dummyReducer } from './slice/dummy'
import { productReducer } from './slice/product'
import { dummysApi } from './apis/dummyApis'
import { templatesApi } from './apis/templateApis'
import { badgesApi } from './apis/badgeApis'
import { faqsApi } from './apis/faqApis'
import { ingredientsApi } from './apis/ingredientApis'
import { globalReducer } from './slice/global'
import { authsApi } from './apis/authApis'
import { categoriesApi } from './apis/categoryApis'
import { productsApi } from './apis/productApis'
import { commonApi } from './apis/commonApis'
import { discountsApi } from './apis/discountApis'
import { adminsApi } from './apis/adminApis'
import { couponsApi } from './apis/couponApis'
import { bannersApi } from './apis/bannerApis'
import { staticPagesApi } from './apis/staticPageApis'
import { configurationsApi } from './apis/configurationApis'
import { blogsApi } from './apis/blogApis'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    alert: alertReducer,
    auth: authReducer,
    product: productReducer,
    dummy: dummyReducer,
    [dummysApi.reducerPath]: dummysApi.reducer,
    [templatesApi.reducerPath]: templatesApi.reducer,
    [authsApi.reducerPath]: authsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [badgesApi.reducerPath]: badgesApi.reducer,
    [faqsApi.reducerPath]: faqsApi.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [discountsApi.reducerPath]: discountsApi.reducer,
    [adminsApi.reducerPath]: adminsApi.reducer,
    [couponsApi.reducerPath]: couponsApi.reducer,
    [bannersApi.reducerPath]: bannersApi.reducer,
    [staticPagesApi.reducerPath]: staticPagesApi.reducer,
    [configurationsApi.reducerPath]: configurationsApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(dummysApi.middleware)
      .concat(templatesApi.middleware)
      .concat(authsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(badgesApi.middleware)
      .concat(faqsApi.middleware)
      .concat(ingredientsApi.middleware)
      .concat(commonApi.middleware)
      .concat(productsApi.middleware)
      .concat(discountsApi.middleware)
      .concat(adminsApi.middleware)
      .concat(couponsApi.middleware)
      .concat(bannersApi.middleware)
      .concat(staticPagesApi.middleware)
      .concat(configurationsApi.middleware)
      .concat(blogsApi.middleware)
  },
})

setupListeners(store.dispatch)

export default store
