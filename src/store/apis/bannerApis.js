import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const bannersApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/admin/banner',
  // }),
  endpoints(builder) {
    return {
      fetchBanners: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/banner/getAllBanners',
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
      changeBannerStatus: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/banner/changeBannerStatus',
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
      addBanner: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/banner/addNewBanner',
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
      updateBanner: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/banner/updateBanner',
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
      getBanner: builder.query({
        query: (paramData) => {
          return {
            url: '/banner/getBanner',
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
  useFetchBannersMutation,
  useChangeBannerStatusMutation,
  useAddBannerMutation,
  useGetBannerQuery,
  useUpdateBannerMutation,
} = bannersApi
export { bannersApi }
