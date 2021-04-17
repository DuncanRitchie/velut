import React from 'react';
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import '../Subsites.css'

const EnglishHome = () => {
    document.title = "English to Latin on velut — a Latin rhyming dictionary"
    return (
        <div className="english subsite-home fulmar-background">
            <Header textBeforeTitle="English to Latin"/>
            <p className="subsite-home-rubric">Enter something English and this will suggest Latin translations!</p>
            <Search prefix="english/" searchbarTitle="Type an English word" />
        </div>
    )
}

export default EnglishHome