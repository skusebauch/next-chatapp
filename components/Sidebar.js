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

const Sidebar = () => {
  return (
    <Container>
      <Header>
        <UserAvatar />
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
      <SidebarButton>Starte neuen Chat</SidebarButton>
    </Container>
  )
}

export default Sidebar
