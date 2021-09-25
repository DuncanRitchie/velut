import React from 'react';
const superscriptLemmaTag = (lemma) => {
    if (lemma) {
        let array = lemma.split(/[[\]]/g)
        if (array[1]) {
            return <>{array[0]}&nbsp;<span className="lemma-tag">({array[1]})</span></>
        }
        else {
            return <>{lemma}</>
        }
    }
    else {
        return null;
    }
}
export default superscriptLemmaTag