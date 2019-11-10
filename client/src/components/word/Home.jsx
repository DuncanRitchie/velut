import React from 'react'
import Title from "../title/Title"
import Search from '../search/Search'

let Home = () => {
    document.title = "Duncan Ritchie’s velut"
    return (
        <div className="home">
            <Title />
            <p className="home-rubric">Enter a Latin word into the searchbar below!</p>
            <Search prefix="" />
        </div>
    )
}

export default Home