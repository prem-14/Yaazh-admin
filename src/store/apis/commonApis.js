import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { commonErrorResponse } from '@/common/response'
import { setAllValues } from '../slice/global'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/common',
  // }),
  endpoints(builder) {
    return {
      uploadImages: builder.mutation({
        query: (bodyData, api) => {
          return {
            url: '/uploads/uploadImages',
            parentPath: 'common',
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
      deleteImages: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/uploads/deleteImages',
            parentPath: 'common',
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
      allValues: builder.query({
        query: (_, api) => {
          const baseUrl = api
          console.log('baseUrl', baseUrl)
          return {
            url: '/global/allValues',
            parentPath: 'common',
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            dispatch(setAllValues(data.data.responseData.records))
          } catch (err) {
            commonErrorResponse(dispatch, err)
          }
        },
      }),
    }
  },
})

export const { useUploadImagesMutation, useDeleteImagesMutation, useAllValuesQuery } = commonApi
export { commonApi }
