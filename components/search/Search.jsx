'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import routes from '../../data/routes.json'
import urlFromSearch from '../../lib/urlFromSearch'
import styles from './Search.module.css'

export default (props) => {
  const { word, type, sanitisedInput, searchbarLabel, lang, hideDropdown } =
    props
  const router = useRouter()
  const [searchWord, setSearchWord] = useState(
    word?.trim() || sanitisedInput?.trim() || '',
  )
  const [searchType, setSearchType] = useState(type || '')

  let searchSanitisedInput = ''
  let setSearchSanitisedInput
  try {
    ;[searchSanitisedInput, setSearchSanitisedInput] = useState(
      decodeURIComponent(this.state.word),
    )
  } catch {}

  function handleSubmit(e) {
    e.preventDefault()
    const newLocation = urlFromSearch({ word: searchWord, type: searchType })
    router.push(newLocation)
  }

  // This handles the <input> value.
  function handleInput(e) {
    let word = e.target.value
    setSearchWord(word)
  }

  function handleType(e) {
    setSearchType(e.target.value)
  }

  useEffect(() => {
    setSearchWord(word?.trim() || sanitisedInput?.trim() || '')
    setSearchType(type || '')
  }, [props])

  // Let’s create the dropdown menu items.
  const dropdownOptions = routes
    .filter((route) => route.searchField != null)
    .map((route) => {
      return (
        <option value={route.route} key={route.route}>
          {route.headingToDisplay}
        </option>
      )
    })
  // Now we’re ready to return JSX.
  return (
    // If client doesn’t have JavaScript, `action` & `method` are used.
    // If client has JavaScript, the `onSubmit` is used.
    <form
      className={styles.search}
      action="/redirectonsearch"
      method="get"
      onSubmit={handleSubmit}
      role="search"
    >
      <label htmlFor="search-input" className="visually-hidden">
        {searchbarLabel || 'Text to search for'}
      </label>
      {/* The box the word will be typed into. */}
      <input
        id="search-input"
        name="word"
        value={searchWord || ''}
        onChange={handleInput}
        // onKeyUp={this.handleInputKeyUp}
        title={searchbarLabel || 'Text to search for'}
        type="text"
        lang={lang || 'la'}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        enterKeyHint="search"
      />

      {/* The `type` parameter determines the type of results displayed on the page.
                If the dropdown menu should appear on the page, it will set `type`.
                Otherwise, `type` will come from a hidden <input> element.
                The latter happens if the path begins with /about, /english, /subwords, or /anagramphrases. */}
      {hideDropdown ? (
        <input name="type" type="hidden" value={searchType}></input>
      ) : (
        <div className={styles.dropdown + ' with-dropdown-arrow'}>
          <label htmlFor="rhyme-type-dropdown" className="visually-hidden">
            Type of rhymes to include
          </label>
          <select
            name="type"
            id="rhyme-type-dropdown"
            value={searchType}
            onChange={handleType}
          >
            {dropdownOptions}
          </select>
        </div>
      )}

      {/* The button to load the new page. */}
      <button className={styles.searchButton} type="submit">
        Search!
      </button>
    </form>
  )
}
