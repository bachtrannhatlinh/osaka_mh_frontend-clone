import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from 'models'

const initialState: AuthState = {
  user_id: 0,
  isLogged: false,
  balance: {
    coinHtc: '',
    coinPrz: ''
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (_, action: PayloadAction<AuthState>) => {
      return action.payload
    },

    logout: () => {
      return initialState
    }
  }
})

export const { setAuthState, logout } = authSlice.actions

export default authSlice.reducer
