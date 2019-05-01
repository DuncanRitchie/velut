import React from 'react';

let Lemma = (props) => {
    return (
        <div className="lemma">
            <h2>{props.lemma}</h2>
            <p>Part of speech: {props.partOfSpeech.toLowerCase()}</p>
            <p>Meaning: {props.meaning}</p>
            {props.scansion ? <p>Scansion of lemma: {props.scansion}</p> : null}
            <p>Cognates: {props.cognatesMessage} {props.cognates}</p>
        </div>
    )
}

export default Lemma