import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const staticPagesApi = createApi({
  reducerPath: 'staticPageApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/admin/staticPage',
  // }),
  endpoints(builder) {
    return {
      fetchStaticPages: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/staticPage/getAllStaticPages',
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
      changeStaticPageStatus: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/staticPage/changeStaticPageStatus',
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
      addStaticPage: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/staticPage/addNewStaticPage',
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
      updateStaticPage: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/staticPage/updateStaticPage',
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
      getStaticPage: builder.query({
        query: (paramData) => {
          return {
            url: '/staticPage/getStaticPage',
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
  useFetchStaticPagesMutation,
  useChangeStaticPageStatusMutation,
  useAddStaticPageMutation,
  useGetStaticPageQuery,
  useUpdateStaticPageMutation,
} = staticPagesApi
export { staticPagesApi }
