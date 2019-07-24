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
            type: this.props.match.params.type || "",
            dropdownOpen: false
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
    handleDropdown = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }

    // This sets the selected route to the menu item clicked and hides the dropdown menu again.
    handleType = (route) => {
        this.setState({type: route, dropdownOpen: false})
    }

    // search() calculates the new URL and pushes it to the react-router history.
    search = () => {
        let newUrl = "../../"
        // newUrl = window.location.protocol+"//"+window.location.hostname
        // if (window.location.port) {
        //     newUrl += ":"+window.location.port
        // }
        // newUrl += "/"
        let type = this.state.type
        if(type===undefined) {
            type = ""
        }
        let input = this.state.input
        if(input===undefined) {
            input = ""
        }
        newUrl += type+"/"+input
        this.setState({dropdownOpen: false})
        this.props.history.push(newUrl)
    }

    componentDidMount() {
        try {
            this.setState({sanitisedInput: decodeURIComponent(this.state.input)})
        } catch(err) {
            this.setState({sanitisedInput: this.state.input})
        }
    }

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
            return <span key={i} className="dropdown-link" onClick={()=>{this.handleType(route.route)}}>{route.searchFieldFull}</span>
        })
        // Now we're ready to return JSX.
        return (
            <div className="search">
                {/* The box the word will be typed into */}
                <input 
                    className="search-input"
                    value={inputValue}
                    onChange={this.handleInput}
                    onKeyUp={this.handleKeyUp}
                    />
             
                <br/>
                {/* What would be a "submit" button in a normal form */}
                <span
                    className="search-link" 
                    onClick={this.search} 
                    title={this.state.sanitisedInput ? `Search for ${this.state.sanitisedInput}` : "Please type something in the searchbar"}
                    >Search!
                </span>
                <br/>
                {/* The menu to change the rhyme type displayed NOT HAVING AN EFFECT YET*/}
                <div className="dropdown">
                    <p className="dropdown-selected" onClick={this.handleDropdown}>
                        {dropdownSelect}
                    </p>
                    {this.state.dropdownOpen ? (<div className="dropdown-content">
                        {dropdownContent}
                    </div>) : null}
                </div>
            </div>
        )
    }
}

export default withRouter(Search)