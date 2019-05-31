import React from 'react';
import Search from './Search'
import Navbar from './Navbar'

const CountdownHome = () => {
    return (
        <div className="countdown-home">
            <h1><span className="title">velut</span> &mdash; Countdown</h1>
            <Navbar input="" currentPage="countdown"/>
            <p>This will help you find Latin words that can be made with the letters you specify. Type some letters below!</p>
            <Search prefix="countdown/" />
        </div>
    )
}

export default CountdownHome