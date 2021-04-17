import React, {Component} from 'react'
import Header from '../../components/header/Header'
import LatinLink from '../../components/latinlink/LatinLink'
import axios from "../../axios/axios"
import '../Subsites.css'
import './Many.css'

// <Many/> is a JSX element rendered at /many/:input

class Many extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            searchedWords: [],
            allWords: new Map(),
            distinctWords: new Set(),
            pendingWords: new Set(),
            countWordsLoading: 0,
            foundWords: [],
            missingWords: [],
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
        console.log(searchedWords);
        this.setState({searchedWords});
        return searchedWords;
    }

    fetchWords = () => {
        console.log("Fetching words...")
        const searchedWords = this.splitInputIntoWords();
        //// searchedWords may contain duplicates.
        //// pendingWords and distinctWords should initially be the same set of distinct words that were entered.
        //// pendingWords’ being a set means we can delete words from it when they are no longer pending.
        //// distinctWords needs to be an array so it can be mapped over in the render method.
        const pendingWords = new Set(searchedWords)
        const distinctWords = [...pendingWords]
        this.setState({
            countWordsLoading: distinctWords.length,
            distinctWords,
            pendingWords,
            foundWords: [],
            missingWords: [],
        }, ()=>{
            distinctWords.forEach(word => {
                if (!this.state.allWords.has(word)) {
                    axios.getOneWordSelectOnlyWord(word)
                        .then(response => {
                            const foundWord = response.data.Word
                            let {allWords, pendingWords, foundWords, missingWords} = this.state
                            allWords.set(word, foundWord)
                            pendingWords?.delete(word)
                            if (foundWord) {
                                foundWords.push(word)
                            } else {
                                missingWords.push(word)
                            }
                            this.setState({allWords, pendingWords, foundWords, missingWords})
                        });
                    }
                }
            )
        })
    }

    // componentDidMount() {
    //     this.fetchWords(this.props.match.params.word)
    // }

    // componentDidUpdate() {
    //     if (this.state.input !== this.props.match.params.word) {
    //         let input = this.props.match.params.word
    //         this.setState({input: input})
    //         this.fetchWords(input)
    //     }
    // }

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
        let result = null
        if (allWordsMapped.length) {
            const foundWordsCount = this.state.foundWords.length
            const missingWordsCount = this.state.missingWords.length
            result = (
                <div>
                    <h2>Words in velut ({foundWordsCount})</h2>
                    <p>{foundWordsCount ? foundWordsMapped : "None of the words are in velut!"}</p>
                    <h2>Words not in velut ({missingWordsCount})</h2>
                    <p>{missingWordsCount ? missingWordsMapped : "All of the words are in velut!"}</p>
                    <h2>All words entered</h2>
                    <p>{allWordsMapped}</p>
                </div> 
            )
        }
        else {
            result = (
                <p>Please enter some words into the box above!</p>
            )
        }
        return (
            <div className="subwords fulmar-background">
                <Header textBeforeTitle="Look-up of many words" />
                <div>
                    <textarea title="Type something to find subwords of" value={this.state.input} onChange={this.textareaOnChange}/>
                    <button type="submit" onClick={this.fetchWords}>Search!</button>
                    <div className="subsite-result">
                        {result}
                    </div>
                </div>
            </div>
        )
    }
}

export default Many