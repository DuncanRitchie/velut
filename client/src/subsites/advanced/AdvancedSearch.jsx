import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import "../../components/search/Search.css"

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spelling: {
                unsanitised: "",
                sanitised: ""
            },
            scansion: {
                unsanitised: "",
                sanitised: ""
            },
            elision: {
                unsanitised: false,
                sanitised: false
            },
            sort: "alphabetical",
            fromUrl: true,
        }
    }// This handles the <input> value.
    handleInput = (e) => {
        const input = e.target.value;
        const name = e.target.name;
        // If special characters are input, we can get percent-encoding problems.
        // Let’s correct for that.
        let sanitisedInput;
        try {
            sanitisedInput = decodeURIComponent(input) || "";
        } catch {
            sanitisedInput = input;
        }
        let newState = {fromUrl: false};
        newState[name] = {
            unsanitised: input,
            sanitised: sanitisedInput
        };
        this.setState(newState);
    }
    
    // This is to search when the enter key is pressed within the <input>.
    handleKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.search()
        }
    }

    // When a radio button is checked, this updates state.
    handleRadioChange = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.value; // eg, state.sort = "alphabetical"
        this.setState(newState);
    }

    // search() calculates the new URL and pushes it to the react-router history.
    search = () => {
        let newUrl = "../../advanced/?"
        if (this.state.spelling.unsanitised) {
            newUrl = `${newUrl}spelling=${this.state.spelling.sanitised}`;
        }
        if (this.state.scansion.unsanitised) {
            newUrl = `${newUrl}&scansion=${this.state.scansion.sanitised}`;
        }
        if (this.state.elision.unsanitised) {
            newUrl = `${newUrl}&elision=${this.state.elision.sanitised}`;
        }
        if (this.state.sort) {
            newUrl = `${newUrl}&sort=${this.state.sort}`;
        }
        newUrl = newUrl.replace("?&","?");
        this.props.history.push(newUrl)
    }

    // Initial value of sanitisedInput is "". Let’s put something useful there.
    componentDidMount() {
        // The first input is always initially focussed.
        document.getElementById("spelling-input").focus()
    }

    // If the location changes we need new data.
    componentDidUpdate(prevProps) {
        const locationChanged = this.props.location !== prevProps.location
        if (locationChanged) {
            this.setState({fromUrl: true})
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
                {/* Form fields */}
                {/* <form> */}
                    <label htmlFor="spelling-input">Spelling:</label>
                    <input 
                        id="spelling-input"
                        name="spelling"
                        value={this.state.spelling.unsanitised}
                        onChange={this.handleInput}
                        onKeyUp={this.handleKeyUp}
                        title="Letters that will match the words returned"
                        lang="la"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    <br/>
                    <label htmlFor="scansion-input">Scansion:</label>
                    <input 
                        id="scansion-input"
                        name="scansion"
                        value={this.state.scansion.unsanitised}
                        onChange={this.handleInput}
                        onKeyUp={this.handleKeyUp}
                        title="Sequence of long and short syllables that will match the words returned"
                        lang="la"
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                    <br/>
                    <div>
                    <input
                        type="radio"
                        name="sort"
                        onChange={this.handleRadioChange}
                        id="sort-alphabetical"
                        value="alphabetical"
                    />
                    <label for="sort-alphabetical">Sort alphabetically</label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={this.handleRadioChange}
                        id="sort-classical"
                        value="classical"
                    />
                    <label for="sort-classical">Sort by classical rhyme</label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={this.handleRadioChange}
                        id="sort-ecclesiastical"
                        value="ecclesiastical"
                    />
                    <label for="sort-ecclesiastical">Sort by ecclesiastical rhyme</label>
                    </div>

                    {/* The button to load the new page. */}
                    <button
                        id="search-button" 
                        onClick={this.search} 
                        title={this.state.sanitisedInput ? `Search for “${this.state.sanitisedInput}”` : "Please type something in the searchbar"}
                    >Search!
                    </button>
                {/* </form> */}
            </div>
        )
    }
}

export default withRouter(AdvancedSearch)