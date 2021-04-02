import Head from 'next/head'
import { Button } from '@material-ui/core'
import { Container, LoginContainer, Logo } from '../styles/LoginElements'

const Login = () => {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src='/images/logo.png' alt='Logo' width={200} height={200} />

        <h1 style={{ textAlign: 'center', fontWeight: '600' }}>
          Willkommen zur <br />
          SK - Chatapp 👋🏻
        </h1>
        <Button variant='contained' color='primary'>
          Einloggen mit Google
        </Button>
      </LoginContainer>
    </Container>
  )
}

export default Login
