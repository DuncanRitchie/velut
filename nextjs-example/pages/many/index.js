import React, {Component, Fragment} from 'react'
import Head from 'next/head'
import Redirect from '../../components/redirect/Redirect'
import Header from '../../components/header/Header'
import LatinLink from '../../components/latinlink/LatinLink'
import findMany from '../api/words/many'
import subsitesStyles from '../../css/Subsites.module.css'
import manyStyles from '../../css/Many.module.css'
import searchStyles from '../../components/search/Search.module.css'

// <Many/> is a JSX element rendered at /many/?search=:input

class Many extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.search,
            navigating: false,
            newUrl: "",
        }
    }

    textareaOnChange = (event) => {
        this.setState({input: event.target.value});
    }

    splitInputIntoWords = () => {
        const input = this.state.input;
        const searchedWords = input
            .replace(/[^A-Za-zĀāĒēĪīŌōŪūȲȳËëÏïÉáéíóúýÁüṻḗ.:-]+/g, " ")
            .split(" ")
            .filter(word=>word!=="");
        return searchedWords;
    }

    // search() calculates the new URL and pushes it to the react-router history.
    // The Search and AdvancedSearch components have a similar method.
    search = (event) => {
        //// For some reason `preventDefault` works on Search but not here or on Advanced Search.
        // event.preventDefault()
        const searchedWordsAsString = this.splitInputIntoWords().join(" ");
        const urlParams = new URLSearchParams([["search", searchedWordsAsString]]);
        const newUrl = `many/?${urlParams}`;
        console.log({newUrl})

        this.setState({
            newUrl: newUrl,
            navigating: true,
        })
    }

    /* My velut-dictionary-links site generates links to several Latin websites, based on the "words" parameter in the query-string. */
    getHrefForDictionaryLinks(wordsToGetLinksFor) {
        const dictionaryLinksQuery = new URLSearchParams([["words", wordsToGetLinksFor.join(" ")]]);
        return `https://www.duncanritchie.co.uk/velut-dictionary-links/?${dictionaryLinksQuery}`;
    }

    render() {
        let resultJSX = null;
        if (!this.props.isHomepage) {
            const foundWords = [...this.props.allDistinctWordObjects].filter(result => result.success).map(result => result.word)
            const foundWordsJSX
                = foundWords.map((foundWord, index) => {
                    return <Fragment key={index}><LatinLink linkBase="../" targetWord={foundWord}/> </Fragment>
                })

            const missingWords = [...this.props.allDistinctWordObjects].filter(result => !result.success).map(result => result.search)
            const missingWordsJSX
                = missingWords.map((missingWord, index) => {
                    return <Fragment key={index}><strong>{missingWord}</strong> </Fragment>
                })

            const allWordsJSX
                = this.props.allWordObjects
                ? this.props.allWordObjects.map((result,index)=>{
                    // If a result for it has been found, we render a LatinLink.
                    if (result.success) {
                        return <Fragment key={index}><LatinLink linkBase="../" targetWord={result.word}/> </Fragment>
                    }
                    // Otherwise we don’t render a Link.
                    else {
                        return <Fragment key={index}><strong>{result.search}</strong> </Fragment>
                    }
                })
                : []

            const foundWordsCount    = foundWords.length
            const missingWordsCount  = missingWords.length
            const distinctWordsCount = this.props.allDistinctWordObjects.length

            resultJSX = (
                <div>
                    <p>
                        Showing results for all of the {distinctWordsCount} {distinctWordsCount === 1 ? "word" : "words"} you entered.
                    </p>
                    
                    <h2>Words in velut ({foundWordsCount})</h2>
                    {foundWordsCount
                        ? <p lang="la">{foundWordsJSX}</p>
                        : <p>Nothing you searched for is in velut!</p>}

                    <h2>Words not in velut ({missingWordsCount})</h2>
                    {missingWordsCount
                       ? (<>
                            <p lang="la">{missingWordsJSX}</p>
                            {/* My velut-dictionary-links site generates links to several Latin websites. */}
                            <p>
                                <a target="_blank" rel="noopener noreferrer" href={this.getHrefForDictionaryLinks(missingWords)} title="External webpage linking to other dictionaries (opens in new tab)">
                                    Look up the missing {missingWordsCount === 1 ? "word": "words"} in other dictionaries.
                                </a>
                            </p></>)
                        : (<p>
                            Everything you searched for is in velut!
                        </p>)}
                    <h2>All words entered</h2>
                    <p lang="la">{allWordsJSX}</p>
                </div> 
            )
        }
        return (
            <div className="subwords fulmar-background subsite-home">
                <Head>
                    <title>
                        Look-up of many words on velut — a Latin rhyming dictionary
                    </title>
                </Head>
                <Header textBeforeTitle="Look-up of many words" />
                <div className={manyStyles.many}>
                    <p className={subsitesStyles.subsiteHomeRubric}>
                        Search for several Latin words by entering them into the box below!
                    </p>
                    <form className={searchStyles.search+" "+manyStyles.search} onSubmit={this.search}>
                        <textarea title="Type some Latin words into this box." value={this.state.input} onChange={this.textareaOnChange} lang="la"/>
                        <button className={searchStyles.searchButton} type="submit">Search!</button>
                    </form>
                    {!this.props.isHomepage &&
                        (<div className={subsitesStyles.subsiteResult}>
                            {resultJSX}
                        </div>)}
                </div>
                {this.state.navigating
                    && <Redirect newUrl={this.state.newUrl} />}
            </div>
        )
    }
}

export default Many

export async function getServerSideProps(props) {
    const { query } = props

    if (
        query.search
    ) {
        console.log(query)
        const results = await findMany(query.search)
        console.log(results)
        return { props: {
            ...query,
            ...results,
            isHomepage: false,
        }}
    }
    else {
        return { props: {
            isHomepage: true,
            query,
        }}
    }
}
