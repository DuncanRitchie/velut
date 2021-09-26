import React from 'react';
import {Link} from "next/link"
//import macraToHyphens from "../../helpers/macraToHyphens"
import { macraToHyphens } from "../../pages/api/diacritics"
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
        ? <Link href={linkBase+to}><a title={title} lang="la">{text}</a></Link>
        : <span lang="la" className="link-to-current-word">{text}</span>
    );
}

export default LatinLink;