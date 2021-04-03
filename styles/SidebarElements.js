import styled from 'styled-components'
import { Avatar, Button } from '@material-ui/core'

export const Container = styled.div`
  @media only screen and (max-width: 750px) {
    display: none;
  }
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`
export const MobileContainer = styled.div`
  @media only screen and (min-width: 750px) {
    display: none;
  }
  flex: 1;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
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
  padding: 15px;
  height: 80px;
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
