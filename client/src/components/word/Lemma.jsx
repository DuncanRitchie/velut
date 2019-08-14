import React from 'react'
import superscriptLemmaTag from './superscriptLemmaTag'

let Lemma = (props) => {
    let transliterations
    if (props.transliteration) {
        // props.transliteration could look like "Ἰησοῦς/יֵשׁוּעַ"
        let transliterationsArray = props.transliteration.split("/")
        transliterations = transliterationsArray.map((word,i)=>{
            let langCode = "he";
            let emoji = "🇮🇱"
            if("αβγδεζηθικλμνξοπρςτυφχψω".includes(word.substr(-1).toLowerCase())
             || "αβγδεζηθικλμνξοπρςτυφχψω".includes(word.substr(-2,1).toLowerCase())
             ) {
                langCode = "grc"
                emoji = "🇬🇷"
            }
            return <span key={i} lang={langCode}>{emoji} {word} </span>
        })
    }
    
    return (
        <div className="lemma">
            <h3 lang="la">{superscriptLemmaTag(props.lemma)}</h3>
            {props.partOfSpeech ? <p>Part of speech: {props.partOfSpeech.toLowerCase()}</p> : null}
            {props.meaning ? <p>Meaning: {props.meaning}</p> : null}
            {props.notes ? <p>Notes: {props.notes}</p> : null}
            {transliterations ? <p>Transliteration: {transliterations}</p> : null}
            {props.forms ? <p>Forms: {props.forms}</p> : null}
            <p>{props.cognatesMessage ? props.cognatesMessage : <span>Cognates: {props.cognates}</span>}</p>
        </div>
    )
}

export default Lemma