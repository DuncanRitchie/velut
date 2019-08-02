import React from 'react';
import Search from '../search/Search'

const AnagramsHome = () => {
    return (
        <div className="anagrams-home">
            <h1><span className="title">velut</span> &mdash; Anagrams</h1>
            <p>This will help you find Latin phrases that are anagrams! Search for something (up to about a dozen letters)!</p>
            <Search prefix="anagrams/" />
        </div>
    )
}

export default AnagramsHome