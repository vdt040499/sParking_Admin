import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import userReducer from './reducers/userSlice'
import styleReducer from './reducers/styleSlice'
import systemReducer from './reducers/systemSlice'

const rootReducer = {
  style: styleReducer,
  auth: authReducer,
  user: userReducer,
  system: systemReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store
