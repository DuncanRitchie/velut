import DefaultHead from '../components/defaultHead/DefaultHead'
import styles from '../css/globals.css'
import Footer from '../components/footer/Footer'

function App({ Component, pageProps }) {
  return (<>
    <DefaultHead />
    <Component {...pageProps} />
    <Footer />
  </>)
}

export default App
