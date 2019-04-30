import React from 'react';

let Lemma = (props) => {
    return (
        <div className="lemma">
            <h2>{props.lemma}</h2>
            <p>Part of speech: {props.partOfSpeech.toLowerCase()}</p>
            <p>Meaning: {props.meaning}</p>
            <p>Scansion: {props.scansion}</p>
            <p>Cognates: {props.cognates}</p>
        </div>
    )
}

export default Lemma