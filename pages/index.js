import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import styles from '../css/Home.module.css'

const splitIntoSpans = (text) => {
  return text
    .split(/(?<= )|(?= )/)
    .map((word) => (<>
      <span>{word}</span>
      <span aria-hidden='true'>{word}</span>
    </>))
}

const Home = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>velut — a Latin rhyming dictionary</title>
      </Head>
      <div className={styles.home + ' fulmar-background-big'}>
        <Header />
        <h1 className={styles.homeRubric}>
          {splitIntoSpans('Latin rhymes & more!')}
        </h1>
        <Search type={type} searchbarTitle="Type a Latin word" />
        <p className={styles.homeRubric}>
          {splitIntoSpans('Enter a Latin word in the searchbar above,')}
          <br />
          {splitIntoSpans('or see the navigation bar below for other options.')}
        </p>
      </div>
    </>
  )
}

export default Home
