import React from 'react'
import dictionariesLatin from '../../data/dictionaries.json'
import dictionariesEnglish from '../../data/dictionariesEnglish.json'
import noMacra from '../word/noMacra'
import './Dictionaries.css'

let Dictionaries = (props) => {
    let plainInput = noMacra(props.sanitisedInput)
    let dictionaries = (props.set == "Latin" ? dictionariesLatin : dictionariesEnglish)
    let mappedDics = dictionaries.map((dic,index)=>{
        return <span key={index}><a href={dic.Formula.replace("INPUT",plainInput)} title={"Search "+dic.Dictionary+" for “"+plainInput+"”"}>{dic.Dictionary}</a>{index===dictionaries.length-1 ? "" : ","} </span>
    })
    return (
        <>
            <h2 className="dictionaries-heading">
                Links to external sites
            </h2>
            <p className="dictionaries">
                {mappedDics}
            </p>
        </>
    )
}

export default Dictionaries