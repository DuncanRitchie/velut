// `RedirectFromManyPage` is triggered from /many to redirect to /multiword.
// The query string is preserved across the redirect.
function RedirectFromManyPage() {}

export const getServerSideProps = async ({ query, res }) => {
  const queryParams = new URLSearchParams(query)
  res.writeHead(301, {
    Location: `/multiword?${queryParams.toString()}`,
  })
  res.end()
  return { props: {} }
}

export default RedirectFromManyPage
