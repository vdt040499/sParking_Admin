import { createSlice } from '@reduxjs/toolkit'

const initTicket = {
  curTickets: [],
  lastDateArr: [],
  lastTicketArr: []
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: initTicket,
  reducers: {
    setCurTickets (state, action) {
      state.curTickets = action.payload
    },
    setLastDateArr (state, action) {
      state.lastDateArr = action.payload
    },
    setLastTicketArr (state, action) {
      state.lastTicketArr = action.payload
    }
  }
})

const { actions, reducer } = ticketSlice
export const { setCurTickets, setLastDateArr, setLastTicketArr } = actions
export default reducer
