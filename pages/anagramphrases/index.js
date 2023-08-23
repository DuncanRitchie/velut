import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'

const AnagramsHome = () => {
  return (
    <>
      <Head>
        <title>Anagram phrases on velut — a Latin rhyming dictionary</title>
        <meta
          name="Description"
          content={`Latin multi-word anagrams for the text you enter`}
        />
      </Head>
      <div className="fulmar-background">
        <Header textBeforeTitle="Anagram phrases" />
        <p className="subsiteHomeRubric">
          This will help you find Latin phrases that are anagrams!
        </p>
        <p className="subsiteHomeRubric">
          Caution — searches may take some minutes. Searches longer than ten
          characters may fail completely.
        </p>
        <Search
          type="anagramphrases"
          searchbarLabel="Text to find anagrams of"
          lang="zxx"
          hideDropdown={true}
        />
      </div>
    </>
  )
}

export default AnagramsHome
