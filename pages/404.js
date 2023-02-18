import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import styles from '../css/Home.module.css'

const FourOFour = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>Page not found on velut — a Latin rhyming dictionary</title>
      </Head>
      <div className={styles.home + ' fulmar-background'}>
        <Header textBeforeTitle="Page not found" />
        <Search type={type} searchbarLabel="Latin word" />
        <p className={styles.homeRubric}>
          <span>Please try searching for something else!</span>
        </p>
      </div>
    </>
  )
}

export default FourOFour
