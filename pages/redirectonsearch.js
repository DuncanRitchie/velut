// `RedirectOnSearchPage` is triggered from `Search` if client does not have JavaScript.
function RedirectOnSearchPage() {
}

export const getServerSideProps = async ({ query, res }) => {
    const encodedType = encodeURIComponent(query.type)
    const encodedWord = encodeURIComponent(query.word)
    const newLocation = `/${encodedType}/${encodedWord}`.replace(/%2F/g, '/').replace(/\/+/g, "/");
    res.writeHead(301, { Location: newLocation });
    res.end()
    return { props: {}};
}

export default RedirectOnSearchPage
