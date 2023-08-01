import Head from 'next/head'

import { getSummary } from '../lib/summary'
import Header from '../components/header/Header'

export async function getServerSideProps() {
  const summaryData = await getSummary()
  const summary = summaryData.summary || null

  return {
    props: {
      summary,
    },
  }
}

const DeExcellation = (props) => {
  return (
    <>
      <Head>
        <title>
          About the de-Excellation of velut — a Latin rhyming dictionary
        </title>
        <meta
          name="Description"
          content="How Excel is being removed from the architecture of velut, the Latin vocabulary website"
        />
      </Head>
      <div className={'fulmar-background'}>
        <Header textBeforeTitle="De-Excellation" />

        <main>
          <code>{JSON.stringify(props.summary)}</code>
        </main>
      </div>
    </>
  )
}

export default DeExcellation
