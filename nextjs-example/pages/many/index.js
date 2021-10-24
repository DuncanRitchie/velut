// import React from 'react';
// import Link from 'next/link'
// import Head from 'next/head'
// import Header from '../../components/header/Header'
// import Search from '../../components/search/Search'
// import styles from '../../css/Subsites.module.css'

// const Many = ({}) => {
//     return (<>
//         <Head>
//             <title>
//                 Subwords on velut — a Latin rhyming dictionary
//             </title>
//         </Head>
//     </>)
// }

import React, {Component, Fragment} from 'react'
import Head from 'next/head'
//import {withRouter} from 'react-router-dom'
import Redirect from '../../components/redirect/Redirect'
import Header from '../../components/header/Header'
import LatinLink from '../../components/latinlink/LatinLink'
import findMany from '../api/words/many'
import subsitesStyles from '../../css/Subsites.module.css'
import manyStyles from '../../css/Many.module.css'
import searchStyles from '../../components/search/Search.module.css'

// <Many/> is a JSX element rendered at /many/:input

class Many extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromUrl: true,
            input: "",
            searchedWords: [],
            allWords: new Map(),
            distinctWords: new Set(),
            pendingWords: new Set(),
            countWordsLoading: 0,
            foundWords: new Set(),
            missingWords: new Set(),
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
        this.setState({searchedWords});
        return searchedWords;
    }

    // setUrlFromInput = (searchedWordsArray) => {
    //     const searchedWordsAsString = searchedWordsArray.join(" ");
    //     const urlParams = new URLSearchParams([["search", searchedWordsAsString]]);
    //     const newUrl = `../../many/?${urlParams}`;
    //     this.s.history.push(newUrl);
    // }

    setTextAreaFromUrl = () => {
        const urlParams = new URLSearchParams(this.props.location.search);
        this.setState({"input": urlParams.get("search") || ""}, () => {
            this.fetchWords(false);
        });
    }

    // search() calculates the new URL and pushes it to the react-router history.
    search = (event) => {
        //// For some reason `preventDefault` works on Search but not here or on Advanced Search.
        // event?.preventDefault()
        const searchedWordsAsString = this.splitInputIntoWords().join(" ");
        const urlParams = new URLSearchParams([["search", searchedWordsAsString]]);
        const newUrl = `many/?${urlParams}`;
        console.log({newUrl})

        this.setState({
            newUrl: newUrl,
            navigating: true,
        })
    }

    // fetchWords = (urlShouldBeChanged = true) => {
    //     const searchedWords = this.splitInputIntoWords();
    //     //// `searchedWords` may contain duplicates.
    //     //// `pendingWords` and distinctWords should initially be the same set of distinct words that were entered.
    //     //// Because `pendingWords`’ is a set, we can delete words from it when they are no longer pending.
    //     //// `distinctWords` needs to be an array so it can be mapped over in the render method.
    //     const pendingWords = new Set(searchedWords)
    //     const distinctWords = [...pendingWords]
    //     if (urlShouldBeChanged) {
    //         //this.setUrlFromInput(searchedWords);
    //     }
    //     this.setState({
    //         distinctWords,
    //         pendingWords,
    //         foundWords: new Set(),
    //         missingWords: new Set(),
    //     }, ()=>{
    //         distinctWords.forEach(word => {
    //             //// If words from previous searches are in `allWords`, we don’t need to re-fetch them,
    //             //// but they need to be re-added to `foundWords` and `missingWords`.
    //             if (this.state.allWords.has(word)) {
    //                 let {pendingWords, foundWords, missingWords} = this.state
    //                 pendingWords.delete(word)
    //                 //// `word` will be in `allWords` as `undefined` if it’s not in velut
    //                 if (this.state.allWords.get(word)) {
    //                     foundWords.add(word)
    //                 }
    //                 else {
    //                     missingWords.add(word)
    //                 }
    //                 this.setState({pendingWords, foundWords, missingWords})
    //             }
    //             //// New words need to be fetched from the back-end.
    //             else {
    //                 // axios.getOneWordSelectOnlyWord(word)
    //                 //     .then(response => {
    //                 //         const foundWord = response.data.Word
    //                 //         let {allWords, pendingWords, foundWords, missingWords} = this.state
    //                 //         //// If the word is in velut, the value of `foundWord` is that of the Word field, ie simply the macronized word.
    //                 //         //// If the word is not in velut, it will still be added to `allWords`, but its value will be `undefined`.
    //                 //         allWords.set(word, foundWord)
    //                 //         pendingWords?.delete(word)
    //                 //         if (foundWord) {
    //                 //             foundWords.add(word)
    //                 //         } else {
    //                 //             missingWords.add(word)
    //                 //         }
    //                 //         this.setState({allWords, pendingWords, foundWords, missingWords})
    //                 //     });
    //                 }
    //             }
    //         )
    //     })
    // }

    /* My velut-dictionary-links site generates links to several Latin websites, based on the "words" parameter in the query-string. */
    getHrefForDictionaryLinks() {
        const dictionaryLinksQuery = new URLSearchParams([["words", this.props.missingWords.join(" ")]]);
        return `https://www.duncanritchie.co.uk/velut-dictionary-links/?${dictionaryLinksQuery}`;
    }

    // componentDidMount() {
    //     this.setTextAreaFromUrl();
    //     this.fetchWords(false);
    // }

    // componentDidUpdate(prevProps) {
    //     const searchChanged = this.props.location.search !== prevProps.location.search
    //     if (searchChanged) {
    //         this.setTextAreaFromUrl();
    //     }
    // }

    render() {
        console.log(this.props)
        const foundWordsMapped
            = [...this.props.foundWords].map((foundWord, index) => {
                return <Fragment key={index}><LatinLink linkBase="../" targetWord={foundWord}/> </Fragment>
            })

        const missingWordsMapped
            = [...this.props.missingWords].map((missingWord, index) => {
                return <Fragment key={index}><strong>{missingWord}</strong> </Fragment>
            })

        const allWordsMapped
            = this.props.allWords
            ? this.props.allWords.map((result,index)=>{
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
        
        const resultsAreRendered = this.props.allWords.length > 0;
        let result = null;
        if (resultsAreRendered) {
            const foundWordsCount    = this.props.foundWords.length
            const missingWordsCount  = this.props.missingWords.length
            const allWordsCount      = this.props.distinctWords.length
            // const pendingWordsCount  = this.props.pendingWords.size
            // const proportionComplete = 1 - pendingWordsCount / allWordsCount

            result = (
                <div>
                    <p>
                        <label htmlFor="many-progress">
                            Showing results for all of the {allWordsCount} {allWordsCount === 1 ? "word" : "words"} you entered.
                        </label>
                    </p>
                    
                    <h2>Words in velut ({foundWordsCount})</h2>
                    {foundWordsCount
                        ? <p lang="la">{foundWordsMapped}</p>
                        : <p>Nothing you searched for is in velut!</p>}

                    <h2>Words not in velut ({missingWordsCount})</h2>
                    {missingWordsCount
                       ? (<>
                            <p lang="la">{missingWordsMapped}</p>
                            {/* My velut-dictionary-links site generates links to several Latin websites. */}
                            <p>
                                <a target="_blank" rel="noopener noreferrer" href={this.getHrefForDictionaryLinks()} title="External webpage linking to other dictionaries (opens in new tab)">
                                    Look up the missing {missingWordsCount === 1 ? "word": "words"} in other dictionaries.
                                </a>
                            </p></>)
                        : (<p>
                            Everything you searched for is in velut!
                        </p>)}
                    <h2>All words entered</h2>
                    <p lang="la">{allWordsMapped}</p>
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
                    <form className={searchStyles.search} onSubmit={this.search}>
                        <textarea title="Type some Latin words into this box." value={this.state.input} onChange={this.textareaOnChange} lang="la"/>
                        <button className={searchStyles.searchButton} type="submit">Search!</button>
                    </form>
                    {resultsAreRendered && 
                        (<div className="subsite-result">
                            {result}
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
    //console.log(props)
    const { query } = props

    if (
        query.search
    ) {
        console.log(query)
        const results = await findMany(query.search)
        console.log(results)
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
