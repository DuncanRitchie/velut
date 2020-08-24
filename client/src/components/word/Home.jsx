import React from 'react'
import Title from "../title/Title"
import Search from '../search/Search'

let Home = () => {
    document.title = "Duncan Ritchie’s velut"
    return (
        <div className="home">
            <Title />
            <h2 className="home-rubric">
                <span>Latin rhymes &amp;&nbsp;more!</span>
            </h2>
            <Search prefix="" />
            <p className="home-rubric">
                <span>Enter a Latin word in the searchbar above,</span><br/>
                <span>or see the navigation bar below for other options.</span>
            </p>
        </div>
    )
}

export default Home