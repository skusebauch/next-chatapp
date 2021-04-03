import { auth, db } from '../../backend/firebase'

import { Container, ChatContainer } from '../../styles/ChatElements'

import Sidebar from '../../components/Sidebar'

import ChatContent from '../../components/ChatContent'

import Head from 'next/head'

import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../utils/getRecipientEmail'

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth)

  return (
    <Container>
      <Head>
        <title>Chat mit {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatContent chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  )
}

export default Chat

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.cid)

  // Prep the Messages...
  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messagesRes.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }))

  // Prep the Chats...
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  }
}
