import React, {Component} from "react"
import { useRouter } from 'next/router'
import searchStyles from '../search/Search.module.css'
import advancedStyles from './AdvancedSearch.module.css'

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
            elision: false,
            sort: "alphabetical",
        }
    }

    // setStateFromUrl() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     this.setState({
    //         spelling: {
    //             unsanitised: query.get("spelling") || "",
    //             sanitised: query.get("spelling") || ""
    //         },
    //         scansion: {
    //             unsanitised: query.get("scansion") || "",
    //             sanitised: query.get("scansion") || ""
    //         },
    //         elision: query.get("elision") === "true",
    //         sort: query.get("sort") || "alphabetical",
    //     })
    // }

    // This handles the <input> value.
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
        let newState = {}
        newState[name] = {
            unsanitised: input,
            sanitised: sanitisedInput,
        }
        this.setState(newState);
    }

    // This is to search when the enter key is pressed within the <input>.
    handleKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.search()
        }
    }

    // When a checkbox is toggled, this updates state.
    handleCheckboxChange = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.checked; // eg, state.elision = true
        this.setState(newState);
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
        if (this.state.elision) {
            newUrl = `${newUrl}&elision=true`;
        }
        if (this.state.sort) {
            newUrl = `${newUrl}&sort=${this.state.sort}`;
        }
        newUrl = newUrl.replace("?&","?");
        console.log({newUrl})
        // this.props.history.push(newUrl)
    }

    // Let’s set our state so inputs can get their values from the URL.
    componentDidMount() {
        // this.setStateFromUrl();
        // The first input is initially focussed if a query has not started.
        if (this.props.autofocus) {
            document.getElementById("spelling-input").focus();
        }
    }

    // // If the location changes we need new data.
    // componentDidUpdate(prevProps) {
    //     const locationChanged = this.props.location !== prevProps.location
    //     if (locationChanged) {
    //         // this.setStateFromUrl();
    //     }
    // }

    render() {
        // Now we’re ready to return JSX.
        return (
            <div className="search advanced-search">
                {/* Form fields */}
                {/* <form> */}
                    <div id="advanced-search-spelling">
                        <p>
                            <label htmlFor="spelling-input">Spelling:</label>
                            <input 
                                id="spelling-input"
                                name="spelling"
                                value={this.state.spelling.unsanitised}
                                onChange={this.handleInput}
                                onKeyUp={this.handleKeyUp}
                                title="Letters that will match the words returned"
                                type="text"
                                lang="la"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                            />
                        </p>
                    </div>

                    <div id="advanced-search-scansion">
                        <p>
                            <label htmlFor="scansion-input">Scansion:</label>
                            <input 
                                id="scansion-input"
                                name="scansion"
                                value={this.state.scansion.unsanitised}
                                onChange={this.handleInput}
                                onKeyUp={this.handleKeyUp}
                                title="Sequence of long and short syllables that will match the words returned"
                                type="text"
                                lang="la"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                            />
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                name="elision"
                                onChange={this.handleCheckboxChange}
                                checked={this.state.elision}
                                id="elision-input"
                            />
                            <label htmlFor="elision-input">Allow elision?</label>
                        </p>
                    </div>
                    <div id="advanced-search-sort">
                        <p>
                            <input
                                type="radio"
                                name="sort"
                                onChange={this.handleRadioChange}
                                id="sort-alphabetical"
                                value="alphabetical"
                                checked={this.state.sort==="alphabetical"}
                            />
                            <label htmlFor="sort-alphabetical">Sort alphabetically</label>
                        </p>
                        <p>
                            <input
                                type="radio"
                                name="sort"
                                onChange={this.handleRadioChange}
                                id="sort-classical"
                                value="classical"
                                checked={this.state.sort==="classical"}
                            />
                            <label htmlFor="sort-classical">Sort by classical rhyme</label>
                        </p>
                        <p>
                            <input
                                type="radio"
                                name="sort"
                                onChange={this.handleRadioChange}
                                id="sort-ecclesiastical"
                                value="ecclesiastical"
                                checked={this.state.sort==="ecclesiastical"}
                            />
                            <label htmlFor="sort-ecclesiastical">Sort by ecclesiastical rhyme</label>
                        </p>
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

export default AdvancedSearch
