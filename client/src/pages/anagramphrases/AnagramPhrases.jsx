import React, {Component, Fragment} from 'react'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import axios from "../../axios/axios"
import noMacra from '../../helpers/noMacra'
import '../Subsites.css'

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
            // data.data is a simple array of strings, eg ['fēlēs','flēs ē','fel ēs','fel es','fel sē', …]
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
        document.title = "Anagrams of “"+input+"” on velut — a Latin rhyming dictionary"

        let mappedAnagrams = []
        if (anagrams) {
            mappedAnagrams = anagrams.map((anagram,index)=>{
                return <Fragment key={index}>{anagram.replace(/\./g," ")}<br/></Fragment>
            })
        }
        let result = null
        if (loading) {
            result = (<p>Loading anagrams…&nbsp; This can take a few minutes.</p>)
        }
        else if (anagrams[0]==="Internal server error") {
            result = <p>There was an error in fetching your anagrams! Please try again later, or try another search.</p>
        }
        else if (mappedAnagrams.length) {
            result = (
                <div>
                    <p>Here {mappedAnagrams.length === 1 ? "is the 1 Latin anagram" : `are the ${mappedAnagrams.length} Latin anagrams`} of <strong lang="zxx">{input}</strong>.</p>
                    <p lang="la">{mappedAnagrams}</p>
                </div> 
            )
        }
        else {
            result = (
                <p>No anagrams found!&nbsp; Try a different input.</p>
            )
        }

        return (
            <div className="anagram-phrases fulmar-background">
                <Header textBeforeTitle="Anagram phrases" />
                <p className="subsite-home-rubric">Caution — searches may take some minutes or fail completely.</p>
                <Search prefix="anagramphrases/" searchbarTitle="Type something to find anagrams of" lang="zxx" />
                <div className="subsite-result">
                    {result}
                </div>
            </div>
        )
    }
}

export default Anagrams