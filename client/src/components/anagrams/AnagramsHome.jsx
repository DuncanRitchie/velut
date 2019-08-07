import React from 'react'
import Title from '../title/Title'
import Search from '../search/Search'
// Anagrams and Subwords use the same styles.
import '../subwords/Subwords.css'

const AnagramsHome = () => {
    return (
        <div className="anagrams-home">
            <Title textBeforeTitle="Anagram phrases" />
            <p>This will help you find Latin phrases that are anagrams!</p>
            <p>Caution &mdash; searches may take some minutes. Searches longer than ten characters may fail completely. Anagrams longer than thirteen words will not be found.</p>
            <Search prefix="anagramphrases/"/>
        </div>
    )
}

export default AnagramsHome