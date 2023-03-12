import { macraToHyphens } from '../lib/words/diacritics'
import getRandomWord from '../lib/words/random'

// `RedirectFromRandomPage` is triggered from /random to redirect to a random word page.
function RedirectFromRandomPage() {}

export const getServerSideProps = async ({ query, res }) => {
  const random = await getRandomWord()
  if (random.success) {
    const randomWord = random.word
    res.writeHead(302, {
      Location: `/${macraToHyphens(randomWord)}`,
    })
    res.end()
  }
  return { props: {} }
}

export default RedirectFromRandomPage
