import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Search.css"

class Search extends Component {
    state = {
        search: window.location.pathname.replace("/","")
    }
    handleSearch = (e) => {
        this.setState({search: e.target.value})
    }
    render() {
        return (
            <form>
                <input value={this.state.search} onChange={this.handleSearch}></input>
                <Link to={"/"+this.state.search} title={`Search for ${this.state.search}`}>Search!</Link>    
            </form>
        )
    }
}

export default Search