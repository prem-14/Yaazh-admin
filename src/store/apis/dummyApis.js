import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'

const dummysApi = createApi({
  reducerPath: 'dummys',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/admin/dummy',
  }),
  endpoints(builder) {
    return {
      fetchCustomers: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/getAllCustomers',
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
      changeCustomerStatus: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/changeCustomerStatus',
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
      addCustomer: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/addCustomer',
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
      updateCustomer: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/updateCustomer',
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
      getCustomer: builder.query({
        query: (paramData) => {
          return {
            url: '/getCustomer',
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
  useFetchCustomersMutation,
  useChangeCustomerStatusMutation,
  useAddCustomerMutation,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
} = dummysApi
export { dummysApi }
