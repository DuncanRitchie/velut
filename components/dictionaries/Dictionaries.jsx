import { Fragment } from 'react'
import dictionariesLatin from '../../data/dictionariesLatin.json'
import dictionariesEnglish from '../../data/dictionariesEnglish.json'
import { noMacra } from '../../lib/words/diacritics'
import styles from './Dictionaries.module.css'

let Dictionaries = ({ sanitisedInput, category }) => {
  let plainInput = noMacra(sanitisedInput)
  let dictionaries =
    category === 'Latin' ? dictionariesLatin : dictionariesEnglish
  let mappedDics = dictionaries.map((dic, index) => {
    return (
      <Fragment key={index}>
        <a href={dic.Formula.replace('INPUT', plainInput)}>{dic.Dictionary}</a>
        {index === dictionaries.length - 1 ? '' : ','}{' '}
      </Fragment>
    )
  })
  return (
    <>
      <h2 className={styles.dictionariesHeading}>
        Links to other {category} sites
      </h2>
      <p className={styles.dictionariesP}>{mappedDics}</p>
    </>
  )
}

export default Dictionaries
