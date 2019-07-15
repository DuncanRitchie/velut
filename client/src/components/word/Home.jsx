import React from 'react';
import {Link} from 'react-router-dom';
import Title from "../title/Title"
// import Navbar from '../navbar/Navbar'
import Search from '../search/Search';

let Home = () => {
    document.title = "Duncan Ritchie’s velut"
    return (
        <div className="home">
            <Title />
            {/* <Navbar input="" currentPage="word"/> */}
            <p>Search for a Latin word using the searchbar below!</p>
            <p>For more information, see the <Link to="./about" title="About velut">about page</Link>.</p>
            <Search prefix="" />
        </div>
    )
}

export default Home