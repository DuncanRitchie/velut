import React from "react"
import {Link} from "react-router-dom"
import Title from "../title/Title"
import Search from "../search/Search"
import './About.css'

const About = (props) => {
    return (
        <div className="about">
            <Title textBeforeTitle="About" />
            {/* <Navbar input={sanitisedInput} currentPage="word"/> */}
            <div className="about-text">
                <h2>velut&rsquo;s backstory</h2>
                <p>
                When I was studying Latin at uni (I have a master&rsquo;s), I found it useful to keep an Excel spreadsheet of any vocabulary I came across. 
                On occasions in my spare time, I have enjoyed writing poetry, most notably lyrics (in English) for a children&rsquo;s 
                musical drama-group, but I&rsquo;ve also translated contemporary pop songs into Latin. I realised that if I compiled 
                more Latin words — and wrote some nifty Excel formulae — I could create my own Latin rhyming dictionary.
                No-one else seemed to have really done it comprehensively!
                </p>
                <p>
                So I wrote the Excel formulae that found rhyming words, kept adding more words, wrote more formulae to manage my 
                words and find out more things about them, and three years later was close to 90,000 words. I named the 
                file <Link to="./velut" title="velut on velut">velut</Link>, which is Latin for &ldquo;just like&rdquo;, because 
                rhyming is all about finding words that are 
                &ldquo;just like&rdquo; a given word with respect to their endings. (And also it can be an acronym 
                for &ldquo;Useful Tables of Excellent Latin Vocabulary&rdquo;, or 
                &ldquo;<Link to="./voca-bulo-rum" title="vocābulōrum on velut">Vocābulōrum</Link> <Link to="./excellentium" title="excellentium on velut">Excellentium</Link> <Link to="./Lati-no-rum" title="Latīnōrum on velut">Latīnōrum</Link> <Link to="./u-tile-s" title="ūtilēs on velut">Ūtilēs</Link> <Link to="./tabulae" title="tabulae on velut">Tabulae</Link>&rdquo;.)
                </p>
                <h2>As a website</h2>
                <p>
                In January 2019 I started my formal training in web development. I then had the skills and 
                confidence to begin to try to make my velut into a website.
                </p>
                <p>
                An 80-megabyte Excel file may 
                take several minutes to load or save, and no-one but me can access it. But if I exported 
                the data to a Mongo database, and integrated it with a React frontend via an Express server, 
                anyone with internet would be able to see the lists of rhymes, so anyone interested in 
                writing Latin-language verse (I know I&rsquo;m not the only one) can do so. Perhaps more importantly, 
                I&rsquo;ve been really enjoying the mental challenge of figuring out new tech and going full-stack 
                with it. Plus it all looks cool on my portfolio!
                </p>
                <p>
                    Speaking of &ldquo;cool&rdquo;, the bird pictured is a fulmar, <em><Link to="./fu-lma-rus" title="fūlmārus on velut">Fulmarus</Link>&nbsp;<Link to="./glacia-lis" title="glaciālis on velut">glacialis</Link></em>, a common sight where I was at uni.
                </p>
                <h2>Spelling</h2>
                <p>
                Words in velut are spelt 
                with the letters abcdefghiklmnopqrstuvxyz &mdash; j is always written as i, w does not appear. 
                Any long vowel is marked with an macron (ĀāĒēĪīŌōŪūȲȳ). 
                In words where the stress is ambiguous, the presence or absence of an acute accent will distinguish 
                &mdash; e.g. <Link to="./Tiberī" title="Tiberī on velut">Tiberī</Link> (dative of the river Tiber) 
                is stressed on the first syllable, <Link to="./Tib&eacute;rī" title="Tib&eacute;rī on velut">Tib&eacute;rī</Link> (vocative 
                of the name Tiberius) is stressed on the second. I&rsquo;ve also used diaereses 
                (&auml;&euml;&iuml;&ouml;&uuml;&yuml;) on occasion.
                </p>
                <p>
                Typing diacritics is not necessary: as long as the letters are right (and in the right order), velut will find 
                a word that matches. You may find the list of anagrams useful. You can also specify diacritics 
                by typing a hyphen, full stop, or colon after a vowel needing a macron, acute, or diaeresis; 
                thus <Link to="./Tibe.ri-" title="Tibe.ri- on velut">Tibe.ri-</Link> will be interpreted as <Link to="./Tib&eacute;rī" title="Tib&eacute;rī on velut">Tib&eacute;rī</Link>.
                </p>
                <h2>Terminology</h2>
                <p>
                &ldquo;Scansion&rdquo; refers to whether the syllables of a word are classed as &ldquo;long&rdquo; or &ldquo;short&rdquo; in classical Latin poetry.
                Long syllables (denoted by a macron ¯) theoretically take twice as long to pronounce as short syllables 
                (denoted by a breve ˘), and the rhythm of ancient poetry comes from the arrangement of long and short syllables.
                I assume that final vowels are not elided and I assume that any syllable that could be short is short.
                </p>
                <p>
                &ldquo;Perfect rhymes&rdquo; are words that sound identical from the stressed vowel to the end, under strict classical pronunciation.
                The ancient Romans didn&rsquo;t care so much for rhymes (scansion was what they really valued), and, by the time mediaeval 
                or Renaissance writers were composing Latin with rhymes, several vowels and diphthongs had converged in pronunciation,
                so most rhyming Latin poets would have generally been a lot more permissive in their rhymes than I have been.
                </p>
                <p>
                Scansion, rhymes, and anagrams are determined by my Excel formulae and JavaScript functions.
                </p>
                <p>
                The &ldquo;lemma&rdquo; (plural &ldquo;lemmata&rdquo;) of a word is the form you would find in a dictionary as the headword. A
                    given word may belong to multiple lemmata. Sometimes a word might even be multiple lemmata 
                    — for example in English &ldquo;make&rdquo; can be a verb lemma or a noun lemma — so I&rsquo;ve chosen to distinguish 
                    by use of additional information (such as part of speech) in square brackets.
                </p>
                <p>
                &ldquo;Cognates&rdquo; are lemmata that come from the same etymological origin.
                </p>
                <h2>
                    Lexicography
                </h2>
                <p>
                    All the data have been compiled by me, so please be aware that there are several lemmata that 
                    I&rsquo;ve omitted. I may simply have never come across them, I may have judged them too obscure 
                    for inclusion, or &mdash; if they begin with a prefix or are stressed on a suffix &mdash; 
                    I may have decided that I should come back to them later. Forms stressed on the grammatical 
                    ending have typically been left out.
                </p>
                <p>
                    There are, however, some words stressed on a suffix or grammatical ending that I have included, at my own discretion.
                </p>
                <p>
                    There are even some encliticized forms (i.e. ending in -ne implying a question, -que meaning &ldquo;and&rdquo;, or -ve meaning &ldquo;or&rdquo;). 
                    I stress all encliticized forms on the penultimate syllable, as the syllable immediately prior to the enclitic.
                </p>
                <p>
                    If you discover that a word is not in velut (or suspect I&rsquo;ve made a mistake somewhere!), please check in other resources. 
                    I hope the links at the base of the word&rsquo;s page are of use. (Thesaurus Linguae Latinae requires a subscription,
                    which your university or library might be able to furnish you with.)
                </p>
                <h2>Word order</h2>
                <p>
                    Rhymes are sorted such that the words that sound most similar are listed next to each other. This is determined 
                    primarily by the vowel(s) before the stressed syllable.
                </p>
                <p>
                    Anagrams, forms, and cognates are in alphabetical order.
                </p>
                <h2>Future plans</h2>
                <p>
                    The rhymes are currently restricted to perfect rhymes under classical pronunciation. Soon I will provide a dropdown menu
                    allowing you to choose less stringent rules for determining rhymes.
                </p>
                <p>
                    I have written code that finds words made from only the letters you specify, like in a letters game 
                    in the TV show Countdown (albeit in Latin). I have written code that finds multiword anagrams, also.
                    Once I&rsquo;ve connected these bits of code up to my database, I will add them to this site.
                </p>
                <p>
                    And, of course, I will continue to add words to the data.
                </p>
                <Search prefix=""/>
            </div>
            
        </div>
    )
}

export default About