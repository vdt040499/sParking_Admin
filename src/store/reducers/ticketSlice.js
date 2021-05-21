import { createSlice } from '@reduxjs/toolkit'

const initTicket = {
  curTickets: []
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: initTicket,
  reducers: {
    setCurTickets (state, action) {
      state.curTickets = action.payload
    }
  }
})

const { actions, reducer } = ticketSlice
export const { setCurTickets } = actions
export default reducer
