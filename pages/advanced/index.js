import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import Header from '../../components/header/Header'
import AdvancedRubricToggler from '../../components/advancedComponents/AdvancedRubricToggler'
import AdvancedSearch from '../../components/advancedComponents/AdvancedSearch'
import findAdvanced from '../api/words/advanced'
import { macraToHyphens } from '../api/diacritics'
import styles from '../../css/Subsites.module.css'

const Advanced = ({ query, isHomepage, words, error }) => {
    if (isHomepage) {
        return (<>
            <Head>
                <title>
                    Advanced Search on velut — a Latin rhyming dictionary
                </title>
            </Head>
            <div className={styles.subsiteHome + " advanced fulmar-background"}>
                <Header textBeforeTitle="Advanced Search"/>
                <AdvancedRubricToggler/>
                <AdvancedSearch autofocus={true} query={query}/>
            </div>
        </>)
    }
    else {
        let mappedWords = []
        if (words) {
            // Render a Link and a space for every word.
            mappedWords = words.map((word,index)=>{
                return (
                    <Fragment key={index}><Link href={`../${macraToHyphens(word)}`}>
                        <a lang="la"title={word}>
                            {word}
                        </a>
                    </Link> </Fragment>
                )
            })
        }
        let result = null
        if (error) {
            result = (<p>Results could not be found; please try a different search. {error}</p>)
        }
        else if (mappedWords.length) {
            result = (
                <div>
                    <p>Here {mappedWords.length === 1 ? "is the 1 Latin word that fits" : `are the ${mappedWords.length} Latin words that fit`} the search.</p>
                    <p>{mappedWords}</p>
                </div>
            )
        }
        else {
            result = (
                <p>No results found! Please try a different search.</p>
            )
        }
        return (<>
            <Head>
                <title>
                    Advanced Search on velut — a Latin rhyming dictionary
                </title>
            </Head>
            <div className={styles.advanced+" fulmar-background"}>
                <Header textBeforeTitle="Advanced Search" />
                <div>
                    <AdvancedRubricToggler/>
                    <AdvancedSearch autofocus={false} query={query}/>
                    <div className={styles.subsiteResult}>
                        {result}
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Advanced

export async function getServerSideProps(props) {
    const { query } = props

    if (
        query.scansion
        || query.spelling
    ) {
        const results = await findAdvanced(query)
        return { props: {
            isHomepage: false,
            query,
            ...results,
        }}
    }
    else {
        return { props: {
            isHomepage: true,
            query,
        }}
    }
}
