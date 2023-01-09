import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type GlobalThemeType = 'dark'

interface GlobalThemeInit {
  theme: GlobalThemeType
  showNavigation: boolean
}

const themeInit: GlobalThemeInit = {
  theme: 'dark',
  showNavigation: true,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInit,
  reducers: {
    setNavigationBar: (store, action: PayloadAction<boolean>) => {
      store.showNavigation = action.payload
    },
  },
})

export const { setNavigationBar } = themeSlice.actions

export default themeSlice.reducer
