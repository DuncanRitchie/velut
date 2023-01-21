import DefaultHead from '../components/defaultHead/DefaultHead'
import Footer from '../components/footer/Footer'
import TemporaryWarning from '../components/temporaryWarning/temporaryWarning'
import styles from '../css/globals.css'

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultHead />
      <TemporaryWarning />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
