import React from 'react';
import {Link} from "react-router-dom"
import macraToHyphens from "../../helpers/macraToHyphens"
import superscriptLemmaTag from "../lemma/superscriptLemmaTag"

const LatinLink = (props) => {
    const { linkBase, targetWord, currentWordHyphenated, isLemma } = props;
    const text = isLemma ? superscriptLemmaTag(targetWord) : targetWord;
    const title = isLemma ? targetWord.replace("["," (").replace("]",")") : targetWord;
    const targetWordHyphenated = macraToHyphens(targetWord)
    const to = isLemma ? targetWordHyphenated.replace(/\[[^\]]*\]/g,"") : targetWordHyphenated;
    //// If the target address is the same as the current page, no link should be displayed.
    const shouldDisplayLink = !(to === currentWordHyphenated);
    return (
        shouldDisplayLink
        ? <Link title={title} to={linkBase+to} lang="la">{text}</Link>
        : <span lang="la" className="link-to-current-word">{text}</span>
    );
}

export default LatinLink;