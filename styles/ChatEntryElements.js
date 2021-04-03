import styled from 'styled-components'
import { Avatar } from '@material-ui/core'

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  word-break: break-word;
  :hover {
    background-color: #e0eaeb;
  }
`

export const UserAvatar = styled(Avatar)`
  margin: 0.5rem 1.5rem 0.5rem 0.5rem;
`
