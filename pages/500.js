import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'

const FiveHundred = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>
          Internal server error on velut — a Latin rhyming dictionary
        </title>
      </Head>
      <div className="home fulmar-background">
        <Header textBeforeTitle="Internal server error" />
        <Search type={type} searchbarLabel="Latin word" />
        <p className="homeRubric">
          <span>Please try another page or come back later!</span>
        </p>
      </div>
    </>
  )
}

export default FiveHundred
