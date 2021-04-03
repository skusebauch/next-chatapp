import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../backend/firebase'

import {
  Container,
  Sender,
  Reciever,
  Timestamp,
} from '../styles/MessageElements'

import moment from 'moment'

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  // set styleComponents to either sender or receiver - check MessageElements.js
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp
            ? moment(message.timestamp).locale('de').format('LT')
            : '...'}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  )
}

export default Message
