import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Title from '../../components/title/Title'
import Search from '../../components/search/Search'
import axios from "../../axios/axios"
import noMacra from '../../components/word/noMacra'
import delChars from './delChars'
import randomCountdownQuestionWeighted from './randomCountdownQuestionWeighted'
import '../Subsites.css'

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
        axios.getSubwords(noMacra(input).toLowerCase()).then((data)=>{
            // data.data is a simple array of strings.
            this.setState({subwords: data.data})
            this.setState({loading: false})
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
        document.title = "Subwords of “"+input+"” on velut"

        let mappedWords = []
        if (this.state.subwords) {
            mappedWords = this.state.subwords.map((word,index)=>{
                // If we can delete from the input all the letters of the word and still have letters left over, we render a Link.
                let remainingLetters = delChars(noMacra(input),noMacra(word))
                if (remainingLetters) {
                    return <span key={index}><Link to={"./"+remainingLetters} title={"delete “"+word+"” from “"+input+"” to leave “"+remainingLetters+"”"} lang="la">{word}</Link> </span>
                }
                // Otherwise the word is an anagram of input and we don't render a Link.
                else {
                    return <span key={index} lang="la"><strong>{word}</strong> </span>
                }
            })
        }
        let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
        let result = null
        if (this.state.loading) {
            result = (<p>Loading subwords&hellip;&nbsp; This can take a minute.</p>)
        }
        else if (mappedWords.length) {
            result = (
                <div>
                    <p>Here {mappedWords.length === 1 ? "is the 1 Latin word" : `are the ${mappedWords.length} Latin words`}  that can be made out of letters in “{input}”.&nbsp; You can click on a word (if it&rsquo;s not a perfect anagram) to delete its letters from “{input}”.</p>
                    <p>{mappedWords}</p>
                </div> 
            )
        }
        else {
            result = (
                <p>No subwords found!&nbsp; Try a different input, such as <Link to={"./"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
            )
        }
        return (
            <div className="subwords fulmar-background">
                <Title textBeforeTitle="Subwords" />
                <div>
                    <Search prefix="subwords/"/>
                    <div className="subsite-result">
                        {result}
                    </div>
                </div>
            </div>
        )
    }
}

export default Subwords