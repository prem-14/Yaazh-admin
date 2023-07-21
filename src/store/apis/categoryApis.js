import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const categoriesApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/admin',
  // }),
  endpoints(builder) {
    return {
      fetchCategorys: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/category/getAllCategories',
            method: 'POST',
            body: bodyData,
            credentials: 'include',
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled
          } catch (err) {
            commonErrorResponse(dispatch, err)
          }
        },
      }),
      changeCategoryStatus: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/category/changeCategoryStatus',
            method: 'PATCH',
            body: bodyData,
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled
            apiStatusResponse(dispatch, data)
          } catch (err) {
            commonErrorResponse(dispatch, err)
          }
        },
      }),
      addCategory: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/category/addCategory',
            method: 'POST',
            body: bodyData,
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled
            apiStatusResponse(dispatch, data)
          } catch (err) {
            commonErrorResponse(dispatch, err)
          }
        },
      }),
      updateCategory: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/category/updateCategory',
            method: 'PUT',
            body: bodyData,
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled
            apiStatusResponse(dispatch, data)
          } catch (err) {
            commonErrorResponse(dispatch, err)
          }
        },
      }),
      getCategory: builder.query({
        query: (paramData) => {
          return {
            url: '/category/getCategory',
            method: 'GET',
            params: paramData,
          }
        },
        transformResponse: (response, meta, arg) => {
          return {
            ...response,
            records: response.data.responseData.records,
          }
        },
        transformErrorResponse: (response, meta, arg) => {
          return response
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled
          } catch (err) {
            commonErrorResponse(dispatch, err)
          }
        },
      }),
    }
  },
})

export const {
  useFetchCategorysMutation,
  useChangeCategoryStatusMutation,
  useAddCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoriesApi
export { categoriesApi }
