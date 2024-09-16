import DefaultHead from '../components/defaultHead/DefaultHead'
import ErrorBoundary from '../components/errorBoundary/errorBoundary'
import Footer from '../components/footer/Footer'
import styles from '../css/globals.css'

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultHead />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  )
}

export default App
