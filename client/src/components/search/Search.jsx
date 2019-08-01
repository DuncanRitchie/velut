import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import routes from '../../routes.json'
import "./Search.css"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.match.params.word || "",
            sanitisedInput: "",
            fromUrl: true,
            type: this.props.match.params.type || this.props.match.path.replace("/:word","").replace("/","") || "",
            dropdownAnimationClass: "dropdown-content-none"
        }
    }

    // This handles the <input> value.
    handleInput = (e) => {
        let input = e.target.value
        this.setState({input: input, fromUrl: false})
        // If special characters are input, we can get percent-encoding problems.
        // Let's correct for that.
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
        this.setState({dropdownAnimationClass: "dropdown-content-none"})
        this.props.history.push(newUrl)
    }

    // Initial value of sanitisedInput is "". Let's put something useful there.
    componentDidMount() {
        try {
            this.setState({sanitisedInput: decodeURIComponent(this.state.input)})
        } catch(err) {
            this.setState({sanitisedInput: this.state.input})
        }
        // The input is always initially focussed.
        document.getElementById("search-input").focus()
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
            inputValue = ""
            if (this.state.sanitisedInput) {
                inputValue = this.state.sanitisedInput
            }
        }
        // Let's work out what the dropdown-select should be.
        let selectedRouteObject = routes.find(route=>{return (route.route==="/"+this.state.type || route.route===this.state.type)})
        let dropdownSelect
        if (selectedRouteObject) {
            dropdownSelect = selectedRouteObject.searchFieldFull
        }
        // Let's create the dropdown menu items.
        let dropdownContent = routes.map((route,i)=>{
            return (
                <li 
                key={i} 
                className="dropdown-item" 
                tabIndex="0" 
                onClick={()=>{this.handleType(route.route)}} 
                onKeyUp={(e)=>{
                    if(e.keyCode===13){
                        this.handleType(route.route)
                    }
                }}
                >
                    {route.searchFieldFull}
                </li>
            )
        })
        // Now we're ready to return JSX.
        return (
            <div className="search">
                {/* The box the word will be typed into */}
                <input 
                    id="search-input"
                    className="search-input"
                    value={inputValue}
                    onChange={this.handleInput}
                    onKeyUp={this.handleKeyUp}
                    />
             
                <br/>
                {/* The button to load the new page. */}
                <button
                    className="search-link" 
                    tabIndex="0"
                    onClick={this.search} 
                    title={this.state.sanitisedInput ? `Search for ${this.state.sanitisedInput}` : "Please type something in the searchbar"}
                    >Search!
                </button>
                <br/>
                {/* The menu to change the rhyme type displayed
                Only appears if neither /subwords nor /about is in the path. */}
                {this.props.match.path.substr(0,9)==="/subwords" || this.props.match.path==="/about"
                 ? null
                  : ( 
                    <div 
                    className="dropdown" 
                    onMouseLeave={()=>{this.handleDropdown("dropdown-content-close")}} 
                    onFocus={()=>this.handleDropdown("dropdown-content-open")}
                    >
                        <p 
                        className="dropdown-select" 
                        tabIndex={this.state.dropdownAnimationClass==="open" ? "0" : ""}
                        onMouseOver={()=>this.handleDropdown("dropdown-content-open")} 
                        onFocus={()=>this.handleDropdown("dropdown-content-open")}
                        onClick={()=>this.handleDropdown("dropdown-content-open")}
                        >
                            {dropdownSelect}
                        </p>
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