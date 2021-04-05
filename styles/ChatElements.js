import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  max-height: 100vh;
  overflow: hidden;
`

export const ChatContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`
