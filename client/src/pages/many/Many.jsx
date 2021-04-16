import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/header/Header'
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
            pendingWords: new Map(),
            countWordsLoading: 0,
        }
    }


    textareaOnChange = (event) => {
        this.setState({input: event.target.value});
    }

    splitInputIntoWords = () => {
        const input = this.state.input;
        const searchedWords = input.replace(/[^A-Za-zĀāĒēĪīŌōŪūȲȳËëÏïÉáéíóúýÁüṻḗ.:-]+/g, " ").split(" ");
        this.setState({searchedWords});
        return searchedWords;
    }

    fetchWords = () => {
        console.log("Fetching words...")
        const searchedWords = this.splitInputIntoWords();
        const distinctWords = new Set(searchedWords);
        this.setState({
            countWordsLoading: distinctWords.length,
            pendingWords: distinctWords,
        }, ()=>{
            distinctWords.forEach(word => {
            axios.getOneWordSelectOnlyWord(word)
                .then(response => {
                    console.log(response.data)
                    let {foundWords, pendingWords} = this.state;
                    foundWords.set(word, response.data.Word)
                    pendingWords.delete(word)
                    this.setState({foundWords, pendingWords})
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

        let mappedWords = []
        if (this.state.searchedWords) {
            mappedWords = this.state.searchedWords.map((word,index)=>{
                // If we can delete from the input all the letters of the word and still have letters left over, we render a Link.
                if (word) {
                    return <span key={index}><Link to={"./"+word} title={word} lang="la">{word}</Link> </span>
                }
                // Otherwise the word is an anagram of input and we don’t render a Link.
                else {
                    return <span key={index} lang="la"><strong>{word}</strong> </span>
                }
            })
        }
        let result = null
        if (this.state.loading) {
            result = (<p>Loading subwords…&nbsp; This can take a minute.</p>)
        }
        else if (mappedWords.length) {
            result = (
                <div>
                    <p>Here {mappedWords.length === 1 ? "is the 1 Latin word" : `are the ${mappedWords.length} Latin words`} that matched what you entered.</p>
                    <p>{mappedWords}</p>
                </div> 
            )
        }
        else {
            result = (
                <p>No words found!</p>
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