import React from 'react'
import superscriptLemmaTag from './superscriptLemmaTag'
import greece from '../../images/greece.png'
import israel from '../../images/israel.png'

let Lemma = (props) => {
    // If there are transliterations in Ancient Greek, they will appear next to a Greek flag
    // and be labelled as lang="grc". Ditto for Hebrew with the Israeli flag and lang="he".
    // All the transliterations for the lemma come into props as a single string to be processed here.
    let transliterations
    if (props.transliteration) {
        // props.transliteration could look like "Ἰησοῦς/יֵשׁוּעַ"
        let transliterationsArray = props.transliteration.split("/")
        transliterations = transliterationsArray.map((word,i)=>{
            let lang = "Hebrew"
            let langCode = "he"
            // We would be using emoji, but Windows won't display national flag emoji.
            // let emoji = "🇮🇱"
            let flagSrc = israel
            if("αβγδεζηθικλμνξοπρςτυφχψω".includes(word.substr(-1).toLowerCase())
             || "αβγδεζηθικλμνξοπρςτυφχψω".includes(word.substr(-2,1).toLowerCase())
             ) {
                lang = "Ancient Greek"
                langCode = "grc"
                // emoji = "🇬🇷"
                flagSrc = greece
            }
            return <span key={i} lang={langCode}><img className="inline-flag" src={flagSrc} alt={lang}/>&nbsp;{word} </span>
        })
    }
    
    return (
        <div className="lemma">
            {/* superscriptLemmaTag() replaces anything in square brackets with a superscript. */}
            <h3 lang="la">{superscriptLemmaTag(props.lemma)}</h3>
            {props.partOfSpeech
                 ? <p>Part of speech: {props.partOfSpeech.toLowerCase()}</p>
                 : null}
            {props.meaning
                 ? <p>Meanings: {props.meaning}</p>
                 : null}
            {props.notes
                 ? <p>Notes: {props.notes}</p>
                 : null}
            {transliterations
                 ? <p>Transliterations: {transliterations}</p>
                 : null}
            {props.forms
                 ? <p>Forms: {props.forms}</p>
                 : null}
            <p>
                {props.cognatesMessage
                    ? props.cognatesMessage
                    : <span>Cognates: {props.cognates}</span>}
            </p>
        </div>
    )
}

export default Lemma