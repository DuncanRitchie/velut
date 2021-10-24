import React from 'react';
import {Link} from 'react-router-dom'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import randomCountdownQuestionWeighted from './randomCountdownQuestionWeighted'
import '../Subsites.css'

const SubwordsHome = () => {
    document.title = "Subwords on velut — a Latin rhyming dictionary"
    let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
    return (
        <div className="subsite-home subwords fulmar-background">
            <Header textBeforeTitle="Subwords"/>
            <p className="subsite-home-rubric">This will help you find Latin words that can be made with the letters you specify. Type some letters below!</p>
            <Search prefix="subwords/" searchbarTitle="Type something to find subwords of" lang="zxx" />
            <p className="subsite-home-rubric">Alternatively, search for a random string: <Link to={"/subwords/"+randomCountdownQuestionExample} title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</Link>.</p>
        </div>
    )
}

export default SubwordsHome