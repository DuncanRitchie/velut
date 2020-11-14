import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import routes from '../../routes.json'
import "../../components/search/Search.css"

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.match.params.word || this.props.match.params.word || "",
            sanitisedInput: "",
            fromUrl: true,
        }
    }// This handles the <input> value.
    handleInput = (e) => {
        let input = e.target.value
        this.setState({input: input, fromUrl: false})
        // If special characters are input, we can get percent-encoding problems.
        // Let’s correct for that.
        try {
            input = decodeURIComponent(input) || ""
            this.setState({sanitisedInput: input})
        } catch(err) {
            input = e.target.value
            this.setState({sanitisedInput: input})
        }
    }
    
    // This is to search when the enter key is pressed within the <input>.
    handleKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.search()
        }
    }

    // This sets the selected route to the menu item clicked, 
    // hides the dropdown menu again, and returns focus to the input.
    handleType = (route) => {
        this.setState({type: route, dropdownAnimationClass: "dropdown-content-close"})
        document.getElementById("search-input").focus()
    }

    // search() calculates the new URL and pushes it to the react-router history.
    search = () => {
        let newUrl = "../../"
        let type = this.state.type
        if(type===undefined) {
            type = ""
        }
        let input = this.state.input
        if(input===undefined) {
            input = ""
        }
        newUrl += type+"/"+input
        newUrl = newUrl.replace("//","/")
        this.setState({dropdownAnimationClass: "dropdown-content-none"})
        this.props.history.push(newUrl)
    }

    // Initial value of sanitisedInput is "". Let’s put something useful there.
    componentDidMount() {
        try {
            this.setState({sanitisedInput: decodeURIComponent(this.state.input)})
        } catch(err) {
            this.setState({sanitisedInput: this.state.input})
        }
        // The input is always initially focussed, unless the page is About.
        if (this.props.match.path === "/about") {
            document.getElementById("spelling-input").blur()
        }
        else {
            document.getElementById("spelling-input").focus()
        }
    }

    // If the location changes we need new data.
    componentDidUpdate(prevProps) {
        const locationChanged = this.props.location !== prevProps.location
        if (locationChanged) {
            const input = this.props.match.params.word
            this.setState({fromUrl: true, input: input, sanitisedInput: input})
            try {
                this.setState({sanitisedInput: decodeURIComponent(input)})
            } catch(err) {
            }
        }
    }

    render() {
        // Let’s work out what the value of the input should be.
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
            inputValue = ""
            if (this.state.sanitisedInput) {
                inputValue = this.state.sanitisedInput
            }
        }
        // Now we’re ready to return JSX.
        return (
            <div id="search">
                {/* The box the word will be typed into. */}
                <input 
                    id="spelling-input"
                    value={inputValue}
                    onChange={this.handleInput}
                    onKeyUp={this.handleKeyUp}
                    title="Letters that will be in the words returned"
                    lang="la"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />
             
                <br/>
                {/* The button to load the new page. */}
                <button
                    id="search-button" 
                    onClick={this.search} 
                    title={this.state.sanitisedInput ? `Search for “${this.state.sanitisedInput}”` : "Please type something in the searchbar"}
                >Search!
                </button>
            </div>
        )
    }
}

export default withRouter(AdvancedSearch)