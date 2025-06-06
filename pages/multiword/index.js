import Head from 'next/head'
import findMany from '../../lib/words/multi'
import MultiCSR from '../../components/multi/MultiCSR'
import MultiSSR from '../../components/multi/MultiSSR'

// Multi is a JSX element rendered at /multiword/
// If "ssr=true" is in the query, the MultiSSR component is rendered,
// which fetches the data in `getServerSideProps` and renders the data
// on the server-side.
// Otherwise, the MultiCSR component is rendered and fetching &
// rendering happen on the client-side.

const MultiHead = () => {
  return (
    <Head>
      <title>Multi-word Look-up on velut — a Latin rhyming dictionary</title>
      <meta name="Description" content="Lists of words that are and are not in the velut dictionary" />
    </Head>
  )
}

const Multi = (props) => {
  return (
    <>
      <MultiHead />
      {props.ssr == 'true' ? <MultiSSR {...props} /> : <MultiCSR {...props} />}
    </>
  )
}

export default Multi

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
