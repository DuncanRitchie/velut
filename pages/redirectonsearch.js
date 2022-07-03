import urlFromSearch from '../lib/urlFromSearch'

// `RedirectOnSearchPage` is triggered from `Search` if client does not have JavaScript.
function RedirectOnSearchPage() {}

export const getServerSideProps = async ({ query, res }) => {
  const newLocation = urlFromSearch(query)
  res.writeHead(301, { Location: newLocation })
  res.end()
  return { props: {} }
}

export default RedirectOnSearchPage
