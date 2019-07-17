import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Title from '../title/Title'
import Search from '../search/Search'
// import Navbar from '../navbar/Navbar'
import axios from "../../axios/axios"
import noMacra from '../word/noMacra'
import delChars from './delChars'
import findSubwords from './findSubwords'
import randomCountdownQuestionWeighted from './randomCountdownQuestionWeighted'

// <Subwords/> is a JSX element rendered at /subwords/:input

class Subwords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.match.params.word,
            subwords: [],
            loading: false
        }
    }

    fetchWords(input) {
        this.setState({loading: true})
        axios.getWordsShorterThan(input.length).then((data)=>{
            let words = data.data
            if (words[0]) {
                if (words[0].Word) {
                    let sortedWords = findSubwords(input, words)
                    sortedWords = sortedWords.map((object)=>{return object.Word})
                    this.setState({subwords: sortedWords})
                    this.setState({loading: false})
                }
            }
            else {
                console.log(words)
                this.setState({loading: false})
            }
        })
               
    }

    componentDidMount() {
        this.fetchWords(this.props.match.params.word)
    }

    componentDidUpdate() {
        if (this.state.input !== this.props.match.params.word) {
            let input = this.props.match.params.word
            this.setState({input: input})
            this.fetchWords(input)
        }
    }

    render() {
        let input = this.state.input
        document.title = "Subwords of "+input+" on velut"

        let mappedWords = []
        if (this.state.subwords) {
            mappedWords = this.state.subwords.map((word,index)=>{
                if (delChars(input,noMacra(word))) {
                    return <span key={index}><Link to={"./"+delChars(input,noMacra(word))} title={"delete "+word+" from "+input}>{word}</Link> </span>
                }
                else {
                    return <span key={index}><strong>{word}</strong> </span>
                }
            })
        }
        let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
        let result = null
        if (this.state.loading) {
            result = (<p>Loading subwords&hellip; This can take a minute.</p>)
        }
        else if (mappedWords.length) {
            result = (
                <div>
                    <p>Here {mappedWords.length === 1 ? "is the 1 Latin word" : `are the ${mappedWords.length} Latin words`}  that can be made out of letters in {input}. You can click on a word (other than a perfect anagram) to delete its letters from {input}.</p>
                    <p>{mappedWords}</p>
                </div> 
            )
        }
        else {
            result = (
                <p>No words found! Try a different input, such as <Link to={"./"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
            )
        }
        return (
            <div className="subwords">
                <Title textBeforeTitle="Subwords" />
                <h1>{input}</h1>
                {/* <Navbar input={input} currentPage="Subwords"/> */}
                <div>
                    <Search prefix="subwords/"/>
                    {result}
                </div>
            </div>
        )
    }
}

export default Subwords