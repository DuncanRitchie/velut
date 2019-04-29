import React from 'react';

let Lemma = (props) => {
    return (
        <div>
            <h2>{props.lemma}</h2>
            <p>Part of speech: {props.partOfSpeech.toLowerCase()}</p>
            <p>Meaning: {props.meaning}</p>
            <p>Scansion: {props.scansion}</p>
        </div>
    )
}

export default Lemma