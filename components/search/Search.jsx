import { withRouter } from 'next/router'
import { Component } from 'react'
import routes from '../../data/routes.json'
import urlFromSearch from '../../lib/urlFromSearch'
import styles from './Search.module.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: this.props.word?.trim() || this.props.sanitisedInput?.trim() || '',
      type: this.props.type || '',
    }
  }
  handleSubmit = this.handleSubmit.bind(this)

  // This handles the <input> value.
  handleInput = (e) => {
    let word = e.target.value
    this.setState({ word: word })
  }

  handleType = (e) => {
    this.setState({ type: e.target.value })
  }

  // Initial value of sanitisedInput is "". Let’s put something useful there.
  componentDidMount() {
    try {
      this.setState({ sanitisedInput: decodeURIComponent(this.state.word) })
    } catch {}
  }

  componentDidUpdate(prevProps) {
    const props = this.props
    if (prevProps.word !== props.word || prevProps.type !== props.type) {
      this.setState({
        word:
          this.props.word?.trim() || this.props.sanitisedInput?.trim() || '',
        type: this.props.type || '',
      })
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    const router = this.props.router
    const newLocation = await urlFromSearch(this.state)
    router.push(newLocation)
  }

  render() {
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
        onSubmit={this.handleSubmit}
        role="search"
      >
        <label htmlFor="search-input" className="visually-hidden">
          {this.props.searchbarLabel || 'Text to search for'}
        </label>
        {/* The box the word will be typed into. */}
        <input
          id="search-input"
          name="word"
          value={this.state.word || ''}
          onChange={this.handleInput}
          onKeyUp={this.handleInputKeyUp}
          title={this.props.searchbarLabel || 'Text to search for'}
          type="text"
          lang={this.props.lang || 'la'}
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
        {this.props.hideDropdown ? (
          <input name="type" type="hidden" value={this.state.type}></input>
        ) : (
          <div className={styles.dropdown + ' with-dropdown-arrow'}>
            <label htmlFor="rhyme-type-dropdown" className="visually-hidden">
              Type of rhymes to include
            </label>
            <select
              name="type"
              id="rhyme-type-dropdown"
              value={this.state.type}
              onChange={this.handleType}
            >
              {dropdownOptions}
            </select>
          </div>
        )}

        {/* The button to load the new page. */}
        <button className={styles.searchButton} type="submit">
          Search!
        </button>
        <br />
      </form>
    )
  }
}

export default withRouter(Search)
