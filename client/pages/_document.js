import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
            <meta charset="utf-8" />
            <link rel="shortcut icon" href="https://www.duncanritchie.co.uk/favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000" />
            {/* Description and title should be overridden on each page. */}
            <meta name="Description" content="velut — a Latin dictionary with lists of rhymes, anagrams, homographs, consonyms, subwords, inflected forms, cognates, and links to other online resources."/>
            <title>Duncan Ritchie’s velut — a Latin rhyming dictionary</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

// The Next.js docs say:
// The code above is the default Document added by Next.js.
// Feel free to remove the getInitialProps or render function
// from MyDocument if you don't need to change them.
// https://nextjs.org/docs/advanced-features/custom-document
