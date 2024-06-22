// Adapted from https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-2-creating-a-root-layout

import Footer from '../components/footer/Footer'
import '../css/globals.css'

// Docs for metadata fields: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
export const metadata = {
  /* Page title & description should get overridden on individual pages; below are fallbacks. */
  title: 'velut — a Latin rhyming dictionary',
  description:
    'velut — a Latin dictionary with lists of rhymes, anagrams, homographs, consonyms, subwords, inflected forms, cognates, and links to other online resources.',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>
        <div id="__next">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
