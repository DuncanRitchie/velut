import React from 'react';
import {Link} from 'react-router-dom'
import Title from '../title/Title'
import Search from '../search/Search'
// import Navbar from '../navbar/Navbar'
import randomCountdownQuestionWeighted from './randomCountdownQuestionWeighted'

const SubwordsHome = () => {
    let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
    return (
        <div className="subwords-home">
            <Title textBeforeTitle="Subwords"/>
            {/* <Navbar input="" currentPage="subwords"/> */}
            <p>This will help you find Latin words that can be made with the letters you specify. Type some letters below!</p>
            <Search prefix="subwords/" />
            <p>Alternatively, search for a random string: <Link to={"./"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
        </div>
    )
}

export default SubwordsHome