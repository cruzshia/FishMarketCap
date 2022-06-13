import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import exchangeListReducer from '../features/ExchangeList/exchangeListRedux'
import exchangeRedux from '../features/Exchange/exchangeRedux'

const store = configureStore({
  reducer: {
    exchangeList: exchangeListReducer,
    exchange: exchangeRedux
  }
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
