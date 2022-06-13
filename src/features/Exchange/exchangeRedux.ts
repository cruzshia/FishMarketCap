import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/providers/store'
import { fetchExchange, ExchangeInfo, fetchVolume } from './exchangeApi'
import { statusSubject } from '@/utils/status'

export interface exchangeState {
  exchange?: ExchangeInfo
  volumeData: number[][]
}

const initialState: exchangeState = { volumeData: [] }

// https://redux-toolkit.js.org/api/createAsyncThunk
export const EXCHANGE_SOURCE = 'fetchExchange'
export const fetchExchangeAsync = createAsyncThunk('exchange/fetchExchange', async (id: string) => {
  statusSubject.next({ loading: true, source: EXCHANGE_SOURCE })
  const response = await fetchExchange(id)
  return response.data
})

export const EXCHANGE_VOLUME = 'fetchVolume'
export const fetchVolumeAsync = createAsyncThunk(
  'exchange/fetchVolume',
  async (props: { id: string; days?: number }) => {
    statusSubject.next({ loading: true, source: EXCHANGE_VOLUME })
    const response = await fetchVolume(props)
    return response.data
  }
)

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setExchangeAct: (state, action) => {
      state.exchange = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeAsync.fulfilled, (state, action) => {
        state.exchange = action.payload
        statusSubject.next({ success: true, source: EXCHANGE_SOURCE })
      })
      .addCase(fetchExchangeAsync.rejected, () => {
        statusSubject.next({ failed: true, source: EXCHANGE_SOURCE })
      })
      .addCase(fetchVolumeAsync.fulfilled, (state, action) => {
        state.volumeData = action.payload
        statusSubject.next({ success: true, source: EXCHANGE_VOLUME })
      })
      .addCase(fetchVolumeAsync.rejected, () => {
        statusSubject.next({ failed: true, source: EXCHANGE_VOLUME })
      })
  }
})

export const { setExchangeAct } = exchangeSlice.actions

export const selectExchange = (state: RootState) => state.exchange.exchange
export const selectVolumeData = (state: RootState) => state.exchange.volumeData

export default exchangeSlice.reducer
