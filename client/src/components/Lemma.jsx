import React from 'react';

let Lemma = (props) => {
    return (
        <div className="lemma">
            <h2>{props.lemma}</h2>
            <p>Part of speech: {props.partOfSpeech.toLowerCase()}</p>
            <p>Meaning: {props.meaning}</p>
            {props.scansion ? <p>Scansion of lemma: {props.scansion}</p> : null}
            {props.forms ? <p>Forms: {props.forms}</p> : null}
            <p>{props.cognatesMessage ? props.cognatesMessage : <span>Cognates: {props.cognates}</span>}</p>
        </div>
    )
}

export default Lemma