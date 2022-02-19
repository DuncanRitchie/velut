import {Component} from "react"
import routes from "../../data/routes.json"
import styles from "./Search.module.css"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.searchWord || "",
            sanitisedInput: "",
            fromUrl: true,
            type: this.props.type || "/",
        }
    }

    // This handles the <input> value.
    handleInput = (e) => {
        let input = e.target.value
        this.setState({input: input, fromUrl: false})
        // If special characters are input, we can get percent-encoding problems.
        // Let’s correct for that.
        try {
            const sanitisedInput = decodeURIComponent(input.trim()) || ""
            this.setState({sanitisedInput: sanitisedInput})
        } catch {
            console.log("Please do not input % signs!");
        }
    }

    // Initial value of sanitisedInput is "". Let’s put something useful there.
    componentDidMount() {
        try {
            this.setState({sanitisedInput: decodeURIComponent(this.state.input)})
        } catch {
        }
        // The input is initially focussed, unless the page is About or a query has started.
        if (this.state.input
            || !this.props.autofocus) {
            document.getElementById("search-input").blur()
        }
        else {
            document.getElementById("search-input").focus()
        }
    }

    render() {
        // Let’s work out what the value of the input should be.
        let inputValue = "";
        if (this.state.fromUrl) {
            if (this.props.searchWord) {
                inputValue = decodeURIComponent(this.props.searchWord)
            }
        }
        else if (this.state.input) {
            inputValue = this.state.input
        }
        // Let’s work out what the dropdown-select should be.
        let selectedRouteObject = routes.find(route=>{
            return (route.route===this.state.type || route.route==="/"+this.state.type)
        })
        let dropdownSelect
        if (selectedRouteObject) {
            dropdownSelect = selectedRouteObject.headingToDisplay
        }
        // Let’s create the dropdown menu items.
        const dropdownOptions = routes
            .filter(route => route.searchField != null)
            .map((route) => {
                return <option value={route.route} key={route.route}>{route.headingToDisplay}</option>
            })
        // Now we’re ready to return JSX.
        return (
            <form className={styles.search} action="/search" method="get">
                {/* The box the word will be typed into. */}
                <input 
                    id="search-input"
                    name="word"
                    value={inputValue}
                    onChange={this.handleInput}
                    onKeyUp={this.handleInputKeyUp}
                    title={this.props.searchbarTitle || "Type something here"}
                    type="text"
                    lang={this.props.lang || "la"}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />

                {/* The `type` parameter determines the type of results displayed on the page.
                If the dropdown menu should appear on the page, it will set `type`.
                Otherwise, `type` will come from a hidden <input> element.
                The latter happens if the path begins with /about, /english, /subwords, or /anagramphrases. */}
                {this.props.hideDropdown
                  ? (
                    <input name="type" type="hidden" value={this.props.type}></input>
                  )
                  : (
                      <div className={styles.dropdown}>
                        <select name="type" defaultValue={"/"+this.state.type}>
                            {dropdownOptions}
                        </select>
                      </div>
                )}

                {/* The button to load the new page. */}
                <button
                    className={styles.searchButton}
                    tabIndex="0"
                    type="submit"
                    title={this.state.sanitisedInput ? `Search for “${this.state.sanitisedInput}”` : "Please type something in the searchbar"}
                >Search!
                </button>
                <br/>
            </form>
        )
    }
}

export default Search