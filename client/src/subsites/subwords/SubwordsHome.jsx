import React from 'react';
import {Link} from 'react-router-dom'
import Title from '../../components/title/Title'
import Search from '../../components/search/Search'
import randomCountdownQuestionWeighted from './randomCountdownQuestionWeighted'
import '../../pages/Subsites.css'

const SubwordsHome = () => {
    document.title = "Subwords on velut"
    let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
    return (
        <div className="subsite-home subwords fulmar-background">
            <Title textBeforeTitle="Subwords"/>
            <p>This will help you find Latin words that can be made with the letters you specify. Type some letters below!</p>
            <Search prefix="subwords/" searchbarTitle="Type something to find subwords of" />
            <p>Alternatively, search for a random string: <Link to={"/subwords/"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
        </div>
    )
}

export default SubwordsHome