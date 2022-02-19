import {Component} from "react"
import Redirect from "../redirect/Redirect"
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
            dropdownAnimationClass: "dropdown-content-none",
            navigating: false,
            newUrl: "",
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

    // This handles the menu value.
    handleMenu = (e) => {
        this.setState({menu: e.target.value})
    }

    // This is to search when the enter key is pressed within the <input>.
    handleInputKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.search()
        }
    }

    // This toggles whether the dropdown menu is visible.
    handleDropdown = (animationClass) => {
        this.setState({dropdownAnimationClass: animationClass})
    }

    handleDropdownClick = () => {
        if (this.state.dropdownAnimationClass === "dropdown-content-open") {
            this.handleDropdown("dropdown-content-close");
        } else {
            this.handleDropdown("dropdown-content-open");
        }
    }

    // Handles keys pressed within the dropdown menu.
    handleDropdownKeyUp = (e) => {
        // Close the menu on Escape.
        if (e.keyCode === 27 ) {
            this.handleDropdown("dropdown-content-close");
        }
        // Arrow Up or Left
        else if (e.keyCode === 38 || e.keyCode === 37) {
            e.preventDefault(); // Not convinced preventDefault does anything; it’s supposed to stop window scrolling.
            console.log("Going up!")
            // Find the previous menu-item, or the last if we’re at the top of the menu.
            // If the menu isn’t open, there is no effect.
            const elemToFocus = document.querySelector("."+styles.dropdownContentOpen+" li:focus-within")?.previousSibling?.firstChild ?? document.querySelector("."+styles.dropdownContentOpen+" li:last-child button");
            console.log(elemToFocus ?? "null")
            elemToFocus?.focus();
        }
        // Arrow Down or Right
        else if (e.keyCode === 40 || e.keyCode === 39) {
            e.preventDefault(); // Not convinced preventDefault does anything; it’s supposed to stop window scrolling.
            console.log("Going down!")
            // Find the next menu-item, or the first if we’re at the bottom of the menu.
            // If the menu isn’t open, the menu is opened. (Ideally I’d want the first menu-item to be focussed, but this isn’t happening yet.)
            const elemToFocus = document.querySelector("."+styles.dropdownContentOpen+" li:focus-within ~ li button") ?? (this.handleDropdown("dropdown-content-open"), document.querySelector("."+styles.dropdownContentOpen+" li button"));
            console.log(elemToFocus ?? "null")
            elemToFocus?.focus();
        }
    }

    handleDropdownMouseLeave = () => {
        if (this.state.dropdownAnimationClass === "dropdown-content-open") {
            this.handleDropdown("dropdown-content-close");
        }
    }

    // This sets the selected route to the menu item clicked, 
    // hides the dropdown menu again, and returns focus to the input.
    handleType = (route) => {
        this.setState({type: route, dropdownAnimationClass: "dropdown-content-close"})
        document.getElementById("search-input").focus()
    }

    // search() calculates the new URL and triggers a redirect.
    search = () => {
        console.log("SEARCHING!")
        // let newUrl = "../../"
        let newUrl = ""

        const getType = () => {
            return "/" + (this.state.type ?? "")
        }
        const getInput = () => {
            if (this.state.sanitisedInput !== undefined) {
                return "/" + this.state.sanitisedInput
            }
            if (this.props.searchWord
             && this.props.searchWord !== "") {
                return "/" + this.props.searchWord
            }
            return ""
        }
        newUrl += getType() + getInput()
        newUrl = newUrl.replaceAll(/\/[\/\.]+/g, "/")

        this.setState({
            dropdownAnimationClass: "dropdown-content-none",
            newUrl: newUrl,
            navigating: true,
        })
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

    // // If the location changes we need new data.
    // componentDidUpdate(prevProps) {
    //     const locationChanged = this.props.location !== prevProps.location
    //     if (locationChanged) {
    //         const input = this.props.match.params.word || ""
    //         this.setState({fromUrl: true, input: input})
    //         try {
    //             this.setState({sanitisedInput: decodeURIComponent(input)})
    //         } catch {
    //         }
    //     }
    // }

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
        // Let’s do the title of dropdown-select.
        let dropdownSelectTitle = `“${dropdownSelect}” is selected; click to ${this.state.dropdownAnimationClass==="dropdown-content-open" ? "close" : "open"} the menu`;
        // Let’s create the dropdown menu items.
        let menuDisabled = this.state.dropdownAnimationClass!=="dropdown-content-open" ? true : false;
        let dropdownContent = routes
            .filter(route=>route.searchField!=null)
            .map((route,i)=>{
                return (
                    <li 
                        key={i} 
                        className={styles.dropdownItem+" search-dropdown-item"}
                    >
                        <button
                            title={"Select to return "+route.headingToDisplay.toLowerCase()}
                            onClick={()=>{this.handleType(route.route)}}
                            disabled={menuDisabled}
                            className="search-dropdown-item-button"
                            type="button"
                        >
                            {route.headingToDisplay}
                        </button>
                    </li>
                )
            })
        // Now we’re ready to return JSX.
        return (
            // <form className={styles.search} onSubmit={this.search}>
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

                <br/>
                {/* The button to load the new page. */}
                <button
                    className={styles.searchButton} 
                    tabIndex="0"
                    type="submit"
                    title={this.state.sanitisedInput ? `Search for “${this.state.sanitisedInput}”` : "Please type something in the searchbar"}
                >Search!
                </button>
                <br/>
                {/* The menu to change the rhyme type displayed.
                Only appears if neither /subwords nor /anagramphrases nor /about nor /english is in the path. */}
                {this.props.hideDropdown
                 ? null
                  : ( 
                    <div className={styles.dropdown}
                        onMouseLeave={this.handleDropdownMouseLeave}
                        onKeyUp={this.handleDropdownKeyUp}    
                    >
                        <button 
                            className={styles.dropdownSelect}
                            onClick={this.handleDropdownClick}
                            title={dropdownSelectTitle}
                            aria-haspopup="true"
                            aria-expanded={!menuDisabled}
                            type="button"
                        >
                            <p>{dropdownSelect}</p>
                            <div className={styles.dropdownArrow}></div>
                        </button>
                        <ul className={styles[this.state.dropdownAnimationClass]}>
                            {dropdownContent}
                        </ul>
                    </div>
                )}
                {/* {this.state.navigating
                    && <Redirect newUrl={this.state.newUrl} />} */}
            </form>
        )
    }
}

export default Search