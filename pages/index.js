import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import MobileSidebar from '../components/MobileSidebar'
import styled from 'styled-components'

export default function Home() {
  return (
    <IndexWrapper>
      <Head>
        <title>SK - Chatapp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Sidebar />
      <MobileSidebar />
      <Placeholder>
        <img
          src='https://res.cloudinary.com/dgwgea5k3/image/upload/v1617394954/Logo/logo_sk_vzaykt.png'
          alt='Logo'
          style={{ marginBottom: 10 }}
          height={200}
        ></img>
        <h3>Wähle ein Chat aus</h3>
      </Placeholder>
    </IndexWrapper>
  )
}

const IndexWrapper = styled.div`
  display: flex;
`

const Placeholder = styled.div`
  @media only screen and (max-width: 750px) {
    display: none;
  }
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`
