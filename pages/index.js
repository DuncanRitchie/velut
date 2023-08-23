import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'

const Home = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>velut — a Latin rhyming dictionary</title>
      </Head>
      <div className="home fulmar-background-big">
        <Header />
        <h1 className="homeRubric">
          <span className="textWithBackground">
            Latin rhymes &amp;&nbsp;more!
          </span>
        </h1>
        <Search type={type} searchbarLabel="Latin word" />
        <p className="homeRubric">
          <span className="textWithBackground">
            Enter a Latin word in the searchbar&nbsp;above,
            <br />
            or see the navigation bar below for other options.
          </span>
        </p>
      </div>
    </>
  )
}

export default Home
