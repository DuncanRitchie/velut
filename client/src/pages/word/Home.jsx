import React from 'react'
import Title from "../../components/title/Title"
import Search from '../../components/search/Search'
import './Home.css'

let Home = () => {
    document.title = "Duncan Ritchie’s velut — a Latin rhyming dictionary"
    return (
        <div className="home fulmar-background">
            <Title />
            <h2 className="home-rubric">
                <span>Latin rhymes &amp;&nbsp;more!</span>
            </h2>
            <Search prefix="" searchbarTitle="Type a Latin word" />
            <p className="home-rubric">
                <span>Enter a Latin word in the searchbar above,</span><br/>
                <span>or see the navigation bar below for other options.</span>
            </p>
        </div>
    )
}

export default Home