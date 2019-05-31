import React from 'react';
import Search from './Search'

const CountdownHome = () => {
    return (
        <div className="countdown-home">
            <h1><span className="title">velut</span> &mdash; Countdown</h1>
            <p>This will help you find Latin words that can be made with the letters you specify. Type some letters after /countdown/ in the address bar!</p>
            <Search prefix="countdown/" />
        </div>
    )
}

export default CountdownHome