import React, {Fragment} from 'react';
const superscriptLemmaTag = (lemma) => {
    if (lemma) {
        let array = lemma.split(/[[\]]/g)
        if (array[1]) {
            return <Fragment>{array[0]}&nbsp;<span className="lemma-tag">({array[1]})</span></Fragment>
        }
        else {
            return <Fragment>{lemma}</Fragment>
        }
    }
    else {
        return null;
    }
}
export default superscriptLemmaTag