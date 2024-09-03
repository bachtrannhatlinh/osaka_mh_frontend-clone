import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
  records: []
}

export const cancelRaceSlice = createSlice({
  name: 'cancelRaceData',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDataCancelRace : (_, action: PayloadAction<any>) => {
      return action.payload
    },
  }
})

export const { setDataCancelRace } = cancelRaceSlice.actions

export default cancelRaceSlice.reducer
