import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import styles from '../css/Home.module.css'

const Home = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>velut — a Latin rhyming dictionary</title>
      </Head>
      <div className={styles.home + ' fulmar-background-big'}>
        <Header />
        <h1 className={styles.homeRubric}>
          <span>Latin rhymes &amp;&nbsp;more!</span>
        </h1>
        <Search type={type} searchbarTitle="Type a Latin word" />
        <p className={styles.homeRubric}>
          <span>Enter a Latin word in the searchbar above,</span>
          <br />
          <span>or see the navigation bar below for other options.</span>
        </p>
      </div>
    </>
  )
}

export default Home
