import React from 'react';
import Title from "../title/Title"
// import Navbar from '../navbar/Navbar'
import Search from '../search/Search';

let Home = () => {
    document.title = "Duncan Ritchie’s velut"
    return (
        <div className="home">
            <Title />
            {/* <Navbar input="" currentPage="word"/> */}
            <p className="home-rubric">Search for a Latin word using the searchbar below!</p>
            <Search prefix="" />
        </div>
    )
}

export default Home