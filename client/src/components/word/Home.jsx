import React from 'react'
import Title from "../title/Title"
import Search from '../search/Search'

let Home = () => {
    document.title = "Duncan Ritchie’s velut"
    return (
        <div className="home">
            <Title />
            <p className="home-rubric">Search for a Latin word using the searchbar and menu below!</p>
            <Search prefix="" />
        </div>
    )
}

export default Home