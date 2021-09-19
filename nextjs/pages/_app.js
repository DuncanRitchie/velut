import styles from '../styles/globals.css'
import Footer from '../components/footer/Footer'

function App({ Component, pageProps }) {
  return (<>
    <Component {...pageProps} />
    <Footer />
  </>)
}

export default App
