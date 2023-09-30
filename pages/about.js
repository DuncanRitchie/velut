import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import superscriptLemmaTag from '../components/lemma/superscriptLemmaTag'
import { count as wordsCount } from '../lib/words/count'
import { count as lemmataCount } from '../lib/lemmata/count'
import styles from '../css/About.module.css'
import AboutContents from '../components/aboutContents/AboutContents'
import LatinLink from '../components/latinlink/LatinLink'

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
              I’m a software developer who loves the Latin language. Here’s{' '}
              <a href="https://www.duncanritchie.co.uk">my website</a>.
            </p>
            <p>
              When I was a teenager, I translated some pop songs into Latin for
              fun. There weren’t great tools for finding rhymes in that
              language, but I tried anyway.
            </p>
            <p>
              When I was studying Latin at uni, I found it useful to keep an
              Excel spreadsheet of any vocabulary I came across. I realised
              that, if I wrote some nifty Excel formulae, I could create my own
              Latin rhyming dictionary. No-one else seemed to have done it
              comprehensively!
            </p>
            <p>
              So I wrote Excel formulae that found rhyming words in my data. And
              I kept adding more words, and I wrote more formulae to manage my
              words and find out more things about them. Three years later, I
              had close to 90,000 words.
            </p>
            <p>
              I named the file{' '}
              <Link href="/velut" lang="la">
                velut
              </Link>
              , which is Latin for “just like”, because rhyming means finding
              words that have endings “just like” each other. (And also it can
              be an acronym for “Useful Tables of Excellent Latin Vocabulary”,
              or “
              <span lang="la">
                <Link href="/voca-bulo-rum">Vocābulōrum</Link>{' '}
                <Link href="/excellentium">Excellentium</Link>{' '}
                <Link href="/Lati-no-rum">Latīnōrum</Link>{' '}
                <Link href="/u-tile-s">Ūtilēs</Link>{' '}
                <Link href="/tabulae">Tabulae</Link>
              </span>
              ”.)
            </p>
            <p>I graduated with a master’s degree in Latin in June 2018.</p>
          </section>

          <section id="web-development">
            <h2>Web development</h2>
            <p>
              In January 2019 I started my formal training in web development. I
              then had the skills and confidence to begin to make my velut into
              a website.
            </p>
            <p>
              An 80-megabyte Excel file may take several minutes to load or
              save, and no-one but me can access it. But if I exported the data
              to a database in the cloud, and made a website that reads from it
              — then anyone with internet would be able to see the lists of
              rhymes. So anyone interested in writing Latin-language verse (I
              know I’m not the only one) can do so more easily.
            </p>
            <p>
              If you’re interested in seeing the code, you can do that too — the{' '}
              <a href="https://github.com/DuncanRitchie/velut">
                code for this website
              </a>{' '}
              is on GitHub. I&nbsp;originally built it with client-side–rendered{' '}
              <a href="https://reactjs.org/">React</a> and an{' '}
              <a href="https://expressjs.com/">Express</a> backend. But I
              recently ported it all to the{' '}
              <a href="https://nextjs.org/">Next.js</a> framework, which makes
              it work even if you don’t have JavaScript enabled in your browser.
              And the site is often faster to load now.
            </p>
            <p>
              But moving to Next.js is not the end of my ambitions for velut. I
              do not intend to keep using Excel for this project any more than I
              have to. See the <a href="#future-plans">Future plans</a> section
              for how I’m changing how the data are generated and stored. It’s a
              lot of work, but it will be pretty cool when it’s all sorted.
            </p>
            <p>
              Speaking of “pretty” and “cool”, the bird pictured is a fulmar,{' '}
              <em lang="la">
                <Link href="/fu-lma-rus">Fulmarus</Link>
                &nbsp;
                <Link href="/glacia-lis">glacialis</Link>
              </em>
              , a common sight where I was at uni.
            </p>
          </section>

          <section id="spelling">
            <h2>Spelling</h2>
            <p>
              I want searching for any word in velut to be easy, but I also want
              to distinguish between homographs. (Those are words with the same
              letters in the same order, but different pronunciation or
              capitalisation.) I have thus adopted the following conventions.
            </p>

            <h3>Diacritics</h3>

            <p>
              Any long vowel is marked with a macron (ĀāĒēĪīŌōŪūȲȳ). In words
              where the stress is otherwise ambiguous, the presence or absence
              of an acute accent will distinguish. For example,{' '}
              <Link href="/Tiberī" lang="la">
                Tiberī
              </Link>{' '}
              (dative of the river Tiber) has stress on the first syllable, and{' '}
              <Link href="/Tibérī" lang="la">
                Tibérī
              </Link>{' '}
              (vocative of the name Tiberius) has stress on the second. I’ve
              also used diaereses (äëïöüÿ) on occasion.
            </p>
            <p>
              Typing diacritics is not necessary. As long as the letters are
              right (and in the right order), velut will find a word that
              matches. If there are several words spelt the same (ignoring
              diacritics and capitalisation), they will be listed as “other
              homographs”.
            </p>
            <p>
              You can also specify diacritics by typing a hyphen, full stop, or
              colon after a vowel needing a macron, acute, or diaeresis. In this
              way{' '}
              <Link href="/Tibe.ri-" lang="la">
                Tibe.ri-
              </Link>{' '}
              will be interpreted as{' '}
              <Link href="/Tibérī" lang="la">
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
              substitutions are attempted for you. A search for{' '}
              <Link href="/jus" lang="la">
                jus
              </Link>{' '}
              yields{' '}
              <Link href="/iūs" lang="la">
                iūs
              </Link>
              ,{' '}
              <Link href="/Dewa" lang="la">
                Dewa
              </Link>{' '}
              yields{' '}
              <Link href="/Dēva" lang="la">
                Dēva
              </Link>
              ,{' '}
              <Link href="/Edwardus" lang="la">
                Edwardus
              </Link>{' '}
              yields{' '}
              <Link href="/Eduardus" lang="la">
                Eduardus
              </Link>{' '}
              (with a consonantal first u),{' '}
              <Link href="/Æneadæ" lang="la">
                Æneadæ
              </Link>{' '}
              yields{' '}
              <Link href="/Aeneadae" lang="la">
                Aeneadae
              </Link>
              , and{' '}
              <Link href="/œconomia" lang="la">
                œconomia
              </Link>{' '}
              yields{' '}
              <Link href="/oeconomia" lang="la">
                oeconomia
              </Link>
              .
            </p>
            <p>
              However, if you enter u or v (or any other letter that Latin words
              are spelt with on this website), no attempt is made to substitute
              a different letter. This means that neither a search for{' '}
              <Link href="/uelut" lang="la">
                uelut
              </Link>{' '}
              nor{' '}
              <Link href="/velvt" lang="la">
                velvt
              </Link>{' '}
              will find{' '}
              <Link href="/velut" lang="la">
                velut
              </Link>
              . So be careful if you’re looking up words from a text that does
              not distinguish u from v.
            </p>
          </section>

          <section id="scansion">
            <h2>Scansion</h2>
            <p>
              Syllables are classed as “long” or “short” in classical Latin
              poetry; this is called scansion. Long syllables theoretically take
              twice as long to pronounce as short syllables. The rhythm of
              ancient Latin (or Greek or Sanskrit) poetry comes from the
              arrangement of long and short syllables. Such poetry can be called
              quantitative verse.
            </p>
            <p>
              I use a dash – to denote a long syllable and a breve ⏑ for a
              short. I assume that final vowels are not elided and I assume that
              any syllable that could be short is short.
            </p>
            <p>
              Many words exist for different combinations of long and short
              syllables, such as iamb, trochee, dactyl, anapaest, and so on.
              This site will suggest the appropriate term (or several) for every
              Latin word it contains.
            </p>
            <p>
              velut only calculates one scansion per word. But any poet of
              quantitative verse will know that there may be several legitimate
              ways to fit a word into a line. For instance, velut gives ⏑⏑⏑
              scansion to the word{' '}
              <Link href="/tenebra" lang="la">
                tenebra
              </Link>
              . But the same word may otherwise fit{' '}
              <span className="scansion">⏑⏑⏑</span> or{' '}
              <span className="scansion">⏑⏑</span> or{' '}
              <span className="scansion">⏑–⏑</span> or{' '}
              <span className="scansion">⏑––</span> or{' '}
              <span className="scansion">⏑–</span> depending on the rest of the
              line of poetry and the poet’s intentions. For this reason, velut
              remains a somewhat crude tool with regard to scansion.
            </p>
          </section>

          <section id="rhymes">
            <h2>Rhymes</h2>
            <p>
              velut allows you to find rhymes under classical or ecclesiastical
              pronunciation. “Classical” pronunciation is (theoretically) how an
              educated citizen of the Roman Republic or early Roman Empire would
              have pronounced Latin. “Ecclesiastical” pronunciation is a more
              mediaeval or modern style. It’s heavily influenced by contemporary
              Italian and often used in churches.
            </p>
            <p>
              The ancients wrote in (mostly unrhymed) quantitative verse. If a
              poem or song is in Latin and has a rhyme scheme, it’s probably
              meant to follow ecclesiastical pronunciation. (Or at least, not
              strictly classical.)
            </p>
            <p>
              A major change from the classical style to the ecclesiastical is
              the loss of distinction between vowels. For example, e, ē, ae, and
              oe are different under classical pronunciation, but the same in
              ecclesiastical. I have also assumed that the letter h is
              irrelevant to ecclesiastical pronunciation.
            </p>
            <p>
              “<Link href="/">Perfect</Link>” rhymes are words pronounced
              identically from the stressed vowel to the end.
            </p>
            <p>
              “<Link href="/vowels">Vowel</Link>” rhymes are words with the same
              vowel sounds from the stressed vowel to the end.
            </p>
            <p>
              “<Link href="/vowelsend">Vowel-and-end-consonant</Link>” rhymes
              are also words with the same vowel sounds from the stressed vowel
              to the end. In addition, they have the same consonants (if any)
              after the final vowel.
            </p>
            <p>
              Rhymes are ordered such that the words that rhyme the closest are
              listed next to each other. This sounds simple, but my
              implementation of this turned out to be a bit more complicated.
              The order is determined primarily by the vowel(s) in and after the
              stressed syllable. If those are the same, then sorting goes by the
              consonants between the stressed vowel and the end. Then it sorts
              by any vowels preceding the stressed vowel, going backwards
              through the word. Then it goes by any consonants between the
              stressed vowel and the beginning, also going backwards through the
              word. If all of that is the same for two words, they are
              pronounced the same (homophones).
            </p>
          </section>

          <section id="consonyms-anagrams-and-subwords">
            <h2>Consonyms, anagrams, and subwords</h2>
            <p>
              “<Link href="/consonyms">Consonyms</Link>” are words whose
              consonant letters (bcdfghklmnpqrstvxz) are the same and in the
              same order.
            </p>
            <p>
              “<Link href="/anagrams">Anagrams</Link>” are words whose letters
              are the same, but not necessarily in the same order.
            </p>
            <p>
              Anagrams and consonyms are listed in alphabetical order. (So are
              forms, cognates, and words that scan the same.)
            </p>
            <p>
              “<Link href="/subwords">Subwords</Link>” are words whose letters
              all appear in the input you specify. The input doesn’t have to be
              a real Latin word. If the British TV show “Countdown” or the
              French <span lang="fr">“Des chiffres et des lettres”</span> were
              played in Latin, my subwords would be valid answers.
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
              A given word may belong to more than one lemmata. In English, the
              word “found” is a lemma in its own right, meaning “to establish”,
              but it is also the past tense of the lemma “find”. The same
              applies to many Latin words.
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
                <Link href="/Caecilius">
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
                <Link href="/be-ta" lang="la">
                  <a>
                    {superscriptLemmaTag('bēta[bētae]')} and{' '}
                    {superscriptLemmaTag('bēta[bēta]')}
                  </a>
                </Link>{' '}
                have different genitives (letter names are indeclinable!);
              </li>
              <li>
                <Link href="/sero-" lang="la">
                  <a>
                    {superscriptLemmaTag('serō[satum]')},{' '}
                    {superscriptLemmaTag('serō[sertum]')}, and{' '}
                    {superscriptLemmaTag('serō[serātum]')}
                  </a>
                </Link>{' '}
                have different participles;
              </li>
              <li>
                <Link href="/iu-s" lang="la">
                  <a>
                    {superscriptLemmaTag('iūs[>iūrō]')} and{' '}
                    {superscriptLemmaTag('iūs[>iūsculum]')}
                  </a>
                </Link>{' '}
                have different etymological derivatives.
              </li>
            </ul>
            <p>
              If a lemma derives from (or looks like) Ancient Greek and/or
              Hebrew, it may be accompanied by transliterations in those
              languages. These are marked with the flags of modern Greece and
              Israel. (Yes, I know it’s anachronistic, but flags are pretty.)
            </p>
            <p>
              “Cognates” are lemmata that come from the same etymological
              origin. I try to be as accurate as I can justify in my compilation
              of cognates. Unfortunately, etymology can be a field full of
              controversy and obscurity, and is not one I’m any expert in.
            </p>
          </section>

          <section id="forms">
            <h2>Forms</h2>
            <p>
              When velut was all in an Excel file, I added all words manually,
              including inflected forms. I could add enough forms to give a
              sense of what declension or conjugation a lemma belonged to. But I
              couldn’t include all forms, and I couldn’t assign grammatical
              properties to the forms, and adding what forms I did add could be
              quite tedious.
            </p>
            <p>
              So there are a lot of lemmata in velut whose forms are simply
              given as an alphabetically ordered list, such as:{' '}
              <LatinLink targetWord="verba" /> <LatinLink targetWord="verbī" />{' '}
              <LatinLink targetWord="verbīs" /> <LatinLink targetWord="verbō" />{' '}
              <LatinLink targetWord="verbum" />. There’s no labelling of forms
              as singular or plural or nominative etc, and many forms are
              missing (eg <LatinLink targetWord="verbōrum" />
              ).
            </p>
            <p>
              To fix this, I’ve written a script that generates forms
              programmatically, including grammatical labels. I call it the
              Inflector. I’m currently in the middle of checking the output of
              the Inflector, which means checking each of my {props.lemmaCount}{' '}
              lemmata individually, so I can account for idiosyncrasies in the
              vocabulary.
            </p>
            <p>
              At time of writing this, I’ve checked proper nouns, conjunctions,
              and pronouns. Those lemmata now have their forms displayed in
              reasonable inflection-tables on the velut website. Over time I
              will do the same for the remaining parts of speech.
            </p>
            <p>
              A lot of forms are generated by the Inflector that were never in
              my Excel file. They are not yet in velut as words — you can’t
              search for them with the searchbar, they don’t appear in lists of
              rhymes, etc. They’re only in the inflection-tables. Once I’ve
              confirmed that all the generated forms are reasonable, I will make
              them into fully-fledged words.
            </p>
            <p>
              For actual numbers about how far I’ve progressed in writing the
              Inflector and checking its output, and more information about how
              I’m reducing my reliance on Excel, see my page on{' '}
              <Link href="/deexcellation">the “de-Excellation” of velut</Link>.
            </p>
          </section>

          <section id="english-to-latin">
            <h2>English to Latin</h2>
            <p>
              velut has an <Link href="/english">English to Latin</Link>{' '}
              section, which returns Latin lemmata whose English meanings match
              what you enter.
            </p>
            <p>
              This is not restricted to whole words, so searching for “
              <Link href="/english/book">book</Link>” includes{' '}
              <span lang="la">commentārius</span> (“notebook”) and{' '}
              <span lang="la">bibliopōla</span> (“bookseller”). Perhaps less
              usefully, a search for “<Link href="/english/pie">pie</Link>”
              gives words meaning “piety”, “magpie”, “pierce”, etc, and nothing
              pastry-related.
            </p>
            <p>
              When compiling meanings, I tend to be quite terse. The adjective{' '}
              <Link href="/laetus" lang="la">
                laetus
              </Link>{' '}
              is given simply as “happy”, so it will not show up when you search
              for “glad”, “willing”, “pleasant”, “fertile”, et cetera. It can be
              worthwhile trying different synonyms.
            </p>
            <p>
              Various other websites can be more fertile than velut in the field
              of translation into Latin. I include links to some of them. Each
              of these resources will correctly suggest{' '}
              <span lang="la">laetus</span> for “glad”, though velut does not.
              See the <a href="#external-links">External links</a> section below
              for more info.
            </p>
          </section>

          <section id="multi-word-look-up">
            <h2>Multi-word Look-up</h2>
            <p>
              If you want to search for many Latin words in velut at once, use
              the <Link href="/multiword">Multi-word Look-up</Link>.
            </p>
            <p>This will give you links to the ones that are in velut.</p>
            <p>
              I also have an online tool for{' '}
              <a href="https://www.duncanritchie.co.uk/velut-dictionary-links">
                looking several words up in several dictionaries
              </a>
              . This isn’t on the velut website, but the Multi-word Look-up
              links to it if you search for words that are not in velut.
            </p>
          </section>

          <section id="advanced-search">
            <h2>Advanced Search</h2>
            <p>
              The <Link href="/advanced">Advanced Search</Link> of velut lets
              you find Latin words that match a given scansion and/or spelling,
              with support for wildcards.
            </p>
            <p>
              <Link href="/advanced/?spelling=f_s&amp;scansion=LLX">
                For example
              </Link>
              , words spelt “f_s” (where the underscore means any sequence of
              letters) and scanned as “LL.” (ie, three syllables with the first
              two long) include{' '}
              <Link href="/fa-cundus" lang="la">
                fācundus
              </Link>
              ,{' '}
              <Link href="/fe-sti-vus" lang="la">
                fēstīvus
              </Link>
              ,{' '}
              <Link href="/fo-rmo-sus" lang="la">
                fōrmōsus
              </Link>
              , and{' '}
              <Link href="/fu-lma-rus" lang="la">
                fūlmārus
              </Link>
              .
            </p>
            <p>
              For details, see the how-to guide on the{' '}
              <Link href="/advanced">Advanced Search</Link> page itself.
            </p>
          </section>

          <section id="word-compilation">
            <h2>Word compilation</h2>
            <p>
              All the data have been compiled by me, so please be aware that
              there are several lemmata that I don’t have. I may simply have
              never come across them. I may have judged them too arcane for
              inclusion. If they begin with a prefix or are stressed on a
              suffix, I may have decided that I should come back to them later.
              Forms stressed on the grammatical ending have typically been left
              out.
            </p>
            <p>
              There are, however, some words stressed on a suffix or grammatical
              ending that I have included, at my own discretion.
            </p>
            <p>
              There are even some encliticized forms (ending in{' '}
              <Link href="/-ne" lang="la">
                -ne
              </Link>{' '}
              implying a question,{' '}
              <Link href="/-que" lang="la">
                -que
              </Link>{' '}
              meaning “and”, or{' '}
              <Link href="/-ve" lang="la">
                -ve
              </Link>{' '}
              meaning “or”). I stress all encliticized forms on the penultimate
              syllable — the syllable immediately prior to the enclitic.
            </p>
            <p>
              I do intend to add a lot more words. As I said in the{' '}
              <a href="#forms">Forms</a> section, I want velut to contain all
              reasonable forms for all the lemmata it has. And having more
              lemmata would be nice too.
            </p>
          </section>

          <section id="external-links">
            <h2>External links</h2>
            <p>
              If you discover that a word is not in velut, or I’ve made a
              mistake somewhere, or you want more detail than I provide, please
              look in other resources.
            </p>
            <p>
              For any Latin word, even for words that are not in velut, I
              include a “Links to external sites” list when you search for it.
              This allows you to look Latin words up in lexicons other than
              velut. As mentioned above, I also have such a list for{' '}
              <a href="#english-to-latin">English to Latin</a>.
            </p>
            <p>
              Other dictionaries are searchable via the website{' '}
              <a href="https://latinitium.com/latin-dictionaries/">
                Latinitium
              </a>
              . You can download dictionary files for specialised software from{' '}
              <a href="https://latin-dict.github.io/">
                Nikita Murzintcev’s collection
              </a>
              , although I haven’t tried. Even more dictionaries are listed on{' '}
              <a href="https://latin.stackexchange.com/questions/867/which-online-latin-dictionaries-should-i-use-and-why">
                this Latin Stack Exchange thread
              </a>
              .
            </p>
            <p>
              I’m not affiliated with any external sites or responsible for
              their content. I’ve found them helpful, so I hope they’re of use
              to you too.
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
              As I’ve explained above (under <a href="#backstory">Backstory</a>{' '}
              and <a href="#web-development">Web development</a>
              ), I use a massive Excel file to generate, check, and store all
              the data for all the vocabulary. This has many downsides, so I’ve
              been making little webpages and scripts to do whatever I had
              written Excel formulae to do. This has enabled me to trim parts of
              my Excel file while still adding words and lemmata. I’m still very
              far away from abandoning Excel altogether, but I’m definitely
              making progress.
            </p>
            <p>
              On a more lexicographical note, as mentioned under{' '}
              <a href="#forms">Forms</a> and{' '}
              <a href="#word-compilation">Word compilation</a>, most of the
              lemmata are missing some inflected forms. (Adjectives and verbs
              are particularly under-represented.) I’ve recently written a
              script that will generate all the forms I want for all the lemmata
              I have. I will need to finish reviewing the output of this script
              before I display all the generated forms on the live website and
              make all of them fully-fledged words that can be searched for.
            </p>
            <p>
              Also, roughly 1% of lemmata are missing information about
              cognates. I’m working to redress this.
            </p>
            <p>
              velut contains{' '}
              <strong>{props.wordCount || '120000+'} words</strong> belonging to{' '}
              <strong>{props.lemmaCount || '13000+'} lemmata</strong>, not
              including words that are in inflection-tables but not fully part
              of velut yet. The number of words will rise dramatically when I
              include everything from my new script for generating forms. There
              are also plenty more lemmata that I will add… after I’ve updated
              all my existing lemmata. By that point, I’ll no longer be using
              Excel at all for velut.
            </p>
          </section>
        </main>
        <Search searchbarLabel="Latin word" hideDropdown={true} />
      </div>
    </>
  )
}

export default About
