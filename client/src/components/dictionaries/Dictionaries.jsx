import React from 'react'
import dictionariesLatin from '../../data/dictionariesLatin.json'
import dictionariesEnglish from '../../data/dictionariesEnglish.json'
import noMacra from '../word/noMacra'
import './Dictionaries.css'

let Dictionaries = (props) => {
    let plainInput = noMacra(props.sanitisedInput)
    let dictionaries = (props.category === "Latin" ? dictionariesLatin : dictionariesEnglish)
    let mappedDics = dictionaries.map((dic,index)=>{
        return <span key={index}><a href={dic.Formula.replace("INPUT",plainInput)} title={"Search "+dic.Dictionary+" for “"+plainInput+"”"}>{dic.Dictionary}</a>{index===dictionaries.length-1 ? "" : ","} </span>
    })
    return (
        <>
            <h2 className="dictionaries-heading">
                Links to external sites<br/>
                <small className="dictionaries-category">({props.category} lookup)</small>
            </h2>
            <p className="dictionaries">
                {mappedDics}
            </p>
        </>
    )
}

export default Dictionaries