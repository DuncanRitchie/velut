import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'

const ErrorPage = ({ type = '/' }) => {
  return (
    <>
      <Head>
        <title>Error on velut — a Latin rhyming dictionary</title>
      </Head>
      <div className="home fulmar-background">
        <Header textBeforeTitle="Error" />
        <Search type={type} searchbarLabel="Latin word" />
        <p className="homeRubric">
          <span>Please try searching for something else!</span>
        </p>
      </div>
    </>
  )
}

export default ErrorPage
