import { Component, Fragment } from 'react'
import Header from '../header/Header'
import LatinLink from '../latinlink/LatinLink'
import subsitesStyles from '../../css/Subsites.module.css'
import manyStyles from '../../css/Many.module.css'
import searchStyles from '../../components/search/Search.module.css'
import { getHrefForDictionaryLinks } from '../../lib/words/many'

class ManySSR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: this.props.search,
    }
  }

  textareaOnChange = (event) => {
    this.setState({ input: event.target.value })
  }

  render() {
    let resultJSX = null
    if (!this.props.isHomepage) {
      const foundWords = [...this.props.allDistinctWordObjects]
        .filter((result) => result.success)
        .map((result) => result.word)
      const foundWordsJSX = foundWords.map((foundWord, index) => {
        return (
          <Fragment key={index}>
            <LatinLink linkBase="/" targetWord={foundWord} />{' '}
          </Fragment>
        )
      })

      const missingWords = [...this.props.allDistinctWordObjects]
        .filter((result) => !result.success)
        .map((result) => result.search)
      const missingWordsJSX = missingWords.map((missingWord, index) => {
        return (
          <Fragment key={index}>
            <strong>{missingWord}</strong>{' '}
          </Fragment>
        )
      })

      const allWordsJSX = this.props.allWordObjects
        ? this.props.allWordObjects.map((result, index) => {
            // If a result for it has been found, we render a LatinLink.
            if (result.success) {
              return (
                <Fragment key={index}>
                  <LatinLink linkBase="/" targetWord={result.word} />{' '}
                </Fragment>
              )
            }
            // Otherwise we don’t render a Link.
            else {
              return (
                <Fragment key={index}>
                  <strong>{result.search}</strong>{' '}
                </Fragment>
              )
            }
          })
        : []

      const foundWordsCount = foundWords.length
      const missingWordsCount = missingWords.length
      const distinctWordsCount = this.props.allDistinctWordObjects.length

      resultJSX = (
        <div>
          <p>
            Showing results for all of the {distinctWordsCount}{' '}
            {distinctWordsCount === 1 ? 'word' : 'words'} you entered.
          </p>

          <h2>Words in velut ({foundWordsCount})</h2>
          {foundWordsCount ? (
            <p lang="la">{foundWordsJSX}</p>
          ) : (
            <p>Nothing you searched for is in velut!</p>
          )}

          <h2>Words not in velut ({missingWordsCount})</h2>
          {missingWordsCount ? (
            <>
              <p lang="la">{missingWordsJSX}</p>
              {/* My velut-dictionary-links site generates links to several Latin websites. */}
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={getHrefForDictionaryLinks(missingWords)}
                  title="External webpage linking to other dictionaries (opens in new tab)"
                >
                  Look up the missing{' '}
                  {missingWordsCount === 1 ? 'word' : 'words'} in other
                  dictionaries.
                </a>
              </p>
            </>
          ) : (
            <p>Everything you searched for is in velut!</p>
          )}
          <h2>All words entered</h2>
          <p lang="la">{allWordsJSX}</p>
        </div>
      )
    }
    return (
      <div className="fulmar-background">
        <Header textBeforeTitle="Look-up of many words" />
        <div className={manyStyles.many}>
          <p className={subsitesStyles.subsiteHomeRubric}>
            Search for several Latin words by entering them into the box below!
          </p>
          <form className={searchStyles.search + ' ' + manyStyles.search}>
            <textarea
              name="search"
              title="Type some Latin words into this box."
              value={this.state.input}
              onChange={this.textareaOnChange}
              lang="la"
            />
            <noscript>
              <input hidden name="ssr" value="true" onChange="void()" />
            </noscript>
            <button className={searchStyles.searchButton} type="submit">
              Search!
            </button>
          </form>
          {!this.props.isHomepage && (
            <div className={subsitesStyles.subsiteResult}>{resultJSX}</div>
          )}
        </div>
      </div>
    )
  }
}

export default ManySSR
