import React from 'react';
import './WarningMessage.css'

let WarningMessage = () => {
    return (
        <p className="warning-message">
            Nota bene &mdash; I&rsquo;m still developing this website.<br />
            It may be a bit slow to load initially, but searches via the input below will be quicker.<br />
            All the data have been compiled by me, so there are occasional errors. Please check words in other dictionaries; there are links at the base of the page.<br />
            There are over 90,000 words on this site, representing more than 11,000 lemmata, but there are many more possible in Latin. I&rsquo;m frequently adding new words, but I have some way to go! In particular, prefixed words and words stressed on a grammatical ending or a common suffix have generally been omitted.<br />
            At the moment, the &ldquo;rhymes&rdquo; are determined under classical pronunciation, so (e.g.) vowel length matters. In the future, you will have other options for what kinds of rhymes you want to find.<br />
            Have fun searching!
        </p>
    )
}

export default WarningMessage