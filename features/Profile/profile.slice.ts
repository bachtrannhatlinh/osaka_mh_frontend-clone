import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CurrentUser } from 'models'

const initialState: CurrentUser = {
  avatar: '',
  description: '',
  email: '',
  lose_count: 0,
  name: '',
  public_address: '',
  total_race: 0,
  win_count: 0,
  win_rate: '',
  total_horse: '',
  first_count:0,
  second_count:0,
  third_count:0
}

export const profileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (_, action: PayloadAction<CurrentUser>) => {
      return action.payload
    },

    logoutProfile: () => {
      return initialState
    }
  }
})

export const { setCurrentUser, logoutProfile } = profileSlice.actions

export default profileSlice.reducer
