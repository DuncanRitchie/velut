import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'

const FourOFour = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>Page not found on velut — a Latin rhyming dictionary</title>
      </Head>
      <div className="home fulmar-background">
        <Header textBeforeTitle="Page not found" />
        <Search type={type} searchbarLabel="Latin word" />
        <p className="homeRubric">
          <span>Please try searching for something else!</span>
        </p>
      </div>
    </>
  )
}

export default FourOFour
