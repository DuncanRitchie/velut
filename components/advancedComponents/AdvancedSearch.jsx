import { Component } from 'react'
import searchStyles from '../search/Search.module.css'
import advancedStyles from './AdvancedSearch.module.css'

class AdvancedSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spelling: {
        unsanitised: props.query.spelling || '',
        sanitised: props.query.spelling || '',
      },
      scansion: {
        unsanitised: props.query.scansion || '',
        sanitised: props.query.scansion || '',
      },
      elision: props.query.elision === 'on',
      sort: props.query.sort || 'alphabetical',
    }
  }

  // This handles the <input> value.
  handleInput = (e) => {
    const input = e.target.value
    const name = e.target.name
    // If special characters are input, we can get percent-encoding problems.
    // Let’s correct for that.
    let sanitisedInput
    try {
      sanitisedInput = decodeURIComponent(input) || ''
    } catch {
      sanitisedInput = input
    }
    let newState = {}
    newState[name] = {
      unsanitised: input,
      sanitised: sanitisedInput,
    }
    this.setState(newState)
  }

  // When a checkbox is toggled, this updates state.
  handleCheckboxChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.checked // eg, state.elision = true
    this.setState(newState)
  }

  // When a radio button is checked, this updates state.
  handleRadioChange = (e) => {
    let newState = {}
    newState[e.target.name] = e.target.value // eg, state.sort = "alphabetical"
    this.setState(newState)
  }

  render() {
    // Now we’re ready to return JSX.
    return (
      <form
        className={advancedStyles.advancedSearch + ' ' + searchStyles.search}
        role="search"
      >
        <div>
          <div id="advanced-search-spelling">
            <p>
              <span>
                <label htmlFor="spelling-input">Spelling:</label>
                {/* #spelling-example is rephrased for screen-readers by #spelling-example-sr */}
                <small id="spelling-example" aria-hidden="true">
                  For example, <code>Vvis</code> →{' '}
                  <b lang="la">avis, ovis, ūvīs&nbsp;…</b>
                </small>
              </span>
              <input
                id="spelling-input"
                name="spelling"
                value={this.state.spelling.unsanitised}
                onChange={this.handleInput}
                aria-describedby="spelling-example-sr"
                type="text"
                lang="la"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                enterKeyHint="search"
              />
              <small id="spelling-example-sr" hidden>
                For example, capital <code>V</code> lowercase <code>vis</code>{' '}
                gives <b lang="la">ovis, uvis</b>, et cetera
              </small>
            </p>
          </div>

          <div id="advanced-search-scansion">
            <p>
              <span>
                <label htmlFor="scansion-input">Scansion:</label>
                {/* #scansion-example is rephrased for screen-readers by #scansion-example-sr */}
                <small id="scansion-example" aria-hidden="true">
                  For example, <code>lsslss</code> →{' '}
                  <b lang="la">ambitiōsior, convenientia&nbsp;…</b>
                </small>
              </span>
              <input
                id="scansion-input"
                name="scansion"
                value={this.state.scansion.unsanitised}
                onChange={this.handleInput}
                aria-describedby="scansion-example-sr"
                type="text"
                lang="la"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                enterKeyHint="search"
              />
              <small id="scansion-example-sr" hidden>
                For example, <code>L S S L S S</code> gives{' '}
                <b lang="la">ambitiōsior, convenientia</b>, et cetera
              </small>
            </p>
            <p>
              <input
                type="checkbox"
                name="elision"
                onChange={this.handleCheckboxChange}
                checked={this.state.elision}
                id="elision-input"
                aria-describedby="advanced-rubric-elision"
              />
              <label htmlFor="elision-input">Allow elision?</label>
            </p>
          </div>

          <div
            id="advanced-search-sort"
            aria-describedby="advanced-rubric-sort"
          >
            <p>
              <input
                type="radio"
                name="sort"
                onChange={this.handleRadioChange}
                id="sort-alphabetical"
                value="alphabetical"
                checked={this.state.sort === 'alphabetical'}
              />
              <label htmlFor="sort-alphabetical">Sort alphabetically</label>
            </p>
            <p>
              <input
                type="radio"
                name="sort"
                onChange={this.handleRadioChange}
                id="sort-classical"
                value="classical"
                checked={this.state.sort === 'classical'}
              />
              <label htmlFor="sort-classical">Sort by classical rhyme</label>
            </p>
            <p>
              <input
                type="radio"
                name="sort"
                onChange={this.handleRadioChange}
                id="sort-ecclesiastical"
                value="ecclesiastical"
                checked={this.state.sort === 'ecclesiastical'}
              />
              <label htmlFor="sort-ecclesiastical">
                Sort by ecclesiastical rhyme
              </label>
            </p>
          </div>
        </div>

        {/* The button to load the new page. */}
        <button
          id="search-button"
          className={searchStyles.searchButton}
          type="submit"
        >
          Search!
        </button>
      </form>
    )
  }
}

export default AdvancedSearch
