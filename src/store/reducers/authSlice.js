import { createAsyncThunk, createSlice } from  '@reduxjs/toolkit'
import authApi from 'src/apis/authApi'

const initAuth = {
  user: {},
  authen: false
}

export const login = createAsyncThunk(
  'user/login',
  async (values) => {
    const data = await authApi.login(values)
    const user = { username: data.username, email: data.email }
    return user
  }
)

export const register = createAsyncThunk(
  'user/register',
  async (values) => {
    const data = await authApi.register(values)
    return data.message
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initAuth,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.authen = true
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
        state.user = action.payload;
        state.authen = true
    }
  }
})

const { actions, reducer } = authSlice
export const { setUser } = actions
export default reducer
