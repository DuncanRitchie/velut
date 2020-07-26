import React from 'react';
import {Link} from "react-router-dom"
import macraToHyphens from "./macraToHyphens"

const LatinLink = (props) => {
    const { linkBase, word } = props;
    return (
        <Link to={linkBase+macraToHyphens(word)} title={word} lang="la">{word}</Link>
    );
}

export default LatinLink;