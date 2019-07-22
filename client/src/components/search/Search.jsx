import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import "./Search.css"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            sanitisedInput: "",
            fromUrl: true
        }
    }

    // This handles the <input> value.
    handleInput = (e) => {
        let input = e.target.value
        this.setState({input: input, fromUrl: false})
        // If special characters are input, we can get percent-encoding problems.
        // Let's correct for that.
        try {
            input = decodeURIComponent(input)
            this.setState({sanitisedInput: input})
        } catch(err) {
            input = e.target.value
            this.setState({sanitisedInput: input})
        }
    }

    // This handles the menu value.
    handleMenu = (e) => {
        this.setState({menu: e.target.value})
    }
    
    // This is to search when the enter key is pressed within the <input>.
    handleKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.search()
        }
    }

    // search() calculates the new URL and pushes it to the react-router history.
    search = () => {
        let newUrl
        if (this.props.match.params.word) {
            newUrl = this.props.match.path.replace(":word",this.state.input)
        }
        else {
            newUrl = this.props.match.path+"/"+this.state.input
        }
        this.props.history.push(newUrl)
    }

    componentDidUpdate(prevProps) {
        const locationChanged = this.props.location !== prevProps.location
        if (locationChanged) {
            const input = this.props.match.params.word
            this.setState({fromUrl: true, input: input})
            try {
                this.setState({sanitisedInput: decodeURIComponent(input)})
            } catch(err) {
                this.setState({sanitisedInput: input})
            }
        }
    }

    render() {
        // Let's work out what the value of the input should be.
        let inputValue
        if (this.state.fromUrl) {
            if (this.props.match.params.word) {
                inputValue = decodeURIComponent(this.props.match.params.word)
            }
            else {
                inputValue = ""
            }
        }
        else {
            inputValue = this.state.sanitisedInput
        }
        // Now we're ready to return JSX.
        return (
            <div className="search">
                {/* The box the word will be typed into */}
                <input 
                    className="search-input"
                    value={ inputValue }
                    onChange={this.handleInput}
                    onKeyUp={this.handleKeyUp}
                    />
                {/* The menu to change the rhyme type displayed NOT HAVING AN EFFECT YET*/}
                {/* <div className="dropdown">
                    <input
                    className="menu-input"
                    value={this.state.menu}
                    onChange={this.handleMenu}
                    />
                    <div className="dropdown-content">
                        <Link className="dropdown-link" to={"/perfect/"+this.state.input}>Perfect rhyme</Link>
                        <Link className="dropdown-link" to={"/rvfc/"+this.state.input}>Rhyme vowels and final consonants</Link>
                        <Link className="dropdown-link" to={"/ecclesperfect/"+this.state.input}>Ecclesiastical perfect rhyme</Link>
                        <Link className="dropdown-link" to={"/consonyms/"+this.state.input}>All consonants (consonyms)</Link>
                    </div>
                </div> */}
                <br/>
                {/* What would be a "submit" button in a normal form */}
                <span
                    className="search-link" 
                    onClick={this.search} 
                    title={this.state.sanitisedInput==="" ? "Please type something in the searchbar" : `Search for ${this.state.sanitisedInput}`}
                    >Search!</span>    
            </div>
        )
    }
}

export default withRouter(Search)