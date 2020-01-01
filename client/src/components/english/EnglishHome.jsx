import React from 'react';
// import {Link} from 'react-router-dom'
import Title from '../title/Title'
import Search from '../search/Search'
import '../subwords/Subwords.css'

const EnglishHome = () => {
    document.title = "English to Latin on velut"
    return (
        <div className="english subwords-home">
            <Title textBeforeTitle="English to Latin"/>
            <p>Enter something English and this will return Latin translations!</p>
            <Search prefix="english/" />
        </div>
    )
}

export default EnglishHome