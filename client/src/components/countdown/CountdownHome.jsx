import React from 'react';
import {Link} from 'react-router-dom'
import Search from '../search/Search'
import Navbar from '../navbar/Navbar'
import {randomCountdownQuestionWeighted} from './Countdown'

const CountdownHome = () => {
    let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
    return (
        <div className="countdown-home">
            <h1><span className="title">velut</span> &mdash; Countdown</h1>
            <Navbar input="" currentPage="countdown"/>
            <p>This will help you find Latin words that can be made with the letters you specify. Type some letters below!</p>
            <Search prefix="countdown/" />
            <p>Alternatively, search for a random string: <Link to={"./"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
        </div>
    )
}

export default CountdownHome