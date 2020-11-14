import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Title from '../../components/title/Title'
import AdvancedSearch from './AdvancedSearch'
import axios from "../../axios/axios"
import '../Subsites.css'

// <Advanced/> is a JSX element rendered at /advanced/:input

class Advanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.location.search,
            results: [],
            loading: false
        }
    }

    fetchWords() {
        this.setState({loading: true})
        axios.getAdvanced(this.state.search).then((data)=>{
            // data.data is an array of objects with a Word field.
            this.setState({results: data.data})
            this.setState({loading: false})
        })     
    }

    componentDidMount() {
        this.fetchWords(this.props.location.search)
    }

    componentDidUpdate() {
        if (this.state.search !== this.props.location.search) {
            let search = this.props.location.search
            this.setState({search: search})
            this.fetchWords(search)
        }
    }

    render() {
        let input = this.state.input
        document.title = "Advanced of “"+input+"” on velut"

        let mappedWords = []
        if (this.state.results) {
            mappedWords = this.state.results.map((word,index)=>{
                return <span key={index} lang="la"><strong>{word.Word}</strong> </span>
            })
        }
        let result = null
        if (this.state.loading) {
            result = (<p>Loading advanced&hellip;&nbsp; This can take a minute.</p>)
        }
        else if (mappedWords.length) {
            result = (
                <div>
                    <p>Here {mappedWords.length === 1 ? "is the 1 Latin word" : `are the ${mappedWords.length} Latin words`} that fit the search.</p>
                    <p>{mappedWords}</p>
                </div> 
            )
        }
        else {
            result = (
                <p>No results found!</p>
            )
        }
        return (
            <div className="advanced fulmar-background">
                <Title textBeforeTitle="Advanced" />
                <div>
                    <AdvancedSearch/>
                    <div className="subsite-result">
                        {result}
                    </div>
                </div>
            </div>
        )
    }
}

export default Advanced