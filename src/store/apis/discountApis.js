import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const discountsApi = createApi({
  reducerPath: 'discountApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/admin/discount',
  // }),
  endpoints(builder) {
    return {
      fetchDiscounts: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/discount/getAllDiscounts',
            method: 'POST',
            body: bodyData,
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
      addDiscount: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/discount/addNewDiscount',
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
      updateDiscount: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/discount/updateDiscount',
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
      getDiscount: builder.query({
        query: (paramData) => {
          return {
            url: '/discount/getDiscount',
            method: 'GET',
            params: paramData,
          }
        },
        keepUnusedDataFor: 10, // keeping the cache for 10 seconds
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

export const { useFetchDiscountsMutation, useAddDiscountMutation, useGetDiscountQuery, useUpdateDiscountMutation } =
  discountsApi
export { discountsApi }
