import React, {Component} from "react";
import {Link} from "react-router-dom";

class Search extends Component {
    state = {
        search: ""
    }
    handleSearch = (e) => {
        this.setState({search: e.target.value})
    }
    render() {
        return (
            <div>
                <input value={this.state.search} onChange={this.handleSearch}></input>
                <Link to={"/"+this.state.search} title={`Search for ${this.state.search}`}>Search!</Link>    
            </div>
        )
    }
}

export default Search