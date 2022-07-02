import { withRouter } from "next/router";
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
    handleSubmit = this.handleSubmit.bind(this)

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

    handleType = (e) => {
        this.setState({type: e.target.value})
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

    handleSubmit(e) {
        e.preventDefault();
        const router = this.props.router;
        const newLocation = `/${this.state.type}/${encodeURIComponent(this.state.input || '')}`.replace(/%2F/g, '/').replace(/\/+/, "/");
        router.push(newLocation);
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
        // Let’s create the dropdown menu items.
        const dropdownOptions = routes
            .filter(route => route.searchField != null)
            .map((route) => {
                return <option value={route.route} key={route.route}>{route.headingToDisplay}</option>
            })
        // Now we’re ready to return JSX.
        return (
            // If client doesn’t have JavaScript, `action` & `method` are used.
            // If client has JavaScript, the `onSubmit` is used.
            <form className={styles.search} action="/redirectonsearch" method="get" onSubmit={this.handleSubmit}>
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
                      <div className={styles.dropdown+" with-dropdown-arrow"}>
                        <select name="type" defaultValue={"/"+this.state.type} onChange={this.handleType}>
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

export default withRouter(Search)
