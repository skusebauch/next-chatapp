import { Wave } from 'better-react-spinkit'

const Loader = () => {
  return (
    <center style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      <div>
        <img
          src='https://res.cloudinary.com/dgwgea5k3/image/upload/v1617394954/Logo/logo_sk_vzaykt.png'
          alt='Logo'
          style={{ marginBottom: 10 }}
          height={200}
        ></img>
        <Wave size={100} color='#499AFF' />
      </div>
    </center>
  )
}

export default Loader
