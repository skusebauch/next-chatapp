import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@material-ui/core'

export const Container = styled.div``

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-radius: 2px;
`

export const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`

export const SidebarButton = styled(Button)`
  width: 100%;
  /* higher priority then material ui */
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`

export const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  height: 8rem;
  border-bottom: 1px solid whitesmoke;
`

export const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: all 0.5s ease;
  :hover {
    opacity: 0.8;
  }
`

export const IconsContainer = styled.div``
