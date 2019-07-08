import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import "./Search.css"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            sanitisedInput: "",
            menu: "Perfect rhyme",
            redirect: false,
            fromUrl: true
        }
    }

    // This handles the <input> value.
    handleInput = (e) => {
        let input = e.target.value
        this.setState({input: input, fromUrl: false})
        // If special characters are input, we can get percent-encoding problems.
        // Let's correct for that.
        if (input.search("%")>-1) {
            input = decodeURIComponent(input)
        }
        this.setState({sanitisedInput: input})
    }

    // This handles the menu value.
    handleMenu = (e) => {
        this.setState({menu: e.target.value})
    }
    
    // This is to search when the enter key is pressed within the <input>.
    handleKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.setState({redirect: true, fromUrl: true})
        }
    }

    render() {
        // This gives warnings in the console because we're setting state within the render method. 
        // We need to set state back to redirect:false to avoid infinite redirects.
        if (this.state.redirect) {
            this.setState({redirect: false})
            return <Redirect to={{pathname: `/${this.props.prefix}${this.state.input}`, state: {input: window.location.pathname.replace("/",""), redirect: false}}} push={true}/>
        }
        else {
            return (
                <div className="search">
                    {/* The box the word will be typed into */}
                    <input 
                     className="search-input"
                     value={ this.state.fromUrl ? decodeURIComponent(window.location.pathname.replace("/lemma/","").replace("/countdown","").replace("/anagrams","").replace("/","")) : this.state.sanitisedInput }
                     onChange={this.handleInput}
                     onKeyUp={this.handleKeyUp}
                     />
                    {/* The menu to change the rhyme type displayed NOT HAVING AN EFFECT YET*/}
                    {/* <div className="dropdown">
                        <input
                        className="menu-input"
                        value={this.state.menu}
                        onChange={this.handleMenu}
                        />
                        <div className="dropdown-content">
                            <Link className="dropdown-link" to={"/perfect/"+this.state.input}>Perfect rhyme</Link>
                            <Link className="dropdown-link" to={"/rvfc/"+this.state.input}>Rhyme vowels and final consonants</Link>
                            <Link className="dropdown-link" to={"/ecclesperfect/"+this.state.input}>Ecclesiastical perfect rhyme</Link>
                            <Link className="dropdown-link" to={"/consonyms/"+this.state.input}>All consonants (consonyms)</Link>
                        </div>
                    </div> */}
                    {/* What would be a "submit" button in a normal form */}
                    <Link
                     className="search-link" 
                     to={"/"+this.props.prefix+this.state.input} 
                     title={this.state.sanitisedInput==="" ? "Please type a Latin word in the searchbar" : `Search for ${this.state.sanitisedInput}`}
                     >Search!</Link>    
                </div>
            )
        }
    }
}

export default Search