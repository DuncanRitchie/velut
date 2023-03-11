import Head from 'next/head'
import findMany from '../../lib/words/many'
import ManyCSR from '../../components/manyComponents/ManyCSR'
import ManySSR from '../../components/manyComponents/ManySSR'

// Many is a JSX element rendered at /many/
// If "ssr=true" is in the query, the ManySSR component is rendered,
// which fetches the data in `getServerSideProps` and renders the data
// on the server-side.
// Otherwise, the ManyCSR component is rendered and fetching &
// rendering happen on the client-side.

const ManyHead = () => {
  return (
    <Head>
      <title>Multi-word Look-up on velut — a Latin rhyming dictionary</title>
      <meta
        name="Description"
        content="Lists of words that are and are not in the velut dictionary"
      />
    </Head>
  )
}

const Many = (props) => {
  return (
    <>
      <ManyHead />
      {props.ssr ? <ManySSR {...props} /> : <ManyCSR {...props} />}
    </>
  )
}

export default Many

export async function getServerSideProps({ query, res }) {
  if (query.search) {
    if (query.ssr === 'true') {
      const results = await findMany(query.search)

      if (!results.allWordObjects.some((obj) => obj.success)) {
        res.statusCode = 404
      }

      return {
        props: {
          ...query,
          ...results,
          isHomepage: false,
        },
      }
    } else {
      return {
        props: {
          ...query,
          isHomepage: false,
        },
      }
    }
  } else {
    return {
      props: {
        isHomepage: true,
        query,
      },
    }
  }
}
