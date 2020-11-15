import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import routes from '../../routes.json'
import "./Search.css"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.match.params.word || this.props.match.params.word || "",
            sanitisedInput: "",
            fromUrl: true,
            type: this.props.match.params.type || this.props.match.path.replace("/:word","").replace("/about","").replace("/","") || "",
            dropdownAnimationClass: "dropdown-content-none"
        }
    }

    // This handles the <input> value.
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
            document.getElementById("search-input").blur()
        }
        else {
            document.getElementById("search-input").focus()
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
        // Let’s work out what the dropdown-select should be.
        let selectedRouteObject = routes.find(route=>{return (route.route==="/"+this.state.type || route.route===this.state.type)})
        let dropdownSelect
        if (selectedRouteObject) {
            dropdownSelect = selectedRouteObject.searchFieldFull
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
                        className="dropdown-item"
                    >
                        <button
                            title={"Select to return "+route.searchFieldFull.toLowerCase()}
                            onClick={()=>{this.handleType(route.route)}}
                            disabled={menuDisabled}
                        >
                            {route.searchFieldFull}
                        </button>
                    </li>
                )
            })
        // Now we’re ready to return JSX.
        return (
            <div id="search">
                {/* The box the word will be typed into. */}
                <input 
                    id="search-input"
                    value={inputValue}
                    onChange={this.handleInput}
                    onKeyUp={this.handleKeyUp}
                    title={this.props.searchbarTitle || "Type something here"}
                    type="text"
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
                    tabIndex="0"
                    onClick={this.search} 
                    title={this.state.sanitisedInput ? `Search for “${this.state.sanitisedInput}”` : "Please type something in the searchbar"}
                >Search!
                </button>
                <br/>
                {/* The menu to change the rhyme type displayed.
                Only appears if neither /subwords nor /anagramphrases nor /about nor /english is in the path. */}
                {this.props.match.path.substr(0,9)==="/subwords"
                 || this.props.match.path.substr(0,15)==="/anagramphrases"
                 || this.props.match.path.substr(0,8)==="/english"
                 || this.props.match.path==="/about"
                 ? null
                  : ( 
                    <div id="dropdown" onMouseLeave={this.handleDropdownMouseLeave}>
                        <button 
                            id="dropdown-select"
                            onClick={this.handleDropdownClick}
                            title={dropdownSelectTitle}
                            aria-haspopup="true"
                            aria-expanded={!menuDisabled}
                        >
                            <p>{dropdownSelect}</p>
                            <p id="dropdown-arrow"></p>
                        </button>
                        <ul className={this.state.dropdownAnimationClass}>
                            {dropdownContent}
                        </ul>
                    </div>
                )}
                
            </div>
        )
    }
}

export default withRouter(Search)