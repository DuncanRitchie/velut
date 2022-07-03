import Head from 'next/head'

function DefaultHead() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="shortcut icon"
        href="https://www.duncanritchie.co.uk/favicon.ico"
      />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      {/* Page title & description should get overridden on individual pages; below are fallbacks. */}
      <title>velut — a Latin rhyming dictionary</title>
      <meta
        name="Description"
        content="velut — a Latin dictionary with lists of rhymes, anagrams, homographs, consonyms, subwords, inflected forms, cognates, and links to other online resources."
      />
    </Head>
  )
}

export default DefaultHead
