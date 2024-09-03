/* eslint-disable @typescript-eslint/no-explicit-any */
import { GlobalStyles, GlobalTheme } from 'assets/styles'
import GlobalRoute from 'routes'
import { paths, store } from 'apps'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleAsyncRequest } from 'utils/helper'
import fireBaseApi from 'apis/FireBaseApi'
import firebase, { firebaseConfig } from './apps/firebase'
import { TIME_NOTIFICATION } from 'apps/constants'
import { ResultHorseModal } from 'features/Race/components'
import { useToggle } from 'hooks'
import { notificationTemplate } from 'models'

function App() {
  const [isModalNotification, toggleIsModalNotification] = useToggle(false)
  const [message, setMessage] = useState<notificationTemplate>()

  const subscribeFirebase = async (name: string, token: string) => {
    const [,] = await handleAsyncRequest(fireBaseApi.subscribe(name, token))
  }

  const handleCloseModalJoinRaceOpen = () => {
    return toggleIsModalNotification(false)
  }

  useEffect(() => {
    if (window.location.pathname === paths.mobile.feature()) return
    if (window.location.pathname === paths.maintenace.detail()) return
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)) {
    //   window.location.href = paths.mobile.feature()
    // }

    const messaging = firebase.messaging()
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken()
      })
      .then((token: any) => {
        subscribeFirebase(firebaseConfig.broadcastTopic, token)
      })

    messaging.onMessage((payload: { data: any; notification: any }) => {
      const { title, priority, body }: any = { ...payload.data, ...payload.notification }
      if (priority == 'WARNING') {
        toggleIsModalNotification(true)
        setMessage({ ...payload.data, ...payload.notification })
        return
      }
      toast(
        <div>
          <div className='font-bold font-size-20 color-orange'> {title}</div> <div className='body-content'>{body}</div>
        </div>,
        {
          position: 'top-right',
          autoClose: TIME_NOTIFICATION,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        }
      )
    })
  }, [])

  return (
    <Provider store={store}>
      <GlobalTheme>
        <GlobalStyles />
        <div className='App'>
          <GlobalRoute />
          <ToastContainer />
          {isModalNotification && (
            <ResultHorseModal
              toggleIsModalOpen={toggleIsModalNotification}
              onCloseButtonClick={handleCloseModalJoinRaceOpen}
              message={
                <>
                  <div className='font-bold font-size-20 color-orange text-uppercase'>
                    {message?.title}
                  </div>
                  <div className='font-size-18'>
                    {message?.body}
                  </div>
                </>
              }
            />
          )}
        </div>
      </GlobalTheme>
    </Provider>
  )
}

export default App
