import { Component } from 'react'
import styles from './Tabs.module.css'

// Adapted from https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/

class Tabs extends Component {
  //// Props here are id (string), ariaLabelledBy (string) and children.
  //// ID simply needs to be unique for each Tabs on a page.
  //// Children should be an even number of elements,
  //// in the order tabSummary1, tabPanelContent1, tabSummary2, tabPanelContent2, etc.

  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
      tabCount: 4,
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
        const prevTab =
          this.state.currentTab === 0
            ? this.state.tabCount - 1
            : this.state.currentTab - 1
        this.switchTab(prevTab)
        stopDefaultBehaviour()
        break

      case 'ArrowRight':
        const nextTab =
          this.state.currentTab === this.state.tabCount - 1
            ? 0
            : this.state.currentTab + 1
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

  componentDidMount() {
    if (this.props.children.length % 2) {
      console.warn(
        'Tabs should have an even number of children, but it has ' +
          this.props.children.length,
      )
    }
    this.setState({ tabCount: this.props.children.length / 2 })
  }

  render() {
    const tabsChildren = this.props.children.filter(
      (_, index) => index % 2 === 0,
    )
    const panelsChildren = this.props.children.filter(
      (_, index) => index % 2 === 1,
    )

    return (
      <div className={styles.tabs}>
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

        {panelsChildren.map((child, index) => (
          <div
            id={`${this.props.id}-tabpanel-${index}`}
            key={index}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`${this.props.id}-tab-${index}`}
            className={
              this.state.currentTab === index ? '' : styles.tabPanelHidden
            }
          >
            {child}
          </div>
        ))}
      </div>
    )
  }
}

export default Tabs