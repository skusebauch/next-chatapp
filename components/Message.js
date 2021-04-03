import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../backend/firebase'

import {
  Container,
  MessageElement,
  Sender,
  Reciever,
  Timestamp,
} from '../styles/MessageElements'

import moment from 'moment'

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  )
}

export default Message
