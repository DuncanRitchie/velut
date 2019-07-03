import React from 'react';
// import Navbar from '../navbar/Navbar';
import WarningMessage from './WarningMessage';
import Search from '../search/Search';

let Home = () => {
    document.title = "Duncan Ritchie’s velut"
    return (
        <div className="home">
            <h1><span className="title">velut</span> &mdash; Vocābulōrum Excellentium Latīnōrum Ūtilēs Tabulae</h1>
            {/* <Navbar input="" currentPage="word"/> */}
            <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
            <p>Search for a Latin word using the searchbar below!</p>
            <WarningMessage />
            <Search prefix="" />
        </div>
    )
}

export default Home