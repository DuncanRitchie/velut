import {Component} from "react"
import searchStyles from '../search/Search.module.css'
import advancedStyles from './AdvancedSearch.module.css'

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spelling: {
                unsanitised: props.query.spelling || "",
                sanitised: props.query.spelling || "",
            },
            scansion: {
                unsanitised: props.query.scansion || "",
                sanitised: props.query.scansion || "",
            },
            elision: props.query.elision === "on",
            sort: props.query.sort || "alphabetical",
        }
    }

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

    // Let’s set our state so inputs can get their values from the URL.
    componentDidMount() {
        // The first input is initially focussed if a query has not started.
        if (this.props.autofocus) {
            document.getElementById("spelling-input").focus();
        }
    }

    render() {
        // Now we’re ready to return JSX.
        return (
            <form className={advancedStyles.advancedSearch+" "+searchStyles.search}>
                <div>
                    <div id="advanced-search-spelling">
                        <p>
                            <label htmlFor="spelling-input">Spelling:</label>
                            <input 
                                id="spelling-input"
                                name="spelling"
                                value={this.state.spelling.unsanitised}
                                onChange={this.handleInput}
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
                </div>

                {/* The button to load the new page. */}
                <button
                    id="search-button"
                    className={searchStyles.searchButton}
                    type="submit"
                    title={this.state.sanitisedInput ? `Search for “${this.state.sanitisedInput}”` : "Please type something in the searchbar"}
                >Search!
                </button>
            </form>
        )
    }
}

export default AdvancedSearch
