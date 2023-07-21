import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const badgesApi = createApi({
  reducerPath: 'badgeApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/admin/badge',
  // }),
  endpoints(builder) {
    return {
      fetchBadges: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/badge/getAllBadges',
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
      addBadge: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/badge/addNewBadge',
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
      updateBadge: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/badge/updateBadge',
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
      getBadge: builder.query({
        query: (paramData) => {
          return {
            url: '/badge/getBadge',
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

export const { useFetchBadgesMutation, useAddBadgeMutation, useGetBadgeQuery, useUpdateBadgeMutation } = badgesApi
export { badgesApi }
