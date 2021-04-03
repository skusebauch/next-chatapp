import { useRouter } from 'next/router'

import { Container, UserAvatar } from '../styles/ChatEntryElements'
import getRecipientEmail from '../utils/getRecipientEmail'

import { auth, db } from '../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

const ChatEntry = ({ id, users }) => {
  const [user] = useAuthState(auth)
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  )

  const router = useRouter()

  const handleEnterChat = () => router.push(`/chat/${id}`)

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recipientEmail = getRecipientEmail(users, user)

  return (
    <Container onClick={handleEnterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  )
}

export default ChatEntry
