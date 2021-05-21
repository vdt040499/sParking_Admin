import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import styleReducer from './reducers/styleSlice'
import ticketReducer from './reducers/ticketSlice'

const rootReducer = {
  style: styleReducer,
  user: userReducer,
  ticket: ticketReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store
