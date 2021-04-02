import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyByY7rsbL1E8ZCCaykWx4eiDg1vi3Q9sDM',
  authDomain: 'next-chatapp-bdc13.firebaseapp.com',
  projectId: 'next-chatapp-bdc13',
  storageBucket: 'next-chatapp-bdc13.appspot.com',
  messagingSenderId: '580067194886',
  appId: '1:580067194886:web:fb2ba6d9364c0cfcf76b87',
}

// check we have already init
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = firebase.firestore()

const auth = app.auth()

const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
