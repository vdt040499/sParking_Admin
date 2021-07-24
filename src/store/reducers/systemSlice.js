import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import systemApi from 'src/apis/systemApi'

const initSystem = {
  ticketList: [],
  allTicketList: [],
  lastDateArr: [],
  lastTicketArr: [],
  space: {},
  loading: false
}

export const update = createAsyncThunk(
  'system/update',
  async ({ spaceId, data }) => {
    const dataResponse = await systemApi.updateSystem(spaceId, data)
    const space = dataResponse.space
    return space
  }
)

const systemSlice = createSlice({
  name: 'system',
  initialState: initSystem,
  reducers: {
    setTicketList (state, action) {
      state.ticketList = action.payload
    },
    setAllTicketList (state, action) {
      state.allTicketList = action.payload
    },
    setLastDateArr (state, action) {
      state.lastDateArr = action.payload
    },
    setLastTicketArr (state, action) {
      state.lastTicketArr = action.payload
    },
    setSpace (state, action) {
      state.space = action.payload
    },
    setLoading (state, action) {
      state.loading = action.payload
    }
  },
  extraReducers: {
    [update.fulfilled]: (state, action) => {
        state.space = action.payload;
    }
  }
})

const { actions, reducer } = systemSlice
export const { setTicketList, setAllTicketList, setLastDateArr, setLastTicketArr, setSpace, setLoading } = actions
export default reducer
