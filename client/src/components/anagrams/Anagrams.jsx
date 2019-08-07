import React, {Component} from 'react'
import Search from '../search/Search'
import axios from "../../axios/axios"
import noMacra from '../word/noMacra'

// <Anagrams/> is a JSX element rendered at /anagramphrases/:word

class Anagrams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.match.params.word,
            anagrams: [],
            loading: false
        }
    }

    fetchWords(input) {
        this.setState({loading: true})
        axios.getAnagrams(noMacra(input).toLowerCase().replace(/ /g,"")).then((data)=>{
            // data.data is a simple array of strings.
            this.setState({anagrams: data.data})
            this.setState({loading: false})
        })     
    }

    componentDidMount() {
        this.fetchWords(this.props.match.params.word)
    }

    componentDidUpdate() {
        if (this.state.input !== this.props.match.params.word) {
            let input = this.props.match.params.word
            this.fetchWords(input)
            this.setState({input: input})
        }
    }

    render() {
        let {input, anagrams, loading} = this.state
        document.title = "Anagrams of "+input+" on velut"

        let mappedAnagrams = []
        if (anagrams) {
            mappedAnagrams = anagrams.map((anagram,index)=>{
                return <span key={index} lang="la">{anagram}<br/></span>
            })
        }
        let result = null
        if (loading) {
            result = (<p>Loading anagrams&hellip;&nbsp; This can take a few minutes.</p>)
        }
        else if (mappedAnagrams.length) {
            result = (
                <div>
                    <p>Here {mappedAnagrams.length === 1 ? "is the 1 Latin anagram" : `are the ${mappedAnagrams.length} Latin anagrams`} of <strong>{input}</strong>.</p>
                    <p>{mappedAnagrams}</p>
                </div> 
            )
        }
        else {
            result = (
                <p>No anagrams found!&nbsp; Try a different input.</p>
            )
        }
        
        return (
            <div className="word">
                <h1><span className="title">velut</span> &mdash; Anagrams &mdash; {input}</h1>
                <p>Caution &mdash; searches longer than ten characters may take some minutes or fail completely. Anagrams longer than thirteen words will not be found.</p>
                <Search prefix="anagramphrases/" />
                {result}
            </div>
        )
    }
}

export default Anagrams