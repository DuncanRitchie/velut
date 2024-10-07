// <Details> should be used instead of native <details> to allow for view transitions
// and to control whether instances of <details> are open (expanded) by default.
// View transition code is adapted from https://www.patterns.dev/vanilla/view-transitions

function Details({ openByDefault, children, className }) {
  function onClick(event) {
    if (!document.startViewTransition) {
      return
    }
    if (event.target.matches('summary')) {
      event.preventDefault() // (we'll toggle the element ourselves)
      const details = event.target.closest('details')
      document.startViewTransition(() => details.toggleAttribute('open'))
    }
  }
  return (
    <details open={openByDefault} onClick={onClick} className={className}>
      {children}
    </details>
  )
}

export default Details
