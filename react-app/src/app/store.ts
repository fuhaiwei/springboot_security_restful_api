import session from '#F/session/slice'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    session,
  },
})

export const appDispatch = store.dispatch
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
