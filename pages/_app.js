import DefaultHead from '../components/defaultHead/DefaultHead'
import Footer from '../components/footer/Footer'
import styles from '../css/globals.css'

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultHead />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
