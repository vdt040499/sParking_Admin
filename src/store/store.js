import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import userReducer from './reducers/userSlice'
import styleReducer from './reducers/styleSlice'
import ticketReducer from './reducers/ticketSlice'

const rootReducer = {
  style: styleReducer,
  auth: authReducer,
  user: userReducer,
  ticket: ticketReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store
