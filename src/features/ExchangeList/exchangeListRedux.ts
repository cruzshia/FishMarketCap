import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/providers/store'
import { fetchExchangeList, FethchListProp, Exchange } from './exchangeListApi'
import { statusSubject } from '@/utils/status'

export interface exchangeListState {
  exchangeList: Exchange[]
}

const initialState: exchangeListState = {
  exchangeList: []
}

export const FETCH_SOURCE = 'fetchExchangeList'

// https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchExchangeListAsync = createAsyncThunk(
  'exchangeList/fetchExchangeList',
  async (props: FethchListProp & { loadMore?: boolean }) => {
    statusSubject.next({ loading: true, source: FETCH_SOURCE })
    const response = await fetchExchangeList(props)
    return {
      list: response.data,
      loadMore: props.loadMore
    }
  }
)

export const exchangeListSlice = createSlice({
  name: 'exchangeList',
  initialState,
  reducers: {
    setExchangeListAct: (state, action) => {
      state.exchangeList = action.payload
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeListAsync.fulfilled, (state, { payload }) => {
        state.exchangeList = payload.loadMore ? state.exchangeList.concat(payload.list) : payload.list
        statusSubject.next({ success: true, source: FETCH_SOURCE })
      })
      .addCase(fetchExchangeListAsync.rejected, () => {
        statusSubject.next({ failed: true, source: FETCH_SOURCE })
      })
  }
})

export const { setExchangeListAct } = exchangeListSlice.actions

export const selectExchangeList = (state: RootState) => state.exchangeList.exchangeList

export default exchangeListSlice.reducer
