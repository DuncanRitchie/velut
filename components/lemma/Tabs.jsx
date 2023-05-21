import { Component, useRef } from 'react'
import styles from './Tabs.module.css'

// Adapted from https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/

class Tabs extends Component {
  //// Props here are id (string), ariaLabelledBy (string) and children.
  //// ID simply needs to be unique for each Tabs on a page.
  //// Children should be an even number of elements,
  //// in the order tabSummary1, tabContent1, tabSummary2, tabContent2, etc.

  constructor(props) {
    super(props)
    this.state = {
      currentTab: 1,
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
          this.state.currentTab === 1
            ? this.state.tabCount
            : this.state.currentTab - 1
        this.switchTab(prevTab)
        stopDefaultBehaviour()
        break

      case 'ArrowRight':
        const nextTab =
          this.state.currentTab === this.state.tabCount
            ? 1
            : this.state.currentTab + 1
        this.switchTab(nextTab)
        stopDefaultBehaviour()
        break

      case 'Home':
        this.switchTab(1)
        stopDefaultBehaviour()
        break

      case 'End':
        this.switchTab(this.state.tabCount)
        stopDefaultBehaviour()
        break

      default:
        break
    }
  }

  render() {
    return (
      <>
        <div className={styles.tabs}>
          <div role="tablist" aria-labelledby={this.props.ariaLabelledBy}>
            <button
              id={`${this.props.id}-tab-1`}
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 1}
              aria-controls={`${this.props.id}-tabpanel-1`}
              tabIndex={this.state.currentTab === 1 ? '' : '-1'}
              onClick={() => this.switchTab(1)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">{this.props.children[0]}</span>
            </button>
            <button
              id={`${this.props.id}-tab-2`}
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 2}
              aria-controls={`${this.props.id}-tabpanel-2`}
              tabIndex={this.state.currentTab === 2 ? '' : '-1'}
              onClick={() => this.switchTab(2)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">{this.props.children[2]}</span>
            </button>
            <button
              id={`${this.props.id}-tab-3`}
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 3}
              aria-controls={`${this.props.id}-tabpanel-3`}
              tabIndex={this.state.currentTab === 3 ? '' : '-1'}
              onClick={() => this.switchTab(3)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">{this.props.children[4]}</span>
            </button>
            <button
              id={`${this.props.id}-tab-4`}
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 4}
              aria-controls={`${this.props.id}-tabpanel-4`}
              tabIndex={this.state.currentTab === 4 ? '' : '-1'}
              onClick={() => this.switchTab(4)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">{this.props.children[6]}</span>
            </button>
          </div>

          <div
            id={`${this.props.id}-tabpanel-1`}
            role="tabpanel"
            tabIndex="0"
            aria-labelledby={`${this.props.id}-tab-1`}
            className={this.state.currentTab === 1 ? '' : styles.tabPanelHidden}
          >
            {this.props.children[1]}
          </div>
          <div
            id={`${this.props.id}-tabpanel-2`}
            role="tabpanel"
            tabIndex="0"
            aria-labelledby={`${this.props.id}-tab-2`}
            className={this.state.currentTab === 2 ? '' : styles.tabPanelHidden}
          >
            {this.props.children[3]}
          </div>
          <div
            id={`${this.props.id}-tabpanel-3`}
            role="tabpanel"
            tabIndex="0"
            aria-labelledby={`${this.props.id}-tab-3`}
            className={this.state.currentTab === 3 ? '' : styles.tabPanelHidden}
          >
            {this.props.children[5]}
          </div>
          <div
            id={`${this.props.id}-tabpanel-4`}
            role="tabpanel"
            tabIndex="0"
            aria-labelledby={`${this.props.id}-tab-4`}
            className={this.state.currentTab === 4 ? '' : styles.tabPanelHidden}
          >
            {this.props.children[7]}
          </div>
        </div>
      </>
    )
  }
}

export default Tabs
