import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import { randomCountdownQuestionWeighted } from '../../lib/words/subwordsHelpers'
import styles from '../../css/Subsites.module.css'

const SubwordsHome = ({ randomCountdownQuestionExample }) => {
  return (
    <>
      <Head>
        <title>Subwords on velut — a Latin rhyming dictionary</title>
        <meta
          name="Description"
          content="Latin words made from the letters of what you enter"
        />
      </Head>
      <div className="fulmar-background">
        <Header textBeforeTitle="Subwords" />
        <p className={styles.subsiteHomeRubric}>
          This will help you find Latin words that can be made with the letters
          you specify. Type some letters below!
        </p>
        <Search
          type="subwords"
          searchbarLabel="Text to find subwords of"
          lang="zxx"
          hideDropdown={true}
        />
        <p className={styles.subsiteHomeRubric}>
          Alternatively, search for a random string:{' '}
          <Link href={'/subwords/' + randomCountdownQuestionExample}>
            {randomCountdownQuestionExample}
          </Link>
          .
        </p>
      </div>
    </>
  )
}

export default SubwordsHome

export async function getServerSideProps() {
  const randomCountdownQuestionExample = randomCountdownQuestionWeighted()
  return {
    props: {
      randomCountdownQuestionExample,
    },
  }
}
