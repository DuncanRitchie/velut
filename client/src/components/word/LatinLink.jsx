import React from 'react';
import {Link} from "react-router-dom"
import macraToHyphens from "./macraToHyphens"
import superscriptLemmaTag from "./superscriptLemmaTag"

const LatinLink = (props) => {
    const { linkBase, word, isLemma } = props;
    const text = isLemma ? superscriptLemmaTag(word) : word;
    const title = isLemma ? word.replace("["," (").replace("]",")") : word;
    const to = linkBase + (isLemma ? macraToHyphens(word).replace(/\[[^\]]*\]/g,"") : macraToHyphens(word));
    return (
        <Link title={title} to={to} lang="la">{text}</Link>
    );
}

export default LatinLink;