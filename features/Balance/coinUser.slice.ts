import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CoinUser } from 'models'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: CoinUser | any = {
  amount: 0,
  item_type: ''
}

export const coinSlice = createSlice({
  name: 'coin user',
  initialState,
  reducers: {
    setCoinUser : (_, action: PayloadAction<CoinUser>) => {
      return action.payload
    },
  }
})

export const { setCoinUser } = coinSlice.actions

export default coinSlice.reducer
