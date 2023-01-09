import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import auth from '../features/auth/auth'
import theme from '../features/theme/theme'

export const store = configureStore({
  reducer: {
    theme,
    auth,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
