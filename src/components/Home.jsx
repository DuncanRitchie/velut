import React from 'react';
import Search from './Search';

let Home = (props) => {
    return (
        <div className="home">
            <h1><span className="title">velut</span> &mdash; Vocābulōrum Excellentium Latīnōrum Ūtilēs Tabulae</h1>
            <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
            <p>Search for something Latin!</p>
            <Search />
        </div>
    )
}

export default Home