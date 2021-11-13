import {Fragment} from 'react'
import dictionariesLatin from '../../data/dictionariesLatin.json'
import dictionariesEnglish from '../../data/dictionariesEnglish.json'
import { noMacra } from "../../pages/api/diacritics"
// import noMacra from '../../helpers/noMacra'
import styles from './Dictionaries.module.css'

let Dictionaries = ({sanitisedInput, category}) => {
    let plainInput = noMacra(sanitisedInput)
    let dictionaries = (category === "Latin" ? dictionariesLatin : dictionariesEnglish)
    let mappedDics = dictionaries.map((dic,index)=>{
        return <Fragment key={index}><a href={dic.Formula.replace("INPUT",plainInput)} title={"Search "+dic.Dictionary+" for “"+plainInput+"”"}>{dic.Dictionary}</a>{index===dictionaries.length-1 ? "" : ","} </Fragment>
    })
    return (
        <>
            <h2 className={styles.dictionariesHeading + " page-width"}>
                Links to other {category} sites
            </h2>
            <p className={styles.dictionariesP + " page-width"}>
                {mappedDics}
            </p>
        </>
    )
}

export default Dictionaries