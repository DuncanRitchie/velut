import React from 'react';

let Lemma = (props) => {
    return (
        <div className="lemma">
            <h3 lang="la">{props.lemma}</h3>
            {props.partOfSpeech ? <p>Part of speech: {props.partOfSpeech.toLowerCase()}</p> : null}
            {props.meaning ? <p>Meaning: {props.meaning}</p> : null}
            {props.notes ? <p>Notes: {props.notes}</p> : null}
            {props.transliteration ? <p>Transliteration: {props.transliteration}</p> : null}
            {props.forms ? <p>Forms: {props.forms}</p> : null}
            <p>{props.cognatesMessage ? props.cognatesMessage : <span>Cognates: {props.cognates}</span>}</p>
        </div>
    )
}

export default Lemma