import { Component, useRef } from 'react'
import styles from './Tabs.module.css'

// Adapted from https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/

class Tabs extends Component {
  // class TabsAutomatic {
  //   constructor(groupNode) {
  //     this.tablistNode = groupNode

  //     this.tabs = []

  //     this.firstTab = null
  //     this.lastTab = null

  //     this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'))
  //     this.tabpanels = []

  //     for (var i = 0; i < this.tabs.length; i += 1) {
  //       var tab = this.tabs[i]
  //       var tabpanel = document.getElementById(
  //         tab.getAttribute('aria-controls'),
  //       )

  //       tab.tabIndex = -1
  //       tab.setAttribute('aria-selected', 'false')
  //       this.tabpanels.push(tabpanel)

  //       tab.addEventListener('keydown', this.onKeydown.bind(this))
  //       tab.addEventListener('click', this.onClick.bind(this))

  //       if (!this.firstTab) {
  //         this.firstTab = tab
  //       }
  //       this.lastTab = tab
  //     }

  //     this.setSelectedTab(this.firstTab, false)
  //   }

  //   setSelectedTab(currentTab, setFocus) {
  //     if (typeof setFocus !== 'boolean') {
  //       setFocus = true
  //     }
  //     for (var i = 0; i < this.tabs.length; i += 1) {
  //       var tab = this.tabs[i]
  //       if (currentTab === tab) {
  //         tab.setAttribute('aria-selected', 'true')
  //         tab.removeAttribute('tabIndex')
  //         this.tabpanels[i].classList.remove('is-hidden')
  //         if (setFocus) {
  //           tab.focus()
  //         }
  //       } else {
  //         tab.setAttribute('aria-selected', 'false')
  //         tab.tabIndex = -1
  //         this.tabpanels[i].classList.add('is-hidden')
  //       }
  //     }
  //   }

  //   setSelectedToPreviousTab(currentTab) {
  //     var index

  //     if (currentTab === this.firstTab) {
  //       this.setSelectedTab(this.lastTab)
  //     } else {
  //       index = this.tabs.indexOf(currentTab)
  //       this.setSelectedTab(this.tabs[index - 1])
  //     }
  //   }

  //   setSelectedToNextTab(currentTab) {
  //     var index

  //     if (currentTab === this.lastTab) {
  //       this.setSelectedTab(this.firstTab)
  //     } else {
  //       index = this.tabs.indexOf(currentTab)
  //       this.setSelectedTab(this.tabs[index + 1])
  //     }
  //   }

  //   /* EVENT HANDLERS */

  //   onKeydown(event) {
  //     var tgt = event.currentTarget,
  //       flag = false

  //     switch (event.key) {
  //       case 'ArrowLeft':
  //         this.setSelectedToPreviousTab(tgt)
  //         flag = true
  //         break

  //       case 'ArrowRight':
  //         this.setSelectedToNextTab(tgt)
  //         flag = true
  //         break

  //       case 'Home':
  //         this.setSelectedTab(this.firstTab)
  //         flag = true
  //         break

  //       case 'End':
  //         this.setSelectedTab(this.lastTab)
  //         flag = true
  //         break

  //       default:
  //         break
  //     }

  //     if (flag) {
  //       event.stopPropagation()
  //       event.preventDefault()
  //     }
  //   }

  //   onClick(event) {
  //     this.setSelectedTab(event.currentTarget)
  //   }
  // }

  // // Initialize tablist

  // // window.addEventListener('load', function () {
  // var tablists = document.querySelectorAll('[role=tablist].automatic')
  // for (var i = 0; i < tablists.length; i++) {
  //   new TabsAutomatic(tablists[i])
  // }
  // // })

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
    document.getElementById('tab-' + tabIndex).focus()
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
          <h3 id="tablist-1">Danish Composers</h3>
          <div role="tablist" aria-labelledby="tablist-1" className="automatic">
            <button
              id="tab-1"
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 1}
              aria-controls="tabpanel-1"
              tabIndex={this.state.currentTab === 1 ? '' : '-1'}
              onClick={() => this.switchTab(1)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">Maria Ahlefeldt</span>
            </button>
            <button
              id="tab-2"
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 2}
              aria-controls="tabpanel-2"
              tabIndex={this.state.currentTab === 2 ? '' : '-1'}
              onClick={() => this.switchTab(2)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">Carl Andersen</span>
            </button>
            <button
              id="tab-3"
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 3}
              aria-controls="tabpanel-3"
              tabIndex={this.state.currentTab === 3 ? '' : '-1'}
              onClick={() => this.switchTab(3)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">Ida da Fonseca</span>
            </button>
            <button
              id="tab-4"
              type="button"
              role="tab"
              aria-selected={this.state.currentTab === 4}
              aria-controls="tabpanel-4"
              tabIndex={this.state.currentTab === 4 ? '' : '-1'}
              onClick={() => this.switchTab(4)}
              onKeyDown={this.onKeyDown}
            >
              <span className="focus">Peter Müller</span>
            </button>
          </div>

          <div
            id="tabpanel-1"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="tab-1"
            className={this.state.currentTab === 1 ? '' : styles.tabPanelHidden}
          >
            <p>
              Maria Theresia Ahlefeldt (16 January 1755 – 20 December 1810) was
              a Danish, (originally German), composer. She is known as the first
              female composer in Denmark. Maria Theresia composed music for
              several ballets, operas, and plays of the royal theatre. She was
              given good critic as a composer and described as a “
              <span lang="da">virkelig Tonekunstnerinde</span>” ('a True Artist
              of Music').
            </p>
          </div>
          <div
            id="tabpanel-2"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="tab-2"
            className={this.state.currentTab === 2 ? '' : styles.tabPanelHidden}
          >
            <p>
              Carl Joachim Andersen (29 April 1847 – 7 May 1909) was a Danish
              flutist, conductor and composer born in Copenhagen, son of the
              flutist Christian Joachim Andersen. Both as a virtuoso and as
              composer of flute music, he is considered one of the best of his
              time. He was considered to be a tough leader and teacher and
              demanded as such a lot from his orchestras but through that style
              he reached a high level.
            </p>
          </div>
          <div
            id="tabpanel-3"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="tab-3"
            className={this.state.currentTab === 3 ? '' : styles.tabPanelHidden}
          >
            <p>
              Ida Henriette da Fonseca (July 27, 1802 – July 6, 1858) was a
              Danish opera singer and composer. Ida Henriette da Fonseca was the
              daughter of Abraham da Fonseca (1776–1849) and Marie Sofie
              Kiærskou (1784–1863). She and her sister Emilie da Fonseca were
              students of Giuseppe Siboni, choir master of the Opera in
              Copenhagen. She was given a place at the royal Opera alongside her
              sister the same year she debuted in 1827.
            </p>
          </div>
          <div
            id="tabpanel-4"
            role="tabpanel"
            tabIndex="0"
            aria-labelledby="tab-4"
            className={this.state.currentTab === 4 ? '' : styles.tabPanelHidden}
          >
            <p>
              Peter Erasmus Lange-Müller (1 December 1850 – 26 February 1926)
              was a Danish composer and pianist. His compositional style was
              influenced by Danish folk music and by the work of Robert
              Schumann; Johannes Brahms; and his Danish countrymen, including
              J.P.E. Hartmann.
            </p>
          </div>
          <script></script>
        </div>
      </>
    )
  }
}

export default Tabs
