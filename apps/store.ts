import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/Auth/auth.slice'
import profileReducer from 'features/Profile/profile.slice'
import coinUserReducer from 'features/Balance/coinUser.slice'
import cancelRaceReducer from 'features/ModalCancelRace/cancelRaceData.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    coinUser: coinUserReducer,
    cancelRaceData: cancelRaceReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
