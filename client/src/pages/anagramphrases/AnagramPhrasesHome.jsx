import React from 'react'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import '../Subsites.css'

const AnagramsHome = () => {
    document.title='Anagram phrases on velut — a Latin rhyming dictionary'
    return (
        <div className="subsite-home anagram-phrases fulmar-background">
            <Header textBeforeTitle="Anagram phrases" />
            <p className="subsite-home-rubric">This will help you find Latin phrases that are anagrams!</p>
            <p className="subsite-home-rubric">Caution — searches may take some minutes. Searches longer than ten characters may fail completely.</p>
            <Search prefix="anagramphrases/" searchbarTitle="Type something to find anagrams of" lang="zxx" />
        </div>
    )
}

export default AnagramsHome