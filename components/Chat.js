import { Container, UserAvatar } from '../styles/ChatElements'
import getRecipientEmail from '../utils/getRecipientEmail'

import { auth, db } from '../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth)
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  )
  console.log('recipientSnapshot', recipientSnapshot)

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  console.log('recipient', recipient)
  const recipientEmail = getRecipientEmail(users, user)

  return (
    <Container>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat
