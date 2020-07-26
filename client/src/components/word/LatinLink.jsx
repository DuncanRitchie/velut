import React from 'react';
import {Link} from "react-router-dom"
import macraToHyphens from "./macraToHyphens"
import superscriptLemmaTag from "./superscriptLemmaTag"

const LatinLink = (props) => {
    const { linkBase, word, isLemma } = props;
    if (isLemma) {
        return (
            <Link title={word.replace("["," (").replace("]",")")} to={linkBase + macraToHyphens(word).replace(/\[.*\]/g,"")} lang="la">
                {superscriptLemmaTag(word)}
            </Link>
        )
    }
    else {    
        return (
            <Link to={linkBase+macraToHyphens(word)} title={word} lang="la">{word}</Link>
        );
    }
}

export default LatinLink;