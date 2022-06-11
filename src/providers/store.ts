import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import homeReducer from '../features/Home/homeRedux'

const store = configureStore({
  reducer: {
    home: homeReducer
  }
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
