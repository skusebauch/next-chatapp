import {
  Container,
  Search,
  SearchInput,
  SidebarButton,
  Header,
  UserAvatar,
  IconsContainer,
} from '../styles/SidebarElements'

import { IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'

import * as EmailValidator from 'email-validator'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../backend/firebase'

import ChatEntry from './ChatEntry'

const Sidebar = () => {
  const [user] = useAuthState(auth)
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email)
  const [chatsSnapshot] = useCollection(userChatRef)

  const handleCreateChat = () => {
    const input = prompt(
      'Mit wem willst du chatten? Gebe eine E-Mail-Adresse an:'
    )

    if (!input) return null

    if (
      EmailValidator.validate(input) &&
      !validateChatAlreadyExist(input) &&
      input !== user.email
    ) {
      // todo need to add the chat into the db "chats" collection
      db.collection('chats').add({
        // collection is alway an users array with [0.loggedin user, 1.recipientEmail]
        users: [user.email, input],
      })
    }
  }

  const validateChatAlreadyExist = recipientEmail =>
    !!chatsSnapshot?.docs.find(
      chat =>
        chat.data().users.find(user => user === recipientEmail)?.length > 0
    )

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='In Nachrichten suchen' />
      </Search>

      <SidebarButton onClick={handleCreateChat}>
        Starte neuen Chat
      </SidebarButton>

      {chatsSnapshot?.docs.map(chat => (
        <ChatEntry key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

export default Sidebar
