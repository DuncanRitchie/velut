import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Search from '../search/Search'
import Navbar from '../navbar/Navbar'
import words from '../../data/words_8fields.json'
// import axios from "../../axios/axios"
import delChars from './delChars'
import subwords from './subwords'
import randomCountdownQuestionWeighted from './randomCountdownQuestionWeighted'

// <Countdown/> is a JSX element rendered at /countdown/:input

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allWords: []
        }
    }

    fetchWords() {
        // axios.getWords({"Length": 4}).then((data)=>{this.setState({allWords: data.data})})
        this.setState({allWords: words})
    }

    componentDidMount() {
        this.fetchWords()
    }

    render() {
        let input = window.location.pathname.replace("/countdown","").replace("/","")
        document.title = "Subwords of "+input+" on velut"

        let mappedWords = []
        if (this.state.allWords.length) {
            if (this.state.allWords[0].Word) {
                let sortedWordObjects = subwords(input,this.state.allWords)
                mappedWords = sortedWordObjects.map((word,index)=>{
                    if (delChars(input,word.AlphOrderNoMacra)) {
                        return <span key={index}><Link to={"./"+delChars(input,word.AlphOrderNoMacra)} title={"delete "+word.Word+" from "+input}>{word.Word}</Link> </span>
                    }
                    else {
                        return <span key={index}><strong>{word.Word}</strong> </span>
                    }
                })
            }
        }
        
        let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
        return (
            <div className="word">
                <h1><span className="title">velut</span> &mdash; Countdown &mdash; {input}</h1>
                <Navbar input={input} currentPage="countdown"/>
                <div>
                    <Search prefix="countdown/"/>
                    {mappedWords.length ? (
                        <div>
                            <p>Here {mappedWords.length === 1 ? "is the 1 Latin word" : `are the ${mappedWords.length} Latin words`}  that can be made out of letters in {input}. You can click on a word (other than a perfect anagram) to delete its letters from {input}.</p>
                            <p>{mappedWords}</p>
                        </div>
                    ) : (
                        <p>No words found! Try a different input, such as <Link to={"./"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
                    )}
                </div>
            </div>
        )
    }
}

export default Countdown