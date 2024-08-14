import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import styles from '../../css/Subsites.module.css'

const EnglishHome = () => {
  return (
    <>
      <Head>
        <title>English to Latin on velut — a Latin rhyming dictionary</title>
        <meta name="Description" content="Latin words for the English word you enter" />
      </Head>
      <div className="fulmar-background">
        <Header textBeforeTitle="English to Latin" />
        <p className={styles.subsiteHomeRubric}>Enter something English and this will suggest Latin translations!</p>
        <Search type="english" searchbarLabel="English word" lang="en" hideDropdown={true} />
      </div>
    </>
  )
}

export default EnglishHome
