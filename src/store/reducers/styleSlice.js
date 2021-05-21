import { createSlice } from '@reduxjs/toolkit'

const styleSlice = createSlice({
  name: 'style',
  initialState: {
    sidebarShow: 'responsive'
  },
  reducers: {
    set (state, action) {
      state.sidebarShow = action.payload
    }
  }
})

const { actions, reducer } = styleSlice
export const { set } = actions
export default reducer
