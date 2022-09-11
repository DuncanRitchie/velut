import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import TextWithBackground from '../components/textWithBackground/TextWithBackground'
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
          {/* The space after the & is non-breaking */}
          <TextWithBackground text="Latin rhymes & more!" />
        </h1>
        <Search type={type} searchbarTitle="Type a Latin word" />
        <p className={styles.homeRubric}>
          <TextWithBackground text="Enter a Latin word in the searchbar above," />
          <br />
          <TextWithBackground text="or see the navigation bar below for other options." />
        </p>
      </div>
    </>
  )
}

export default Home
