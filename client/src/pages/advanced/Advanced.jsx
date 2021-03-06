import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/header/Header'
import AdvancedSearch from './AdvancedSearch'
import AdvancedRubricToggler from './AdvancedRubricToggler'
import axios from "../../axios/axios"
import macraToHyphens from "../../helpers/macraToHyphens"
import '../Subsites.css'

// <Advanced/> is a JSX element rendered at /advanced/?<query>

class Advanced extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: this.props.location.search,
            advancedHome: true,
            results: [],
            loading: false,
            error: false,
        }
    }

    // Determines whether we should be on the “advanced home” page
    // because a query has not been submitted (advancedHome = true),
    // or showing results for a query that has been submitted
    // (advancedHome = false).
    // This boolean is set in state, and also returned from this method.
    setAdvancedHome() {
        const typedQueryInputs = this.props.location.search
            .replace(/sort=\w*/g, "")
            .replace(/elision=\w*/g, "")
            .replace(/[?&]/g, "");
        const isAdvancedHome = typedQueryInputs === "";
        this.setState({advancedHome: isAdvancedHome});
        return isAdvancedHome;
    }

    fetchWords(queryString) {
        const isAdvancedHome = this.setAdvancedHome()
        if (!isAdvancedHome) {
            this.setState({loading: true, error: false});
            axios.getAdvanced(queryString)
            .then((data)=>{
                // data.data is an array of objects with a Word field.
                this.setState({results: data.data})
                this.setState({loading: false, error: false})
            })
            .catch(()=>{
                this.setState({loading: false, error: true});
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
        document.title = "Advanced Search on velut — a Latin rhyming dictionary"

        if (this.state.advancedHome) {
            return (
                <div className="subsite-home advanced fulmar-background">
                    <Header textBeforeTitle="Advanced Search"/>
                    <AdvancedRubricToggler/>
                    <AdvancedSearch autofocus={true}/>
                </div>
            )
        }
        else {
            let mappedWords = []
            if (this.state.results) {
                // Render a Link and a space for every word.
                mappedWords = this.state.results.map((word,index)=>{
                    return (
                        <Fragment key={index}><Link
                            lang="la"
                            to={`../${macraToHyphens(word.Word)}`}
                            title={word.Word}
                        >
                            <strong>{word.Word}</strong>
                        </Link> </Fragment>
                    )
                })
            }
            let result = null
            if (this.state.error) {
                result = (<p>There was an error! Please try a different search.</p>)
            }
            else if (this.state.loading) {
                result = (<p>Loading words…</p>)
            }
            else if (mappedWords.length) {
                result = (
                    <div>
                        <p>Here {mappedWords.length === 1 ? "is the 1 Latin word that fits" : `are the ${mappedWords.length} Latin words that fit`} the search.</p>
                        <p>{mappedWords}</p>
                    </div> 
                )
            }
            else {
                result = (
                    <p>No results found! Please try a different search.</p>
                )
            }
            return (
                <div className="advanced fulmar-background">
                    <Header textBeforeTitle="Advanced Search" />
                    <div>
                        <AdvancedRubricToggler/>
                        <AdvancedSearch autofocus={false}/>
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