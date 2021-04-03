import styled from 'styled-components'
import { Avatar } from '@material-ui/core'

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e0eaeb;
  }
`

export const UserAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`
