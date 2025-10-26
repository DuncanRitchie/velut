//// This file exists to give <html> a `lang` attribute
//// and because Next.js seems to want a data-scroll-behavior attribute
//// https://nextjs.org/docs/messages/missing-data-scroll-behavior
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-scroll-behavior="smooth">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
