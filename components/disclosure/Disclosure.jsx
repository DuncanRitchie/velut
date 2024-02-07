import { Component } from 'react'

class Disclosure extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      openProp: null,
      // jsEnabled: false,
    }
  }
  toggle = this.toggle.bind(this)

  toggle(event) {
    event.preventDefault()
    console.log('Toggling!')
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }
  async open() {
    this.setState({ isOpen: true, openProp: 'open' })
  }
  async close() {
    this.setState({ isOpen: false })
    setTimeout(() => {
      this.setState({ openProp: null })
    }, 1000)
  }

  getChildren() {
    return [...this.props.children].filter(Boolean) ?? []
  }
  getSummaryElement() {
    const summary = this.getChildren().find((child) => child.type === 'summary')
    if (!summary) {
      throw 'Disclosure element needs a <summary> child.'
    }
    console.log({
      summary,
    })

    return <summary onClick={this.toggle}>{summary.props.children}</summary>
  }
  getContentElements() {
    const content = this.getChildren().filter(
      (child) => child.type !== 'summary',
    )
    if (content.length < 1) {
      throw 'Disclosure element needs at least two children.'
    }
    return content
  }

  render() {
    const summary = this.getSummaryElement()
    const content = this.getContentElements()
    return (
      <details
        {...this.props}
        className={this.state.isOpen ? 'open' : 'closed'}
        // open={this.state.openProp}
      >
        {summary}
        {content}
      </details>
    )
  }
}

export default Disclosure
