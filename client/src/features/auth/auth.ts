import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GOOGLE_PROFILE_API } from '../../config'
import useFetch from '../../hooks/useFetch'
import LoginUser from '../../utils/loginUser'

export type AccountType = 'google'

export interface UserProfile {
  username: string
  fullName: string
  avatarUrl?: string
  email: string
  _id: string
}

export interface AuthInit {
  instaUsername: string
  accountType: AccountType
  authorizated: boolean
}

export const authInit: AuthInit & UserProfile = {
  _id: null,
  instaUsername: null,
  authorizated: false,
  accountType: null,
  fullName: null,
  email: null,
  avatarUrl: null,
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInit,
  reducers: {
    setIG: (state, action: PayloadAction<string>) => {
      state.instaUsername = action.payload
    },
    logout: (state) => {
      for (let k in authInit) {
        state[k] = authInit[k]
      }
      localStorage.removeItem('GOOGLE_TRY')
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchGoogleProfileFromStorage.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        const data = action.payload || {}
        for (let key in data) {
          state[key] = data[key]
        }
        state.accountType = 'google'
        state.authorizated = true
      }
    )
  },
})

export const { setIG, logout } = authSlice.actions

type CB = { cb?: (err?: boolean) => void; username?: string }
export const fetchGoogleProfileFromStorage = createAsyncThunk<UserProfile, CB>(
  'auth/fetchGoogle',
  async (options = {}) => {
    const { username, cb = () => {} } = options
    const access_token = localStorage.getItem('GOOGLE_TRY')
    if (!access_token) {
      cb(true)
      throw new Error('CANNOT TRY')
    }

    const googleApi = useFetch(GOOGLE_PROFILE_API)
    try {
      const res = await googleApi('', {
        query: { access_token },
      })
      const data = res.data || {}
      const user = {
        _id: data.sub,
        username: (username || data?.given_name || data?.name)
          ?.replaceAll(/[^a-zA-Z0-9]+/g, '')
          .toLowerCase(),
        fullName: data.name,
        email: data.email,
        avatarUrl: data.picture,
        accountType: 'google',
      }

      const logged = await LoginUser({
        _id: user._id,
        username: user.username,
        email: user.email,
        accountType: user.accountType,
        instaUsername: username,
      })

      user.username = logged?.data?.username || user.username
      cb()
      return user
    } catch (e) {
      cb(true)
      throw e
    }
  }
)

export const selectAuth = (state): typeof authInit => state.auth

export default authSlice.reducer
