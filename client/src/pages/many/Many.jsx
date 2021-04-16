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
            foundWords: new Map(),
            pendingWords: new Set(),
            countWordsLoading: 0,
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
        const distinctWords = new Set(searchedWords)
        // const distinctWordsAsArray = [...distinctWords];
        this.setState({
            countWordsLoading: distinctWords.length,
            pendingWords: distinctWords,
            missingWords: [],
        }, ()=>{
            distinctWords.forEach(word => {
            axios.getOneWordSelectOnlyWord(word)
                .then(response => {
                    const foundWord = response.data.Word
                    let {foundWords, pendingWords, missingWords} = this.state
                    foundWords.set(word, foundWord)
                    pendingWords?.delete(word)
                    if (!foundWord) {
                        missingWords.push(word)
                    }
                    this.setState({foundWords, pendingWords, missingWords})
                });
            })
        })
        
        
        

        // axios.getOneWord.then((data)=>{
        //     // data.data is a simple array of strings.
        //     this.setState({subwords: data.data})
        //     this.setState({loading: false})
        // })
        // let emptyArrays = wordObject.LemmaArray.map((lemma,index)=>{
        //     return []
        // })
        // this.setState({formsArrays: emptyArrays})
        // // Next we map across LemmaArray, querying the database for each lemma and adding the results 
        // // to the correct element in the array in state as the results come in.
        // wordObject.LemmaArray.map((lemma,i)=>{
        //     axios.getWordsAlph({"LemmaArray": lemma}).then((data)=>{
        //         let forms = data.data
        //         forms = forms.map((form,index)=>{
        //             return form.Word
        //         })
        //         // console.log(forms)
        //         let formsArrays = this.state.formsArrays
        //         formsArrays[i] = forms
        //         this.setState({formsArrays: formsArrays})
        //     })
        //     return null
        // })
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

        const missingWordsMapped
            = this.state.missingWords.map((word, index)=>{
                return <span key={index} lang="la"><strong>{word}</strong> </span>
            })

        const allWordsMapped
            = this.state.searchedWords
            ? this.state.searchedWords.map((word,index)=>{
                // If a result for it has been found, we render a LatinLink.
                const foundWord = this.state.foundWords.get(word);
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
        if (this.state.loading) {
            result = (<p>Loading words…</p>)
        }
        else if (allWordsMapped.length) {
            result = (
                <div>
                    <h2>Words not in velut</h2>
                    <p>{missingWordsMapped.length ? missingWordsMapped : "All of the words are in velut!"}</p>
                    <h2>{allWordsMapped.length === 1 ? "One word entered" : `All ${allWordsMapped.length} words entered`}</h2>
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