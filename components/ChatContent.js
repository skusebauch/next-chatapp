import { useState, useRef } from 'react'

import {
  Header,
  HeaderInfo,
  MessageContainer,
  EndOfMessage,
  InputContainer,
  Input,
} from '../styles/ChatContentElements'

import Message from '../components/Message'

import getRecipientEmail from '../utils/getRecipientEmail'

import { useRouter } from 'next/router'

import firebase from 'firebase'
import { auth, db } from '../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import { Avatar, IconButton } from '@material-ui/core'

import SendIcon from '@material-ui/icons/Send'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import TimeAgo from 'timeago-react'

const ChatContent = ({ chat, messages }) => {
  const [input, setInput] = useState('')
  const [user] = useAuthState(auth)

  const endOfMessagesRef = useRef(null)

  const router = useRouter()
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.cid)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )
  const [recipientSnapshot] = useCollection(
    db
      .collection('users')
      .where('email', '==', getRecipientEmail(chat.users, user))
  )

  const showMessages = () => {
    if (messagesSnapshot) {
      // client
      return messagesSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    } else {
      // server
      return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleSendMessage = e => {
    e.preventDefault()

    if (!input) return null

    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    db.collection('chats').doc(router.query.cid).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    })

    setInput('')

    scrollToBottom()
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recipientEmail = getRecipientEmail(chat.users, user)

  return (
    <>
      <Header>
        <ArrowBackIosIcon color='primary' onClick={() => router.push('/')} />

        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar src={recipientEmail[0]} />
        )}

        <HeaderInfo>
          <h4 style={{ marginBottom: 0 }}>{recipientEmail}</h4>
          {recipientSnapshot ? (
            <p style={{ marginTop: 0 }}>
              Zuletzt aktiv:{` `}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Nicht verf??gbar'
              )}
            </p>
          ) : (
            <p>Lade zuletzt aktiv...</p>
          )}
        </HeaderInfo>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef}></EndOfMessage>
      </MessageContainer>

      <InputContainer>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          type='text'
        />

        <button
          hidden
          disabled={!input}
          type='submit'
          onClick={handleSendMessage}
        >
          Senden
        </button>

        <SendIcon color='primary' onClick={handleSendMessage} />
      </InputContainer>
    </>
  )
}

export default ChatContent
