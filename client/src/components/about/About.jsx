import React, {Component} from "react"
import {Link} from "react-router-dom"
import Title from "../title/Title"
import Search from "../search/Search"
import superscriptLemmaTag from '../word/superscriptLemmaTag'
import axios from '../../axios/axios'
import './About.css'

class About extends Component {
    state = {
        wordCount: 0,
        lemmaCount: 0
    }
    
    componentDidMount() {
        axios.countWords().then((data)=>{
          this.setState({wordCount: data.data.count})
        })
        axios.countLemmata().then((data)=>{
          this.setState({lemmaCount: data.data.count})
        })
    }
    
    render() {
        document.title = "About velut"
        return (
            <div className="about">
                <Title textBeforeTitle="About" />
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
                        file <Link to="./velut" title="velut on velut" lang="la">velut</Link>, which is Latin for &ldquo;just like&rdquo;,
                        because rhyming is all about finding words that are 
                        &ldquo;just like&rdquo; a given word with respect to their endings. (And also it can be an acronym 
                        for &ldquo;Useful Tables of Excellent Latin Vocabulary&rdquo;, or 
                        &ldquo;<span lang="la"><Link to="./voca-bulo-rum" title="vocābulōrum on velut">Vocābulōrum</Link> <Link to="./excellentium" title="excellentium on velut">Excellentium</Link> <Link to="./Lati-no-rum" title="Latīnōrum on velut">Latīnōrum</Link> <Link to="./u-tile-s" title="ūtilēs on velut">Ūtilēs</Link> <Link to="./tabulae" title="tabulae on velut">Tabulae</Link></span>&rdquo;.)
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
                        Speaking of &ldquo;cool&rdquo;, the bird pictured is a fulmar, <em lang="la"><Link to="./fu-lma-rus" title="fūlmārus on velut">Fulmarus</Link>&nbsp;<Link to="./glacia-lis" title="glaciālis on velut">glacialis</Link></em>, a common sight where I was at uni.
                    </p>
                    <h2>Spelling</h2>
                    <p>
                        Words in velut are spelt 
                        with the letters abcdefghiklmnopqrstuvxyz &mdash; j is always written as i, w does not appear. 
                        Any long vowel is marked with a macron (ĀāĒēĪīŌōŪūȲȳ). 
                        In words where the stress is otherwise ambiguous, the presence or absence of an acute accent will distinguish 
                        &mdash; e.g. <Link to="./Tiberī" title="Tiberī on velut" lang="la">Tiberī</Link> (dative of the river Tiber) 
                        is stressed on the first syllable, <Link to="./Tib&eacute;rī" title="Tib&eacute;rī on velut" lang="la">Tib&eacute;rī</Link> (vocative 
                        of the name Tiberius) is stressed on the second. I&rsquo;ve also used diaereses 
                        (&auml;&euml;&iuml;&ouml;&uuml;&yuml;) on occasion.
                    </p>
                    <p>
                        Typing diacritics is not necessary: as long as the letters are right (and in the right order), velut will find 
                        a word that matches. If there are several words spelt the same, they will be offered as &ldquo;other homographs&rdquo;. 
                        You can also specify diacritics 
                        by typing a hyphen, full stop, or colon after a vowel needing a macron, acute, or diaeresis; 
                        thus <Link to="./Tibe.ri-" title="Tibe.ri- on velut" lang="la">Tibe.ri-</Link> will be interpreted as{" "}
                        <Link to="./Tib&eacute;rī" title="Tib&eacute;rī on velut" lang="la">Tib&eacute;rī</Link>.
                    </p>
                    <h2>Scansion</h2>
                    <p>
                        &ldquo;Scansion&rdquo; refers to whether the syllables of a word are classed as &ldquo;long&rdquo; or &ldquo;short&rdquo; in classical Latin poetry.
                        Long syllables (which I denote by a dash –) theoretically take twice as long to pronounce as short syllables 
                        (denoted by a breve ⏑), and the rhythm of ancient Latin (or Greek or Sanskrit) poetry comes from the arrangement 
                        of long and short syllables. Such poetry can be called quantitative verse.
                        I assume that final vowels are not elided and I assume that any syllable that could be short is short.
                    </p>
                    <p>
                        Many words have been coined for different combinations of long and short syllables &mdash; such
                        as iamb, trochee, dactyl, anapaest&hellip; &mdash; and velut will suggest the appropriate term 
                        (or several) for most words it contains.
                    </p>
                    <p>
                        velut only calculates one scansion per word. But any poet of quantitative verse will know that there may be several
                        legitimate ways to fit a word into a line. The word <Link to="/tenebra" title="tenebra on velut" lang="la">tenebra</Link>{" "}
                        (noun meaning &ldquo;darkness&rdquo;, usually pluralised), for instance, is scanned by velut as ⏑⏑⏑ but may otherwise fit quite plausibly
                        ⏑⏑– or ⏑⏑ or ⏑–⏑ or ⏑–– or ⏑– depending on the rest of the line of poetry and the poet&rsquo;s intentions.
                        Therefore, velut remains a somewhat crude tool with respect to scansion.
                    </p>
                    <h2>Rhymes</h2>
                    <p>
                        velut allows you to find rhymes under classical or ecclesiastical pronunciation. &ldquo;Classical&rdquo; pronunciation
                        is (theoretically) how an educated citizen of the Roman Republic or early Roman Empire would have pronounced Latin;
                        &ldquo;ecclesiastical&rdquo; pronunciation is a more mediaeval/modern style, heavily influenced by contemporary Italian and
                        often used in churches. Since the ancients wrote in (mostly unrhymed) quantitative verse, any Latin-language poem/song with a
                        rhyme scheme is almost certainly following ecclesiastical, or at least not strictly classical, pronunciation.
                    </p>
                    <p>
                        The most important change from classical to ecclesiastical pronunciation, as far as velut is concerned, is the loss
                        of distinction between certain vowels, such that (for example) e, ē, ae, and oe are pronounced the same. 
                        I have also assumed that the letter h is irrelevant to ecclesiastical pronunciation.
                    </p>
                    <p>
                        &ldquo;<Link to="/" title="Search for perfect rhymes on velut">Perfect</Link>&rdquo; rhymes are words pronounced 
                        identically from the stressed vowel to the end.
                    </p>
                    <p>
                        &ldquo;<Link to="/vowels" title="Search for vowel rhymes on velut">Vowel</Link>&rdquo; rhymes are words with 
                        the same vowel sounds from the stressed vowel to the end.
                    </p>
                    <p>
                        &ldquo;<Link to="/vowelsend" title="Search for vowel-and-end-consonant rhymes on velut">Vowel-and-end-consonant</Link>&rdquo; 
                        rhymes are words with the same vowel sounds from the stressed vowel to the end,
                        and with the same consonants (if any) after the final vowel.
                    </p>
                    <p>
                        Rhymes are ordered such that the words that rhyme the closest are listed next to each other. This sounds
                        simple, but my implementation of this turned out to be a bit more complicated. The order is determined 
                        primarily by the vowel(s) in and after the stressed syllable, then by the consonants between the stressed vowel and the end,
                        then by any vowels preceding the stressed syllable, then by any consonants between the stressed vowel and the beginning. 
                    </p>
                    <h2>Consonyms, anagrams, and subwords</h2>
                    <p>
                        &ldquo;<Link to="/consonyms" title="Search for consonyms on velut">Consonyms</Link>&rdquo; are words 
                        whose consonant letters (i.e. bcdfghklmnpqrstvxz) are the same and in the same order.
                    </p>
                    <p>
                        &ldquo;<Link to="/anagrams" title="Search for anagrams on velut">Anagrams</Link>&rdquo; are words 
                        whose letters are the same, but not necessarily in the same order.
                    </p>
                    <p>
                        Anagrams and consonyms (as with forms, cognates, and words that scan the same) are listed in alphabetical order.
                    </p>
                    <p>
                        &ldquo;<Link to="/subwords" title="Search for subwords on velut">Subwords</Link>&rdquo; are words whose letters
                        all appear in the input you specify. The input doesn&rsquo;t have to be a real Latin word.
                        If the British TV show &ldquo;Countdown&rdquo; or the French 
                        &ldquo;Des chiffres et des lettres&rdquo; were played in Latin, my subwords would be valid answers.
                    </p>
                    <p>
                        Subwords are in descending length order, then alphabetical.
                    </p>
                    <h2>Lemmata</h2>
                    <p>
                        The &ldquo;lemma&rdquo; (plural &ldquo;lemmata&rdquo;) of a word is the form you would find in a dictionary as the headword. A
                        given word may belong to multiple lemmata.</p>
                    <p>
                        Sometimes a word might even be multiple lemmata &mdash; for example in English &ldquo;take&rdquo; 
                        can be a verb lemma or a noun lemma &mdash; so I&rsquo;ve chosen to put a piece of distinguishing 
                        information in brackets after the lemma. Thus:{" "}
                        <Link to="/Caecilius" title="Caecilius on velut" lang="la">{superscriptLemmaTag("Caecilius[prn]")}</Link>{" "}and{" "}
                        <Link to="/Caecilius" title="Caecilius on velut" lang="la">{superscriptLemmaTag("Caecilius[adj]")}</Link>{" "}are different parts of speech;{" "}
                        <Link to="/be-ta" title="bēta on velut" lang="la">{superscriptLemmaTag("bēta[bētae]")}</Link>{" "}and{" "}
                        <Link to="/be-ta" title="bēta on velut" lang="la">{superscriptLemmaTag("bēta[bēta]")}</Link>{" "}have different genitives (letter names are indeclinable!);{" "}
                        <Link to="/sero-" title="serō on velut" lang="la">{superscriptLemmaTag("serō[satum]")}</Link>,{" "}
                        <Link to="/sero-" title="serō on velut" lang="la">{superscriptLemmaTag("serō[sertum]")}</Link>,{" "}and{" "}
                        <Link to="/sero-" title="serō on velut" lang="la">{superscriptLemmaTag("serō[serātum]")}</Link>{" "}have different participles;{" "}
                        <Link to="/iu-s" title="iūs on velut" lang="la">{superscriptLemmaTag("iūs[>iūrō]")}</Link>{" "}and{" "}
                        <Link to="/iu-s" title="iūs on velut" lang="la">{superscriptLemmaTag("iūs[>iūsculum]")}</Link>{" "}have different etymological derivatives.
                    </p>
                    <p>
                        Lemmata that derive from (or are morphologically similar to) Ancient Greek and/or Hebrew may be accompanied
                        by transliterations in those languages, along with the flags of modern Greece and Israel as appropriate.
                    </p>
                    <p>
                        &ldquo;Cognates&rdquo; are lemmata that come from the same etymological origin.
                        I try to be as accurate as I can justify in my compilation of cognates; however, etymology 
                        can be a field full of controversy and obscurity, and is not one I&rsquo;m any expert in.
                    </p>
                    <h2>Lexicography</h2>
                    <p>
                        All the data have been compiled by me, so please be aware that there are several lemmata that 
                        I don&rsquo;t have. I may simply have never come across them, I may have judged them too arcane 
                        for inclusion, or &mdash; if they begin with a prefix or are stressed on a suffix &mdash; 
                        I may have decided that I should come back to them later. Forms stressed on the grammatical 
                        ending have typically been left out.
                    </p>
                    <p>
                        There are, however, some words stressed on a suffix or grammatical ending that I have included, at my own discretion.
                    </p>
                    <p>
                        There are even some encliticized forms (i.e. ending in <span lang="la">-ne</span> implying a question,{" "}
                        <span lang="la">-que</span> meaning &ldquo;and&rdquo;, or <span lang="la">-ve</span> meaning &ldquo;or&rdquo;). 
                        I stress all encliticized forms on the penultimate syllable, as the syllable immediately prior to the enclitic.
                    </p>
                    <p>
                        If you discover that a word is not in velut (or suspect I&rsquo;ve made a mistake somewhere!), please check in other resources. 
                        I hope the links at the base of the word&rsquo;s page are of use. (Thesaurus Linguae Latinae requires a subscription,
                        which your university or library might be able to furnish you with.)
                    </p>
                    <h2>Future plans</h2>
                    <p>
                        velut contains {this.state.wordCount || "96000+"} words 
                        belonging to {this.state.lemmaCount || "11000+"} lemmata. 
                        There are plenty more I will add!
                    </p>
                </div>
                <Search prefix=""/>
            </div>
        )
    }
}

export default About