import { useState, useRef } from 'react'

import {
  Container,
  Header,
  HeaderInfo,
  HeaderIcons,
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
import AttachFileIcon from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'

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

  const ScrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleSendMessage = e => {
    e.preventDefault()

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

    ScrollToBottom()
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recipientEmail = getRecipientEmail(chat.users, user)

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar src={recipientEmail[0]} />
        )}

        <HeaderInfo>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Zuletzt aktiv:{` `}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Nicht verfügbar'
              )}
            </p>
          ) : (
            <p>Lade zuletzt aktiv...</p>
          )}
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef}></EndOfMessage>
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
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
        <MicIcon />
      </InputContainer>
    </Container>
  )
}

export default ChatContent
