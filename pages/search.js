function SearchPage() {
}

export const getServerSideProps = async ({ query, res }) => {
    const newLocation = query.type ? `${query.type}/${query.word}` : `/${query.word}`;
    res.writeHead(301, { Location: newLocation });
    res.end()
    return { props: {}};
  }

export default SearchPage
