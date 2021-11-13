import {Fragment} from 'react'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import getAnagrams from '../api/anagramphrases'
import styles from '../../css/Subsites.module.css'

// <Anagrams/> is a JSX element rendered at /anagramphrases/:word

const Anagrams = ({input, anagrams, loading, error}) => {
    let mappedAnagrams = []
    if (anagrams) {
        mappedAnagrams = anagrams.map((anagram,index)=>{
            return <Fragment key={index}>{anagram}<br/></Fragment>
        })
    }
    let result = null
    //// `loading` is not going to be true because of SSR,
    //// but I’m keeping it in, in case of future need.
    if (loading) {
        result = (<p>Loading anagrams…&nbsp; This can take a few minutes.</p>)
    }
    else if (error) {
        result = <p>There was an error in fetching your anagrams! Please try again later, or try another search.</p>
    }
    else if (mappedAnagrams.length) {
        result = (
            <div>
                <p>Here {mappedAnagrams.length === 1 ? "is the 1 Latin anagram" : `are the ${mappedAnagrams.length} Latin anagrams`} of <strong lang="zxx">{input}</strong>.</p>
                <p lang="la">{mappedAnagrams}</p>
            </div> 
        )
    }
    else {
        result = (
            <p>No anagrams found!&nbsp; Try a different input.</p>
        )
    }
    return (<>
        <Head>
            <title>
                Anagrams of “{input}” on velut — a Latin rhyming dictionary
            </title>
            <meta name="Description" content={`Latin multi-word anagrams of “${input}”`}/>
        </Head>
        <div className="anagram-phrases fulmar-background">
            <Header textBeforeTitle="Anagram phrases" />
            <p className={styles.subsiteHomeRubric}>Caution — searches may take some minutes or fail completely.</p>
            <Search
              type="/anagramphrases"
              searchWord={input}
              searchbarTitle="Type something to find anagrams of"
              lang="zxx"
              hideDropdown={true}
            />
            <div className={styles.subsiteResult}>
                {result}
            </div>
        </div>
    </>)
}

export default Anagrams

export async function getServerSideProps({ params }) {
    let input = params.word || ""
    //// If special characters are input, we can get percent-encoding problems.
    //// Let’s correct for that.
    if (input.search("%")>-1) {
        input = decodeURIComponent(input)
    }

    const anagramsObject = await getAnagrams(input)
    const { anagrams, error } = anagramsObject
    return { props: {
        input,
        anagrams,
        error,
    }}
}
