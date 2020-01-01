import React from 'react';
import {Link} from 'react-router-dom'
import Title from '../title/Title'
import Search from '../search/Search'
import randomCountdownQuestionWeighted from './randomCountdownQuestionWeighted'
import './Subwords.css'

const SubwordsHome = () => {
    document.title = "Subwords on velut"
    let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
    return (
        <div className="subsite-home">
            <Title textBeforeTitle="Subwords"/>
            <p>This will help you find Latin words that can be made with the letters you specify. Type some letters below!</p>
            <Search prefix="subwords/" />
            <p>Alternatively, search for a random string: <Link to={"/subwords/"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
        </div>
    )
}

export default SubwordsHome