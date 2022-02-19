function SearchPage() {
}

export const getServerSideProps = async ({ query, res }) => {
    res.writeHead(301, { Location: `/${query.word}` });
    res.end()
    return { props: {}};
  }

export default SearchPage
