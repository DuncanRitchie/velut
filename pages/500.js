import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import styles from '../css/Home.module.css'

const FiveHundred = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>
          Internal server error on velut — a Latin rhyming dictionary
        </title>
      </Head>
      <div className={styles.home + ' fulmar-background'}>
        <Header textBeforeTitle="Internal server error" />
        <Search type={type} searchbarTitle="Type a Latin word" />
        <p className={styles.homeRubric}>
          <span>Please try another page or come back later!</span>
        </p>
      </div>
    </>
  )
}

export default FiveHundred
