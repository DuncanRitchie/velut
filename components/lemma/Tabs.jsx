'use client'

import { useEffect, useState } from 'react'
import styles from './Tabs.module.css'

// Adapted from https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/

//// Props here are id (string), ariaLabelledBy (string), startTab (integer), and children.
//// ID simply needs to be unique for each Tabs on a page.
//// startTab must be an index of a tab (ie, an integer, 0 or more, less than the number of tabs).
//// Children should be an even number of elements (must be more than one),
//// in the order tabSummary1, tabPanelContent1, tabSummary2, tabPanelContent2, etc.
export default function Tabs({ id, ariaLabelledBy, startTab, children }) {
  console.log({ id, ariaLabelledBy, startTab, children })

  const [currentTab, setCurrentTab] = useState(startTab || 0)
  let tabCount = 4
  let jsEnabled = true
  // const [jsEnabled, setJsEnabled] = useState(false)
  useEffect(() => {
    setTabToStartTab()
  }, [id])

  function switchTab(tabIndex) {
    setCurrentTab(tabIndex)
    //// This isn’t how you’re supposed to focus an element in React
    //// (you should use refs), but it works well enough.
    document.getElementById(`${id}-tab-${tabIndex}`).focus()
  }

  function onKeyDown(event) {
    const stopDefaultBehaviour = () => {
      event.stopPropagation()
      event.preventDefault()
    }

    switch (event.key) {
      case 'ArrowLeft':
        const prevTab = currentTab === 0 ? tabCount - 1 : currentTab - 1
        switchTab(prevTab)
        stopDefaultBehaviour()
        break

      case 'ArrowRight':
        const nextTab = currentTab === tabCount - 1 ? 0 : currentTab + 1
        switchTab(nextTab)
        stopDefaultBehaviour()
        break

      case 'Home':
        switchTab(0)
        stopDefaultBehaviour()
        break

      case 'End':
        switchTab(tabCount - 1)
        stopDefaultBehaviour()
        break

      default:
        break
    }
  }

  function getChildren() {
    return (
      children
        ?.filter?.(Boolean)
        .map((child) => (typeof child === 'string' ? <>{child}</> : child)) ??
      []
    )
  }

  function setTabToStartTab() {
    if (startTab || startTab === 0) {
      setCurrentTab(startTab)
    }
  }

  // setJsEnabled(true)

  console.log({ getChildren: getChildren() })

  // `children` is undefined if there are zero, is an element if there is one,
  // and is an array of elements if there are more than one.
  if (!getChildren().length) {
    console.error('Tabs component cannot be used without two or more children.')
    return
  }
  if (getChildren().length % 2) {
    console.warn(
      'Tabs component should have an even number of children, but it has ' +
        getChildren().length,
    )
    tabCount = (getChildren().length + 1) / 2
    return
  }

  tabCount = getChildren().length / 2

  if (!getChildren().length) {
    return <></>
  }

  const tabsChildren = getChildren().filter((_, index) => index % 2 === 0)
  const panelsChildren = getChildren().filter((_, index) => index % 2 === 1)
  const jsEnabledClass = jsEnabled ? styles.jsEnabled : styles.jsDisabled

  return (
    <div
      className={styles.tabs + ' ' + jsEnabledClass}
      style={{ '--tabs-count': tabCount }}
    >
      {/* This is a proper tab-list, shown if JS is enabled. */}
      <div role="tablist" aria-labelledby={ariaLabelledBy}>
        {tabsChildren.map((child, index) => (
          <button
            id={`${id}-tab-${index}`}
            key={index}
            type="button"
            role="tab"
            aria-selected={currentTab === index}
            aria-controls={`${id}-tabpanel-${index}`}
            tabIndex={currentTab === index ? '' : -1}
            onClick={() => switchTab(index)}
            onKeyDown={onKeyDown}
          >
            {child}
          </button>
        ))}
      </div>

      {/* This is a HTML-only tab-list and a bit hacky, shown if JS is disabled. */}
      <ul>
        {tabsChildren.map((child, index) => (
          <li key={index}>
            <a href={`#${id}-tabpanel-${index}`}>{child}</a>
          </li>
        ))}
      </ul>

      <div className={styles.tabPanelsWrapper}>
        <div className={styles.tabPanelsContainer}>
          {panelsChildren.map((child, index) => (
            <div
              id={`${id}-tabpanel-${index}`}
              key={index}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${index}`}
              className={currentTab === index ? '' : styles.tabPanelHidden}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
