import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { baseQueryWithReauth } from '@/common/api/rtkBaseQuery'

const ingredientsApi = createApi({
  reducerPath: 'ingredientApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:5000/api/v1/admin/ingredient',
  // }),
  endpoints(builder) {
    return {
      fetchIngredients: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/ingredient/getAllIngredients',
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
      changeIngredientStatus: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/ingredient/changeIngredientStatus',
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
      addIngredient: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/ingredient/addNewIngredient',
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
      updateIngredient: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/ingredient/updateIngredient',
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
      getIngredient: builder.query({
        query: (paramData) => {
          return {
            url: '/ingredient/getIngredient',
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
  useFetchIngredientsMutation,
  useChangeIngredientStatusMutation,
  useAddIngredientMutation,
  useGetIngredientQuery,
  useUpdateIngredientMutation,
} = ingredientsApi
export { ingredientsApi }
