import { Component } from 'react'

// Adapted from https://nextjs.org/docs/pages/building-your-application/configuring/error-handling
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }
  render() {
    if (!this.state.hasError) {
      return this.props.children
    }
    return (
      <p>
        There was a glitch.{' '}
        <button
          type="button"
          onClick={() => this.setState({ hasError: false })}
          style={{ backgroundColor: '#7aefb3', padding: '0.5rem 0.75rem', marginInline: '0.5rem' }}
        >
          Try again?
        </button>
      </p>
    )
  }
}

export default ErrorBoundary
