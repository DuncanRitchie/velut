function SearchPage() {
}

export const getServerSideProps = async ({ query, res }) => {
    const newLocation = `/${query.type}/${query.word}`.replace(/\/\//, "/");
    res.writeHead(301, { Location: newLocation });
    res.end()
    return { props: {}};
  }

export default SearchPage
