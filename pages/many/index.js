// `RedirectFromManyPage` is triggered from /many to redirect to /multiword.
function RedirectFromManyPage() {}

export const getServerSideProps = async ({ query, res }) => {
  res.writeHead(301, {
    Location: `/multiword?search=${query.search}${
      query.ssr == 'true' ? '&ssr=true' : ''
    }`,
  })
  res.end()
  return { props: {} }
}

export default RedirectFromManyPage
