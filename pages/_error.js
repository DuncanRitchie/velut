import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import styles from '../css/Home.module.css'

const ErrorPage = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>Error on velut — a Latin rhyming dictionary</title>
      </Head>
      <div className={styles.home + ' fulmar-background'}>
        <Header textBeforeTitle="Error" />
        <Search
          type={type}
          searchbarLabel="Latin word"
          searchbarTitle="Type a Latin word"
        />
        <p className={styles.homeRubric}>
          <span>Please try searching for something else!</span>
        </p>
      </div>
    </>
  )
}

export default ErrorPage
