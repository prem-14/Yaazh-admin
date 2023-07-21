import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const configurationsApi = createApi({
  reducerPath: 'configurationApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/admin/configuration',
  // }),
  endpoints(builder) {
    return {
      fetchConfigurations: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/configuration/getAllConfigurations',
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
      changeConfigurationStatus: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/configuration/changeConfigurationStatus',
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
      addConfiguration: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/configuration/addNewConfiguration',
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
      updateConfiguration: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/configuration/updateConfiguration',
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
      getConfiguration: builder.query({
        query: (paramData) => {
          return {
            url: '/configuration/getConfiguration',
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
  useFetchConfigurationsMutation,
  useChangeConfigurationStatusMutation,
  useAddConfigurationMutation,
  useGetConfigurationQuery,
  useUpdateConfigurationMutation,
} = configurationsApi
export { configurationsApi }
