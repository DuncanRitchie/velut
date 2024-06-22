import Header from '../components/header/Header'
import Search from '../components/search/Search'
import styles from '../css/Home.module.css'

export const metadata = { title: 'velut — a Latin rhyming dictionary' }

export default function Page({ type = '/' }) {
  return (
    <>
      <div className={styles.home + ' fulmar-background-big'}>
        <Header />
        <h1 className={styles.homeRubric + 'textWithBackground'}>
          <span className="textWithBackground">
            Latin rhymes &amp;&nbsp;more!
          </span>
        </h1>
        <Search type={type} searchbarLabel="Latin word" />
        <p className={styles.homeRubric}>
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
