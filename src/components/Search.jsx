import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import "./Search.css"

class Search extends Component {
    state = {
        input: window.location.pathname.replace("/",""),
        redirect: false
    }
    handleInput = (e) => {
        this.setState({input: e.target.value})
    }
    
    handleKeyUp = (e) => {
        if (e.keyCode === 13 ) {
            this.setState({redirect: true})
        }
    }

    setStateRedirect = () => {
        this.setState({redirect: false})
    }

    render() {
        if (this.state.redirect) {
            this.setStateRedirect()
            return <Redirect to={`/${this.state.input}`} push={true}/>
        }
        else {
            return (
                <div>
                    <input value={this.state.input} onChange={this.handleInput} onKeyUp={this.handleKeyUp}></input>
                    <Link to={"/"+this.state.input} title={`Search for ${this.state.input}`}>Search!</Link>    
                </div>
            )
        }
    }
}

export default Search