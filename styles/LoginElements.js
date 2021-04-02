import styled from 'styled-components'
import Image from 'next/image'

export const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
`

export const Logo = styled(Image)``
