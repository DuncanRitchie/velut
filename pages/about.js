import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import superscriptLemmaTag from '../components/lemma/superscriptLemmaTag'
import { count as wordsCount } from '../lib/words/count'
import { count as lemmataCount } from '../lib/lemmata/count'
import styles from '../css/About.module.css'
import AboutContents from '../components/aboutContents/AboutContents'

export async function getServerSideProps() {
  const wordsCountData = await wordsCount()
  const lemmataCountData = await lemmataCount()

  return {
    props: {
      wordCount: wordsCountData.count,
      lemmaCount: lemmataCountData.count,
    },
  }
}

const About = (props) => {
  return (
    <>
      <Head>
        <title>About velut — a Latin rhyming dictionary</title>
        <meta
          name="Description"
          content="Explanation of the purpose and functionality of velut, the Latin vocabulary website"
        />
      </Head>
      <div className={styles.about + ' fulmar-background'}>
        <Header textBeforeTitle="About" />

        <main>
          <AboutContents />

          <section id="backstory">
            <h2>Backstory</h2>
            <p>
              I’m a{' '}
              <a
                href="https://www.duncanritchie.co.uk"
                title="Duncan Ritchie’s personal website"
              >
                software developer
              </a>{' '}
              who loves the Latin language.
            </p>
            <p>
              When I was studying Latin at uni (I have a master’s), I found it
              useful to keep an Excel spreadsheet of any vocabulary I came
              across. On occasions in my spare time, I have enjoyed writing
              poetry, most notably lyrics (in English) for a children’s musical
              drama-group, but I’ve also translated contemporary pop songs into
              Latin. I realised that if I compiled more Latin words — and wrote
              some nifty Excel formulae — I could create my own Latin rhyming
              dictionary. No-one else seemed to have really done it
              comprehensively!
            </p>
            <p>
              So I wrote the Excel formulae that found rhyming words, kept
              adding more words, wrote more formulae to manage my words and find
              out more things about them, and three years later was close to
              90,000 words. I named the file{' '}
              <Link href="/velut" title="“velut” on velut" lang="la">
                velut
              </Link>
              , which is Latin for “just like”, because rhyming is all about
              finding words that are “just like” a given word with respect to
              their endings. (And also it can be an acronym for “Useful Tables
              of Excellent Latin Vocabulary”, or “
              <span lang="la">
                <Link href="/voca-bulo-rum" title="“vocābulōrum” on velut">
                  Vocābulōrum
                </Link>{' '}
                <Link href="/excellentium" title="“excellentium” on velut">
                  Excellentium
                </Link>{' '}
                <Link href="/Lati-no-rum" title="“Latīnōrum” on velut">
                  Latīnōrum
                </Link>{' '}
                <Link href="/u-tile-s" title="“ūtilēs” on velut">
                  Ūtilēs
                </Link>{' '}
                <Link href="/tabulae" title="“tabulae” on velut">
                  Tabulae
                </Link>
              </span>
              ”.)
            </p>
          </section>

          <section id="web-development">
            <h2>Web development</h2>
            <p>
              In January 2019 I started my formal training in web development. I
              then had the skills and confidence to begin to try to make my
              velut into a website.
            </p>
            <p>
              An 80-megabyte Excel file may take several minutes to load or
              save, and no-one but me can access it. But if I exported the data
              to a database in the cloud, and made a website that accessed it,
              anyone with internet would be able to see the lists of rhymes, so
              anyone interested in writing Latin-language verse (I know I’m not
              the only one) can do so.
            </p>
            <p>
              If you’re interested in seeing the code, you can do that too — the{' '}
              <a
                href="https://github.com/DuncanRitchie/velut"
                title="velut on GitHub"
              >
                code for this website
              </a>{' '}
              is on GitHub. I&nbsp;originally built it with client-side–rendered{' '}
              <a href="https://reactjs.org/" title="React.js’s website">
                React
              </a>{' '}
              and an{' '}
              <a href="https://expressjs.com/" title="Express.js’s website">
                Express
              </a>{' '}
              backend, but I recently ported it all to the{' '}
              <a href="https://nextjs.org/" title="Next.js’s website">
                Next.js
              </a>{' '}
              framework, which makes it work even if you don’t have JavaScript
              enabled in your browser. And the site is faster to load now.
              Pretty cool!
            </p>
            <p>
              Speaking of “pretty” and “cool”, the bird pictured is a fulmar,{' '}
              <em lang="la">
                <Link href="/fu-lma-rus" title="“fūlmārus” on velut">
                  Fulmarus
                </Link>
                &nbsp;
                <Link href="/glacia-lis" title="“glaciālis” on velut">
                  glacialis
                </Link>
              </em>
              , a common sight where I was at uni.
            </p>
          </section>

          <section id="spelling">
            <h2>Spelling</h2>
            <p>
              I want searching for any word in velut to be easy, but I also want
              to distinguish between homographs — words with the same letters in
              order but different pronunciation or capitalisation. I have
              therefore adopted the following conventions.
            </p>

            <h3>Diacritics</h3>

            <p>
              Any long vowel is marked with a macron (ĀāĒēĪīŌōŪūȲȳ). In words
              where the stress is otherwise ambiguous, the presence or absence
              of an acute accent will distinguish — e.g.{' '}
              <Link href="/Tiberī" title="“Tiberī” on velut" lang="la">
                Tiberī
              </Link>{' '}
              (dative of the river Tiber) is stressed on the first syllable,{' '}
              <Link href="/Tibérī" title="“Tibérī” on velut" lang="la">
                Tibérī
              </Link>{' '}
              (vocative of the name Tiberius) is stressed on the second. I’ve
              also used diaereses (äëïöüÿ) on occasion.
            </p>
            <p>
              Typing diacritics is not necessary: as long as the letters are
              right (and in the right order), velut will find a word that
              matches. If there are several words spelt the same (diacritics and
              capitalisation notwithstanding), they will be listed as “other
              homographs”.
            </p>
            <p>
              You can also specify diacritics by typing a hyphen, full stop, or
              colon after a vowel needing a macron, acute, or diaeresis; thus{' '}
              <Link href="/Tibe.ri-" title="“Tibe.ri-” on velut" lang="la">
                Tibe.ri-
              </Link>{' '}
              will be interpreted as{' '}
              <Link href="/Tibérī" title="“Tibérī” on velut" lang="la">
                Tibérī
              </Link>
              .
            </p>

            <h3>Letters</h3>
            <p>
              Words in velut are spelt with the letters
              abcdefghiklmnopqrstuvxyz.
            </p>
            <p>
              Consonantal i is always written as i, not j. The letter w also
              does not appear — the letters u and v are used instead. And
              ligatures (æ/œ) aren’t used either: I separate the letters.
            </p>
            <p>
              If you try to search for a word containing j/w/æ/œ, these
              substitutions are attempted for you. Therefore, a search for{' '}
              <Link href="/jus" title="“jus” on velut" lang="la">
                jus
              </Link>{' '}
              yields{' '}
              <Link href="/iūs" title="“iūs” on velut" lang="la">
                iūs
              </Link>
              ,{' '}
              <Link href="/Dewa" title="“Dewa” on velut" lang="la">
                Dewa
              </Link>{' '}
              yields{' '}
              <Link href="/Dēva" title="“Dēva” on velut" lang="la">
                Dēva
              </Link>
              ,{' '}
              <Link href="/Edwardus" title="“Edwardus” on velut" lang="la">
                Edwardus
              </Link>{' '}
              yields{' '}
              <Link href="/Eduardus" title="“Eduardus” on velut" lang="la">
                Eduardus
              </Link>{' '}
              (with a consonantal first u),{' '}
              <Link href="/Æneadæ" title="“Æneadæ” on velut" lang="la">
                Æneadæ
              </Link>{' '}
              yields{' '}
              <Link href="/Aeneadae" title="“Aeneadae” on velut" lang="la">
                Aeneadae
              </Link>
              , and{' '}
              <Link href="/œconomia" title="“œconomia” on velut" lang="la">
                œconomia
              </Link>{' '}
              yields{' '}
              <Link href="/oeconomia" title="“oeconomia” on velut" lang="la">
                oeconomia
              </Link>
              .
            </p>
            <p>
              However, if you enter u or v (or any other letter that Latin words
              are spelt with on this website), no attempt is made to substitute
              a different letter. This means that neither a search for{' '}
              <Link href="/uelut" title="“uelut” on velut" lang="la">
                uelut
              </Link>{' '}
              nor{' '}
              <Link href="/velvt" title="“velvt” on velut" lang="la">
                velvt
              </Link>{' '}
              will find{' '}
              <Link href="/velut" title="“velut” on velut" lang="la">
                velut
              </Link>
              . So be careful if you’re looking up words from a text that does
              not distinguish u from v.
            </p>
          </section>

          <section id="scansion">
            <h2>Scansion</h2>
            <p>
              “Scansion” refers to whether the syllables of a word are classed
              as “long” or “short” in classical Latin poetry. Long syllables
              (which I denote by a dash –) theoretically take twice as long to
              pronounce as short syllables (denoted by a breve ⏑), and the
              rhythm of ancient Latin (or Greek or Sanskrit) poetry comes from
              the arrangement of long and short syllables. Such poetry can be
              called quantitative verse. I assume that final vowels are not
              elided and I assume that any syllable that could be short is
              short.
            </p>
            <p>
              Many words have been coined for different combinations of long and
              short syllables — such as iamb, trochee, dactyl, anapaest… — and
              velut will suggest the appropriate term (or several) for every
              Latin word it contains.
            </p>
            <p>
              velut only calculates one scansion per word. But any poet of
              quantitative verse will know that there may be several legitimate
              ways to fit a word into a line. The word{' '}
              <Link href="/tenebra" title="“tenebra” on velut" lang="la">
                tenebra
              </Link>{' '}
              (noun meaning “darkness”, usually pluralised), for instance, is
              scanned by velut as <span className="scansion">⏑⏑⏑</span> but may
              otherwise fit quite plausibly{' '}
              <span className="scansion">⏑⏑–</span> or{' '}
              <span className="scansion">⏑⏑</span> or{' '}
              <span className="scansion">⏑–⏑</span> or{' '}
              <span className="scansion">⏑––</span> or{' '}
              <span className="scansion">⏑–</span> depending on the rest of the
              line of poetry and the poet’s intentions. Therefore, velut remains
              a somewhat crude tool with respect to scansion.
            </p>
          </section>

          <section id="rhymes">
            <h2>Rhymes</h2>
            <p>
              velut allows you to find rhymes under classical or ecclesiastical
              pronunciation. “Classical” pronunciation is (theoretically) how an
              educated citizen of the Roman Republic or early Roman Empire would
              have pronounced Latin; “ecclesiastical” pronunciation is a more
              mediaeval/modern style, heavily influenced by contemporary Italian
              and often used in churches. Since the ancients wrote in (mostly
              unrhymed) quantitative verse, any Latin-language poem/song with a
              rhyme scheme is almost certainly following ecclesiastical, or at
              least not strictly classical, pronunciation.
            </p>
            <p>
              The most important change from classical to ecclesiastical
              pronunciation, as far as velut is concerned, is the loss of
              distinction between certain vowels, such that (for example) e, ē,
              ae, and oe are pronounced the same. I have also assumed that the
              letter h is irrelevant to ecclesiastical pronunciation.
            </p>
            <p>
              “
              <Link href="/" title="Search for perfect rhymes on velut">
                Perfect
              </Link>
              ” rhymes are words pronounced identically from the stressed vowel
              to the end.
            </p>
            <p>
              “
              <Link href="/vowels" title="Search for vowel rhymes on velut">
                Vowel
              </Link>
              ” rhymes are words with the same vowel sounds from the stressed
              vowel to the end.
            </p>
            <p>
              “
              <Link
                href="/vowelsend"
                title="Search for vowel-and-end-consonant rhymes on velut"
              >
                Vowel-and-end-consonant
              </Link>
              ” rhymes are words with the same vowel sounds from the stressed
              vowel to the end, and with the same consonants (if any) after the
              final vowel.
            </p>
            <p>
              Rhymes are ordered such that the words that rhyme the closest are
              listed next to each other. This sounds simple, but my
              implementation of this turned out to be a bit more complicated.
              The order is determined primarily by the vowel(s) in and after the
              stressed syllable, then by the consonants between the stressed
              vowel and the end, then by any vowels preceding the stressed
              syllable, then by any consonants between the stressed vowel and
              the beginning.
            </p>
          </section>

          <section id="consonyms-anagrams-and-subwords">
            <h2>Consonyms, anagrams, and subwords</h2>
            <p>
              “
              <Link href="/consonyms" title="Search for consonyms on velut">
                Consonyms
              </Link>
              ” are words whose consonant letters (i.e. bcdfghklmnpqrstvxz) are
              the same and in the same order.
            </p>
            <p>
              “
              <Link href="/anagrams" title="Search for anagrams on velut">
                Anagrams
              </Link>
              ” are words whose letters are the same, but not necessarily in the
              same order.
            </p>
            <p>
              Anagrams and consonyms (as with forms, cognates, and words that
              scan the same) are listed in alphabetical order.
            </p>
            <p>
              “
              <Link href="/subwords" title="Search for subwords on velut">
                Subwords
              </Link>
              ” are words whose letters all appear in the input you specify. The
              input doesn’t have to be a real Latin word. If the British TV show
              “Countdown” or the French{' '}
              <span lang="fr">“Des chiffres et des lettres”</span> were played
              in Latin, my subwords would be valid answers.
            </p>
            <p>Subwords are in descending length order, then alphabetical.</p>
          </section>

          <section id="lemmata">
            <h2>Lemmata</h2>
            <p>
              The “lemma” (plural “lemmata”) of a word is the form you would
              find in a dictionary as the headword.
            </p>
            <p>
              A given word may belong to multiple lemmata, similar to how in
              English the word “found” is a lemma in its own right, meaning “to
              establish”, but it is also the past tense of the lemma “find”.
            </p>
            <p>
              Sometimes a word might even <em>be</em> multiple lemmata — an
              English example is that “table” can be a noun lemma or a verb
              lemma (as in “to table an amendment”). In such cases, I’ve chosen
              to put a piece of distinguishing information in brackets after the
              lemma. Thus:
            </p>
            <ul>
              <li>
                <Link href="/Caecilius" title="“Caecilius” on velut">
                  {/* Next.js 13 seems to require <a> tags inside <Link> elements here, but not elsewhere. */}
                  <a>
                    {superscriptLemmaTag('Caecilius[prn]')} and{' '}
                    {superscriptLemmaTag('Caecilius[adj]')}
                  </a>
                </Link>{' '}
                are different parts of speech (proper noun and adjective
                respectively);
              </li>
              <li>
                <Link href="/be-ta" title="“bēta” on velut" lang="la">
                  <a>
                    {superscriptLemmaTag('bēta[bētae]')} and{' '}
                    {superscriptLemmaTag('bēta[bēta]')}
                  </a>
                </Link>{' '}
                have different genitives (letter names are indeclinable!);
              </li>
              <li>
                <Link href="/sero-" title="“serō” on velut" lang="la">
                  <a>
                    {superscriptLemmaTag('serō[satum]')},{' '}
                    {superscriptLemmaTag('serō[sertum]')}, and{' '}
                    {superscriptLemmaTag('serō[serātum]')}
                  </a>
                </Link>{' '}
                have different participles;
              </li>
              <li>
                <Link href="/iu-s" title="“iūs” on velut" lang="la">
                  <a>
                    {superscriptLemmaTag('iūs[>iūrō]')} and{' '}
                    {superscriptLemmaTag('iūs[>iūsculum]')}
                  </a>
                </Link>{' '}
                have different etymological derivatives.
              </li>
            </ul>
            <p>
              Lemmata that derive from (or are morphologically similar to)
              Ancient Greek and/or Hebrew may be accompanied by transliterations
              in those languages, along with the flags of modern Greece and
              Israel as appropriate.
            </p>
            <p>
              “Cognates” are lemmata that come from the same etymological
              origin. I try to be as accurate as I can justify in my compilation
              of cognates; however, etymology can be a field full of controversy
              and obscurity, and is not one I’m any expert in.
            </p>
          </section>

          <section id="english-to-latin">
            <h2>English to Latin</h2>
            <p>
              velut has an{' '}
              <Link href="/english" title="English to Latin on velut">
                English to Latin
              </Link>{' '}
              section, which returns Latin lemmata whose English meanings match
              what you enter.
            </p>
            <p>
              This is not restricted to whole words, so searching for “
              <Link
                href="/english/book"
                title="English “book” to Latin on velut"
              >
                book
              </Link>
              ” includes <span lang="la">commentārius</span> (“notebook”) and{' '}
              <span lang="la">bibliopōla</span> (“bookseller”). Perhaps less
              usefully, a search for “
              <Link href="/english/pie" title="English “pie” to Latin on velut">
                pie
              </Link>
              ” gives words meaning “piety”, “magpie”, “pierce”, etc, rather
              than anything pastry-related.
            </p>
            <p>
              When compiling meanings, I tend to be quite terse. The adjective{' '}
              <Link href="/laetus" title="“laetus” on velut" lang="la">
                laetus
              </Link>{' '}
              is given simply as “happy”, so it will not show up when you search
              for “glad”, “willing”, “pleasant”, “fertile”, et cetera. It can
              therefore be worthwhile trying different synonyms.
            </p>
            <p>
              Various other websites can be more fertile than velut in the field
              of translation into Latin. I include links to some of them. Each
              of these resources will correctly suggest{' '}
              <span lang="la">laetus</span> for “glad”, though velut does not.
              See the{' '}
              <a href="#external-links" title="External links, on this page">
                External links
              </a>{' '}
              section below for more info.
            </p>
          </section>

          <section id="advanced-search">
            <h2>Advanced Search</h2>
            <p>
              One of the newest features of velut is its{' '}
              <Link href="/advanced" title="Advanced Search on velut">
                Advanced Search
              </Link>
              , which lets you find Latin words that match a given scansion
              and/or spelling, with support for wildcards.
            </p>
            <p>
              <Link
                href="/advanced/?spelling=f_s&amp;scansion=LLX"
                title="Example query for Advanced Search on velut"
              >
                For example
              </Link>
              , words spelt “f_s” (where the underscore means any sequence of
              letters) and scanned as “LL.” (ie, three syllables with the first
              two long) include{' '}
              <Link href="/fa-cundus" title="“fācundus” on velut" lang="la">
                fācundus
              </Link>
              ,{' '}
              <Link href="/fe-sti-vus" title="“fēstīvus” on velut" lang="la">
                fēstīvus
              </Link>
              ,{' '}
              <Link href="/fo-rmo-sus" title="“fōrmōsus” on velut" lang="la">
                fōrmōsus
              </Link>
              , and{' '}
              <Link href="/fu-lma-rus" title="“fūlmārus” on velut" lang="la">
                fūlmārus
              </Link>
              .
            </p>
            <p>
              For details, see the how-to guide on the{' '}
              <Link href="/advanced" title="Advanced Search on velut">
                Advanced Search
              </Link>{' '}
              page itself.
            </p>
          </section>

          <section id="word-compilation">
            <h2>Word compilation</h2>
            <p>
              All the data have been compiled by me, so please be aware that
              there are several lemmata that I don’t have. I may simply have
              never come across them, I may have judged them too arcane for
              inclusion, or — if they begin with a prefix or are stressed on a
              suffix — I may have decided that I should come back to them later.
              Forms stressed on the grammatical ending have typically been left
              out.
            </p>
            <p>
              There are, however, some words stressed on a suffix or grammatical
              ending that I have included, at my own discretion.
            </p>
            <p>
              There are even some encliticized forms (i.e. ending in{' '}
              <Link href="/-ne" title="“-ne” on velut" lang="la">
                -ne
              </Link>{' '}
              implying a question,{' '}
              <Link href="/-que" title="“-que” on velut" lang="la">
                -que
              </Link>{' '}
              meaning “and”, or{' '}
              <Link href="/-ve" title="“-ve” on velut" lang="la">
                -ve
              </Link>{' '}
              meaning “or”). I stress all encliticized forms on the penultimate
              syllable, as the syllable immediately prior to the enclitic.
            </p>
          </section>

          <section id="external-links">
            <h2>External links</h2>
            <p>
              If you discover that a word is not in velut, or you suspect I’ve
              made a mistake somewhere (it does happen!), or you want more
              detail than I provide, please look in other resources.
            </p>
            <p>
              For any Latin word, even for words that are not in velut, I
              include a “Links to external sites” list when you search for it.
              This allows you to look Latin words up in lexicons other than
              velut. As mentioned above, I also have such a list for{' '}
              <a
                href="#english-to-latin"
                title="English to Latin, on this page"
              >
                English to Latin
              </a>
              .
            </p>
            <p>
              Other dictionaries are searchable via the website{' '}
              <a
                href="https://latinitium.com/latin-dictionaries/"
                title="Searchable dictionaries on Latinitium"
              >
                Latinitium
              </a>
              . You can download dictionary files for specialised software from{' '}
              <a
                href="https://latin-dict.github.io/"
                title="Latin dictionaries from Nikita Murzintcev"
              >
                Nikita Murzintcev’s collection
              </a>
              , although I haven’t tried. Even more dictionaries are listed on{' '}
              <a
                href="https://latin.stackexchange.com/questions/867/which-online-latin-dictionaries-should-i-use-and-why"
                title="Which online Latin dictionaries should I use and why? — Stack Exchange"
              >
                this Latin Stack Exchange thread
              </a>
              .
            </p>
            <p>
              I’m not affiliated with any external sites or responsible for
              their content, but I’ve found them helpful, so I hope they’re of
              use to you too.
            </p>
            <p>
              Of course, paper dictionaries and human Latinists can also be
              consulted. I still delve frequently into a copy of Cassell’s from
              1970!
            </p>
          </section>

          <section id="future-plans">
            <h2>Future plans</h2>
            <p>
              As I’ve explained above (under{' '}
              <a href="#backstory" title="Backstory, on this page">
                Backstory
              </a>{' '}
              and{' '}
              <a href="#web-development" title="Web development, on this page">
                Web development
              </a>
              ), I use a massive Excel file to generate, check, and store all
              the data for all the vocabulary. This has numerous downsides, so
              I’ve been making little websites and webpages to do whatever I had
              written Excel formulae to do, enabling me to trim parts of my
              Excel file while still adding words and lemmata. I’m still very
              far away from abandoning Excel altogether, but I’m definitely
              making progress.
            </p>
            <p>
              On a more lexicographical note, as mentioned under{' '}
              <a
                href="#word-compilation"
                title="Word compilation, on this page"
              >
                Word compilation
              </a>
              , most of the lemmata are missing some forms. I should really fill
              them in.
            </p>
            <p>
              Also, roughly 1% of lemmata are missing information regarding
              cognates. I’m working to redress this.
            </p>
            <p>
              velut contains {props.wordCount || '120000+'} words belonging to{' '}
              {props.lemmaCount || '13000+'} lemmata. There are plenty more I
              will add!
            </p>
          </section>
        </main>
        <Search searchbarTitle="Type a Latin word" hideDropdown={true} />
      </div>
    </>
  )
}

export default About
