import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import "./Search.css"

class Search extends Component {
    state = {
        input: window.location.pathname.replace("/",""),
        redirect: false
    }

    // This handles the <input> value.
    handleInput = (e) => {
        this.setState({input: e.target.value})
    }
    
    // This is to search when the enter key is pressed within the <input>.
    handleKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.setState({redirect: true})
        }
    }

    render() {
        // This gives warnings in the console because we're setting state within the render method. 
        // We need to set state back to redirect:false to avoid infinite redirects.
        if (this.state.redirect) {
            this.setState({redirect: false})
            return <Redirect to={{pathname: `/${this.state.input}`, state: {input: window.location.pathname.replace("/",""), redirect: false}}} push={true}/>
        }
        else {
            return (
                <div className="search">
                    <input className="searchInput" value={this.state.input} onChange={this.handleInput} onKeyUp={this.handleKeyUp}></input>
                    <Link className="searchLink" to={"/"+this.state.input} title={`Search for ${this.state.input}`}>Search!</Link>    
                </div>
            )
        }
    }
}

export default Search