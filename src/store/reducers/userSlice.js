import { createSlice } from '@reduxjs/toolkit'

const initUser = {
  userList: []
}

const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload
    }
  }
})

const { actions, reducer } = userSlice
export const { setUserList } = actions;
export default reducer
