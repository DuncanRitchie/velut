import React, {Fragment} from 'react'
import dictionariesLatin from '../../data/dictionariesLatin.json'
import dictionariesEnglish from '../../data/dictionariesEnglish.json'
import noMacra from '../../helpers/noMacra'
import './Dictionaries.css'

let Dictionaries = (props) => {
    let plainInput = noMacra(props.sanitisedInput)
    let dictionaries = (props.category === "Latin" ? dictionariesLatin : dictionariesEnglish)
    let mappedDics = dictionaries.map((dic,index)=>{
        return <Fragment key={index}><a href={dic.Formula.replace("INPUT",plainInput)} title={"Search "+dic.Dictionary+" for “"+plainInput+"”"}>{dic.Dictionary}</a>{index===dictionaries.length-1 ? "" : ","} </Fragment>
    })
    return (
        <>
            <h2 className="dictionaries-heading">
                Links to other {props.category} sites
            </h2>
            <p className="dictionaries-p">
                {mappedDics}
            </p>
        </>
    )
}

export default Dictionaries