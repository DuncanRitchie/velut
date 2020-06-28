import React from 'react';
import Title from '../../components/title/Title'
import Search from '../../components/search/Search'
import '../Subsites.css'

const EnglishHome = () => {
    document.title = "English to Latin on velut"
    return (
        <div className="english subsite-home">
            <Title textBeforeTitle="English to Latin"/>
            <p>Enter something English and this will suggest Latin translations!</p>
            <p>NOT CURRENTLY WORKING, SORRY, I WILL FIX IT WHEN I CAN!</p>
            <Search prefix="english/" />
        </div>
    )
}

export default EnglishHome