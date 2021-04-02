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

import { auth } from '../backend/firebase'

const Sidebar = () => {
  const handleCreateChat = () => {
    const input = prompt(
      'Mit wem willst du chatten? Gebe eine E-Mail-Adresse an:'
    )

    if (!input) return null

    if (EmailValidator.validate(input)) {
      // todo need to add the chat into the db "chats" collection
    }
  }

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
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
    </Container>
  )
}

export default Sidebar
