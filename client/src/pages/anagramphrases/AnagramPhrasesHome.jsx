import React from 'react'
import Title from '../../components/title/Title'
import Search from '../../components/search/Search'
import '../Subsites.css'

const AnagramsHome = () => {
    document.title='Anagram phrases on velut — a Latin rhyming dictionary'
    return (
        <div className="subsite-home anagram-phrases fulmar-background">
            <Title textBeforeTitle="Anagram phrases" />
            <p>This will help you find Latin phrases that are anagrams!</p>
            <p>Caution — searches may take some minutes. Searches longer than ten characters may fail completely.</p>
            <Search prefix="anagramphrases/" searchbarTitle="Type something to find anagrams of" />
        </div>
    )
}

export default AnagramsHome