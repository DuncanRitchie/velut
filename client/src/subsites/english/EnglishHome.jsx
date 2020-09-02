import React from 'react';
import Title from '../../components/title/Title'
import Search from '../../components/search/Search'
import '../Subsites.css'

const EnglishHome = () => {
    document.title = "English to Latin on velut"
    return (
        <div className="english subsite-home fulmar-background">
            <Title textBeforeTitle="English to Latin"/>
            <p>Enter something English and this will suggest Latin translations!</p>
            <Search prefix="english/" searchbarTitle="Type an English word" />
        </div>
    )
}

export default EnglishHome