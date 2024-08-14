import { Component } from 'react'
import styles from './Tabs.module.css'

// Adapted from https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/

class Tabs extends Component {
  //// Props here are id (string), ariaLabelledBy (string), startTab (integer), and children.
  //// ID simply needs to be unique for each Tabs on a page.
  //// startTab must be an index of a tab (ie, an integer, 0 or more, less than the number of tabs).
  //// Children should be an even number of elements (must be more than one),
  //// in the order tabSummary1, tabPanelContent1, tabSummary2, tabPanelContent2, etc.

  constructor(props) {
    super(props)
    this.state = {
      currentTab: this.props.startTab || 0,
      tabCount: 4,
      jsEnabled: false,
    }
  }
  switchTab = this.switchTab.bind(this)
  onKeyDown = this.onKeyDown.bind(this)

  switchTab(tabIndex) {
    this.setState({ currentTab: tabIndex })
    //// This isn’t how you’re supposed to focus an element in React
    //// (you should use refs), but it works well enough.
    document.getElementById(`${this.props.id}-tab-${tabIndex}`).focus()
  }

  onKeyDown(event) {
    const stopDefaultBehaviour = () => {
      event.stopPropagation()
      event.preventDefault()
    }

    switch (event.key) {
      case 'ArrowLeft':
        const prevTab = this.state.currentTab === 0 ? this.state.tabCount - 1 : this.state.currentTab - 1
        this.switchTab(prevTab)
        stopDefaultBehaviour()
        break

      case 'ArrowRight':
        const nextTab = this.state.currentTab === this.state.tabCount - 1 ? 0 : this.state.currentTab + 1
        this.switchTab(nextTab)
        stopDefaultBehaviour()
        break

      case 'Home':
        this.switchTab(0)
        stopDefaultBehaviour()
        break

      case 'End':
        this.switchTab(this.state.tabCount - 1)
        stopDefaultBehaviour()
        break

      default:
        break
    }
  }

  getChildren() {
    return this.props.children?.filter?.(Boolean) ?? []
  }

  setTabToStartTab() {
    if (this.props.startTab || this.props.startTab === 0) {
      this.setState({
        currentTab: this.props.startTab,
      })
    }
  }

  componentDidMount() {
    this.setState({ jsEnabled: true })
    this.setTabToStartTab()

    // `children` is undefined if there are zero, is an element if there is one,
    // and is an array of elements if there are more than one.
    if (!this.getChildren().length) {
      console.error('Tabs component cannot be used without two or more children.')
      return
    }
    if (this.getChildren().length % 2) {
      console.warn('Tabs component should have an even number of children, but it has ' + this.getChildren().length)
      this.setState({ tabCount: (this.getChildren().length + 1) / 2 })
      return
    }

    this.setState({ tabCount: this.getChildren().length / 2 })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setTabToStartTab()
    }
  }

  render() {
    if (!this.getChildren().length) {
      return <></>
    }

    const tabsChildren = this.getChildren().filter((_, index) => index % 2 === 0)
    const panelsChildren = this.getChildren().filter((_, index) => index % 2 === 1)
    const jsEnabledClass = this.state.jsEnabled ? styles.jsEnabled : styles.jsDisabled

    return (
      <div className={styles.tabs + ' ' + jsEnabledClass} style={{ '--tabs-count': this.state.tabCount }}>
        {/* This is a proper tab-list, shown if JS is enabled. */}
        <div role="tablist" aria-labelledby={this.props.ariaLabelledBy}>
          {tabsChildren.map((child, index) => (
            <button
              id={`${this.props.id}-tab-${index}`}
              key={index}
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === index}
              aria-controls={`${this.props.id}-tabpanel-${index}`}
              tabIndex={this.state.currentTab === index ? '' : -1}
              onClick={() => this.switchTab(index)}
              onKeyDown={this.onKeyDown}
            >
              {child}
            </button>
          ))}
        </div>

        {/* This is a HTML-only tab-list and a bit hacky, shown if JS is disabled. */}
        <ul>
          {tabsChildren.map((child, index) => (
            <li key={index}>
              <a href={`#${this.props.id}-tabpanel-${index}`}>{child}</a>
            </li>
          ))}
        </ul>

        <div className={styles.tabPanelsWrapper}>
          <div className={styles.tabPanelsContainer}>
            {panelsChildren.map((child, index) => (
              <div
                id={`${this.props.id}-tabpanel-${index}`}
                key={index}
                role="tabpanel"
                aria-labelledby={`${this.props.id}-tab-${index}`}
                className={this.state.currentTab === index ? '' : styles.tabPanelHidden}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Tabs
