import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: { mode: 'dark' },
  reducers: {
    changeTheme(state, action) {
      state.mode = action.payload
    },
  },
})

export const { changeTheme } = globalSlice.actions

export const globalReducer = globalSlice.reducer
