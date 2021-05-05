import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../../components/header/Header'
import LatinLink from '../../components/latinlink/LatinLink'
import axios from "../../axios/axios"
import '../Subsites.css'
import './Many.css'
import '../../components/search/Search.css'

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

    setUrlFromInput = (searchedWordsArray) => {
        const searchedWordsAsString = searchedWordsArray.join(" ");
        const urlParams = new URLSearchParams([["search", searchedWordsAsString]]);
        const newUrl = `../../many/?${urlParams}`;
        this.props.history.push(newUrl);
    }

    setTextAreaFromUrl = () => {
        const urlParams = new URLSearchParams(this.props.location.search);
        this.setState({"input": urlParams.get("search") || ""}, () => {
            this.fetchWords(false);
        });
    }

    fetchWords = (urlShouldBeChanged = true) => {
        const searchedWords = this.splitInputIntoWords();
        //// `searchedWords` may contain duplicates.
        //// `pendingWords` and distinctWords should initially be the same set of distinct words that were entered.
        //// Because `pendingWords`’ is a set, we can delete words from it when they are no longer pending.
        //// `distinctWords` needs to be an array so it can be mapped over in the render method.
        const pendingWords = new Set(searchedWords)
        const distinctWords = [...pendingWords]
        if (urlShouldBeChanged) {
            this.setUrlFromInput(searchedWords);
        }
        this.setState({
            distinctWords,
            pendingWords,
            foundWords: new Set(),
            missingWords: new Set(),
        }, ()=>{
            distinctWords.forEach(word => {
                //// If words from previous searches are in `allWords`, we don’t need to re-fetch them,
                //// but they need to be re-added to `foundWords` and `missingWords`.
                if (this.state.allWords.has(word)) {
                    let {pendingWords, foundWords, missingWords} = this.state
                    pendingWords.delete(word)
                    //// `word` will be in `allWords` as `undefined` if it’s not in velut
                    if (this.state.allWords.get(word)) {
                        foundWords.add(word)
                    }
                    else {
                        missingWords.add(word)
                    }
                    this.setState({pendingWords, foundWords, missingWords})
                }
                //// New words need to be fetched from the back-end.
                else {
                    axios.getOneWordSelectOnlyWord(word)
                        .then(response => {
                            const foundWord = response.data.Word
                            let {allWords, pendingWords, foundWords, missingWords} = this.state
                            //// If the word is in velut, the value of `foundWord` is that of the Word field, ie simply the macronized word.
                            //// If the word is not in velut, it will still be added to `allWords`, but its value will be `undefined`.
                            allWords.set(word, foundWord)
                            pendingWords?.delete(word)
                            if (foundWord) {
                                foundWords.add(word)
                            } else {
                                missingWords.add(word)
                            }
                            this.setState({allWords, pendingWords, foundWords, missingWords})
                        });
                    }
                }
            )
        })
    }

    /* My velut-dictionary-links site generates links to several Latin websites, based on the "words" parameter in the query-string. */
    getHrefForDictionaryLinks() {
        const missingWordsAsArray = [...this.state.missingWords.values()]
        const dictionaryLinksQuery = new URLSearchParams([["words", missingWordsAsArray.join(" ")]]);
        return `https://www.duncanritchie.co.uk/velut-dictionary-links/?${dictionaryLinksQuery}`;
    }

    componentDidMount() {
        this.setTextAreaFromUrl();
        this.fetchWords(false);
    }

    componentDidUpdate(prevProps) {
        const searchChanged = this.props.location.search !== prevProps.location.search
        if (searchChanged) {
            this.setTextAreaFromUrl();
        }
    }

    render() {
        document.title = "Look-up of many words on velut — a Latin rhyming dictionary"

        const foundWordsMapped
            = [...this.state.distinctWords].map((enteredWord, index) => {
                const foundWord = this.state.allWords.get(enteredWord)
                return foundWord
                    ? <span key={index}><LatinLink linkBase="../" targetWord={foundWord}/> </span>
                    : null
            })

        const missingWordsMapped
            = [...this.state.distinctWords].map((enteredWord, index) => {
                const foundWord = this.state.allWords.get(enteredWord)
                return foundWord || this.state.pendingWords.has(enteredWord)
                    ? null
                    : <span key={index} lang="la"><strong>{enteredWord}</strong> </span>
            })

        const allWordsMapped
            = this.state.searchedWords
            ? this.state.searchedWords.map((word,index)=>{
                // If a result for it has been found, we render a LatinLink.
                const foundWord = this.state.allWords.get(word);
                if (foundWord) {
                    return <span key={index}><LatinLink linkBase="../" targetWord={foundWord}/> </span>
                }
                // Otherwise we don’t render a Link.
                else {
                    return <span key={index} lang="la"><strong>{word}</strong> </span>
                }
            })
            : []
        
        const resultsAreRendered = allWordsMapped.length > 0;
        let result = null;
        if (resultsAreRendered) {
            const foundWordsCount    = this.state.foundWords.size
            const missingWordsCount  = this.state.missingWords.size
            const allWordsCount      = this.state.distinctWords.length
            const pendingWordsCount  = this.state.pendingWords.size
            const proportionComplete = 1 - pendingWordsCount / allWordsCount

            result = (
                <div>
                    <p>
                        <label htmlFor="many-progress">
                            {pendingWordsCount
                            ? `Waiting for results for ${pendingWordsCount} ${pendingWordsCount === 1 ? "word" : "words"}…` 
                            : `Showing results for all of the ${allWordsCount} ${allWordsCount === 1 ? "word" : "words"} you entered.`}
                            <progress id="many-progress" max={1} value={proportionComplete}></progress>
                        </label>
                    </p>
                    
                    <h2>Words in velut ({foundWordsCount})</h2>
                    <p>{foundWordsCount
                        ? foundWordsMapped
                        : pendingWordsCount
                          ? "Please wait..."
                          : "Nothing you searched for is in velut!"}</p>
                    <h2>Words not in velut ({missingWordsCount})</h2>
                    {missingWordsCount
                       ? (<>
                            <p>{missingWordsMapped}</p>
                            {/* My velut-dictionary-links site generates links to several Latin websites. */}
                            <p>
                                <a target="_blank" rel="noopener noreferrer" href={this.getHrefForDictionaryLinks()} title="External webpage linking to other dictionaries (opens in new tab)">
                                    Look up the missing {missingWordsCount === 1 ? "word": "words"} in other dictionaries.
                                </a>
                            </p></>)
                        : (<p>
                                {pendingWordsCount ? "Please wait..." : "Everything you searched for is in velut!"}
                            </p>)}
                    <h2>All words entered</h2>
                    <p>{allWordsMapped}</p>
                </div> 
            )
        }
        return (
            <div className="subwords fulmar-background subsite-home">
                <Header textBeforeTitle="Look-up of many words" />
                <div className="many">
                    <p className="subsite-home-rubric">
                        Search for several Latin words by entering them into the box below!
                    </p>
                    <div className="search">
                        <textarea title="Type some Latin words into this box." value={this.state.input} onChange={this.textareaOnChange}/>
                        <button id="search-button" type="submit" onClick={this.fetchWords}>Search!</button>
                    </div>
                    {resultsAreRendered && 
                        (<div className="subsite-result">
                            {result}
                        </div>)}
                </div>
            </div>
        )
    }
}

export default withRouter(Many)