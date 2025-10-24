import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import styles from '../css/Home.module.css'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'

const ErrorPage = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>Error on velut — a Latin rhyming dictionary</title>
      </Head>
      <div className={styles.home + ' fulmar-background'}>
        <Header textBeforeTitle="Error" />
        <Search type={type} searchbarLabel="Latin word" />
        <p className={styles.homeRubric}>
          <span>Please try searching for something else!</span>
        </p>
      </div>
    </>
  )
}

// Send props to Sentry.
ErrorPage.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData)

  return Error.getInitialProps(contextData)
}

export default ErrorPage
