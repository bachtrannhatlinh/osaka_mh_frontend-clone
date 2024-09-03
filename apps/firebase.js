/* eslint-disable no-undef */
import firebase from 'firebase/app'
import 'firebase/messaging'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_Key ?? 'AIzaSyDqs4nufwNmpe3OXLbgWMpYp-5HPaRLYdY',
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN ?? 'metahorse-59929.firebaseapp.com',
  projectId: process.env.REACT_APP_FCM_PROJECT_Id ?? 'metahorse-59929',
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET ?? 'metahorse-59929.appspot.com',
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID ?? '270430098485',
  appId: process.env.REACT_APP_FCM_APP_ID ?? '1:270430098485:web:a25523f6f578e27da54d7c',
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID ?? 'G-HFNYNF3SRC',
  broadcastTopic: process.env.REACT_APP_FCM_BROADCAST_TOPIC ?? 'broadcast-dev'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
//todo: error not open
// const messaging = firebase.messaging()

// messaging.vapidKey =
//   process.env.REACT_APP_FCM_VAPID_KEY ??
//   'BBpP4rrzOqOv_TdKz6jI-CIcKFI6ZeAQ7Z-RhEnoUVDDgyEI9wX2EMlKDYoQXA0XJIoF6xDtfkq9_XLQJTtp7lk'
export { firebaseConfig }
export default firebase
