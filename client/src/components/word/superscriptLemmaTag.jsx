import React from 'react';
const superscriptLemmaTag = (lemma) => {
    if (lemma) {
        let array = lemma.split(/[[\]]/g)
        if (array[1]) {
            return <span>{array[0]}&nbsp;<span className="lemma-tag">({array[1]})</span></span>
        }
        else {
            return <span>{lemma}</span>
        }
    }
    else {
        return null;
    }
}
export default superscriptLemmaTag