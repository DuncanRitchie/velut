import { Component, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/header/Header'
import LatinLink from '../../components/latinlink/LatinLink'
import subsitesStyles from '../../css/Subsites.module.css'
import manyStyles from '../../css/Many.module.css'
import searchStyles from '../../components/search/Search.module.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Redirect({newUrl, callback}) {
  const router = useRouter();

  useEffect(() => {
    //// Navigate only after the first render.
    //// The callback should prevent additional renders.
    router.push(newUrl, undefined, { shallow: true });
    callback();
  }, [])

  return <span>Redirecting…</span>
}

class ManyCSR extends Component {
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
            newUrl: '',
            redirectNeeded: false,
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
        this.setState({newUrl, redirectNeeded: true})
    }

    setTextAreaFromUrl = () => {
        this.setState({"input": this.props.search || ""}, () => {
            this.fetchWords(false);
        });
    }

    fetchWords = (urlShouldBeChanged = true) => {
        this.setState({redirectNeeded: false})
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
                    fetcher(`/api/word/isInDictionary?word=${word}`)
                        .then(response => {
                            let {allWords, pendingWords, foundWords, missingWords} = this.state
                            const foundWord = response.success ? response.word.Word : null;
                            //// If the word is in velut, the value of `foundWord` is that of the Word field, ie simply the macronized word.
                            //// If the word is not in velut, it will still be added to `allWords`, but its value will be `undefined`.
                            allWords.set(word, foundWord)
                            pendingWords?.delete(word)
                            if (response.success) {
                                foundWords.add(foundWord)
                            } else {
                                missingWords.add(word)
                            }
                            this.setState({allWords, pendingWords, foundWords, missingWords})
                        })
                        .catch(error => console.log(error));
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
        const searchChanged = this.props.search !== prevProps.search
        if (searchChanged) {
            this.setTextAreaFromUrl();
        }
    }

    render() {
        const foundWordsMapped
            = [...this.state.distinctWords].map((enteredWord, index) => {
                const foundWord = this.state.allWords.get(enteredWord)
                return foundWord
                    ? <Fragment key={index}><LatinLink linkBase="../" targetWord={foundWord}/> </Fragment>
                    : null
            })

        const missingWordsMapped
            = [...this.state.distinctWords].map((enteredWord, index) => {
                const foundWord = this.state.allWords.get(enteredWord)
                return foundWord || this.state.pendingWords.has(enteredWord)
                    ? null
                    : <Fragment key={index}><strong>{enteredWord}</strong> </Fragment>
            })

        const allWordsMapped
            = this.state.searchedWords
            ? this.state.searchedWords.map((word,index)=>{
                // If a result for it has been found, we render a LatinLink.
                const foundWord = this.state.allWords.get(word);
                if (foundWord) {
                    return <Fragment key={index}><LatinLink linkBase="../" targetWord={foundWord}/> </Fragment>
                }
                // Otherwise we don’t render a Link.
                else {
                    return <Fragment key={index}><strong>{word}</strong> </Fragment>
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
                    {foundWordsCount
                        ? <p lang="la">{foundWordsMapped}</p>
                        : (pendingWordsCount
                           ? <p>Please wait…</p>
                           : <p>Nothing you searched for is in velut!</p>)}

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
                                {pendingWordsCount ? "Please wait…" : "Everything you searched for is in velut!"}
                            </p>)}
                    <h2>All words entered</h2>
                    <p lang="la">{allWordsMapped}</p>
                </div>
            )
        }
        return (
            <div className="subwords fulmar-background subsite-home">
                <Header textBeforeTitle="Look-up of many words" />
                <div className={manyStyles.many}>
                    <p className={subsitesStyles.subsiteHomeRubric}>
                        Search for several Latin words by entering them into the box below!
                    </p>
                    {/* Form submission does not cause a full page reload if JavaScript is enabled. */}
                    <form className={searchStyles.search+" "+manyStyles.search} onSubmit={(e)=>e.preventDefault()}>
                        <textarea title="Type some Latin words into this box." name="search" value={this.state.input} onChange={this.textareaOnChange} lang="la"/>
                        <noscript>
                            <input hidden name="ssr" value="true" onChange="void()" />
                        </noscript>
                        <button className={searchStyles.searchButton} type="submit" onClick={this.fetchWords}>Search!</button>
                    </form>
                    {resultsAreRendered &&
                        (<div className={subsitesStyles.subsiteResult}>
                            {result}
                        </div>)}
                    {this.state.redirectNeeded && (
                        <Redirect
                          newUrl={this.state.newUrl}
                          callback={()=>{this.setState({redirectNeeded: false})}}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default ManyCSR;
