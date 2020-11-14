import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Title from '../../components/title/Title'
import AdvancedSearch from './AdvancedSearch'
import axios from "../../axios/axios"
import '../Subsites.css'

// <Advanced/> is a JSX element rendered at /advanced/?<query>

class Advanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.location.search,
            advancedHome: (this.props.location.search === ""),
            results: [],
            loading: false
        }
    }

    setAdvancedHome() {
        this.setState({advancedHome: this.props.location.search === ""});
    }

    fetchWords(queryString) {
        this.setAdvancedHome()
        if (!this.state.advancedHome) {
            this.setState({loading: true})
            axios.getAdvanced(queryString).then((data)=>{
                // data.data is an array of objects with a Word field.
                this.setState({results: data.data})
                this.setState({loading: false})
            })    
        }
    }

    componentDidMount() {
        this.fetchWords(this.props.location.search)
    }

    componentDidUpdate() {
        if (this.state.search !== this.props.location.search) {
            let search = this.props.location.search
            this.setState({search: search})
            this.fetchWords(search);
        }
    }

    render() {
        if (this.state.advancedHome) {
            document.title = "Advanced search on velut"
            return (
                <div className="subsite-home advanced fulmar-background">
                    <Title textBeforeTitle="Advanced search"/>
                    <p>Search for Latin words that fit some criteria!</p>
                    <AdvancedSearch/>
                </div>
            )
        }
        else {
            document.title = "Advanced search on velut"
    
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
                    <Title textBeforeTitle="Advanced search" />
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
}

export default Advanced