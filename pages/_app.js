import { useEffect } from 'react'

import '../styles/globals.css'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../backend/firebase'
import firebase from 'firebase'

import Loader from '../components/Loader'

import Login from './login'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      )
    }
  }, [user])

  if (loading) return <Loader />

  if (!user) return <Login />
  return <Component {...pageProps} />
}

export default MyApp
