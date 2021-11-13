import Link from 'next/link';
import styles from './AdvancedRubric.module.css'

const AdvancedRubric = () => {
    return (
        <div className={styles.advancedRubric}>
            <h2>How to use</h2>
            <p>This page allows you to search for Latin words by spelling, scansion, or both.</p>
            <p>Searches are limited to 1000 results. Searches that would return all words in velut (if I removed the 1000-word limit) are not allowed.</p>
            <h3>Spelling</h3>
            <p>Here you can specify letters that must be in the word. Letters must be typed in lowercase (and without diacritics) for them to be treated as letters. Uppercase letters are reserved for “wildcards”, of which there are the following:</p>
            <ul>
                <li>A capital “C” means any consonant letter (bcdfghklmnpqrstvxyz).</li>
                <li>A capital “V” means any vowel letter (aeiouy). Even if “i” is pronounced as a consonant, it is treated as a vowel here; likewise for “u” when not spelt as “v” (as in <Link href="../sua-deo-"><a title="suādeō">suādeō</a></Link>).</li>
                <li>A full stop means any letter (abcdefghiklmnopqrstuvxyz).</li>
                <li>A tilde (~) after any one of the above makes the letter optional.</li>
                <li>An underscore means any sequence of zero or more letters.</li>
            </ul>
            <h4>Examples</h4>
            <ul>
                <li>“vota” returns the words <Link href="../vo-ta"><a title="vōta">vōta</a></Link> and <Link href="../vo-ta-"><a title="vōtā">vōtā</a></Link>.</li>
                <li>“Vota” returns the word <Link href="../io-ta"><a title="iōta">iōta</a></Link>.</li>
                <li>“.ota” returns all four-letter words ending in “ota”.</li>
                <li>“augustus” returns the words <Link href="../Augustus"><a title="Augustus">Augustus</a></Link> and <Link href="../augustus"><a title="augustus">augustus</a></Link>. “VVgustus” returns the same. “Augustus” does not return anything: the “a” needs to be lowercase here.</li>
                <li>“august_” returns all the forms of <Link href="../Augusta"><a title="Augusta">Augusta</a></Link>, <Link href="../Augustus"><a title="Augustus">Augustus</a></Link>, <Link href="../augustus"><a title="augustus">augustus</a></Link>, <Link href="../Augusti-nus"><a title="Augustīnus">Augustīnus</a></Link>, etc that are in velut.</li>
                <li>“h~V_” returns words that either begin with a vowel or begin with “h” plus a vowel.</li>
                <li>“_Vm~” returns words that either end with a vowel or end with a vowel plus “m”.</li>
                <li>“_” doesn’t return anything unless scansion is also set (see below).</li>
            </ul>
            <h3>Scansion</h3>
            <p>Here you can specify the pattern of long and short syllables in the word. This is not case-sensitive, but anything other than the following will be ignored:</p>
            <ul>
                <li>“L” means a long syllable — one containing a long vowel or ending with a consonant sound.</li>
                <li>“S” means a short syllable — any syllable that is not long.</li>
                <li>A full stop is the anceps value, meaning any one syllable, long or short.</li>
                <li>An tilde (~) after any of the above makes the syllable optional.</li>
                <li>An underscore means any sequence of zero or more syllables.</li>
            </ul>
            <p>In words where a vowel is followed by plosive consonant and then “l” or “r”, both consonants belong to the following syllable, so <Link href="../tetradrachmum"><a title="tetradrachmum">tetradrachmum</a></Link> begins with two short syllables.</p>
            <h4>Examples</h4>
            <p>These examples assume “Allow elision?” is off.</p>
            <ul>
                <li>“LSS” returns dactyls, such as <Link href="../Graecia"><a title="Graecia">Graecia</a></Link> and <Link href="../obdere"><a title="obdere">obdere</a></Link>.</li>
                <li>“....” returns words of four syllables, such as <Link href="../agricola"><a title="agricola">agricola</a></Link> and <Link href="../thaumatu-rgus"><a title="thaumatūrgus">thaumatūrgus</a></Link>.</li>
                <li>“LSSL.” returns words that can occupy the fifth and sixth feet of a dactylic hexameter, such as <Link href="../amphithea-trum"><a title="amphitheātrum">amphitheātrum</a></Link> and <Link href="../quo-modocumque"><a title="quōmodocumque">quōmodocumque</a></Link>.</li>
                <li>“SSSSSS~” returns words of five or six short syllables, such as <Link href="../liquefacite"><a title="liquefacite">liquefacite</a></Link> and <Link href="../Mesopotamia"><a title="Mesopotamia">Mesopotamia</a></Link>.</li>
                <li>“_SSSS_” returns words that contain a run of four short syllables, such as <Link href="../agricola"><a title="agricola">agricola</a></Link> (again) and <Link href="../physiologia-"><a title="physiologiā">physiologiā</a></Link>.</li>
                <li>“_” doesn’t return anything unless spelling is also set (see above).</li>
            </ul>
            <h3>Allow elision?</h3>
            <p>This controls how scansion works; if scansion is not set, the tickbox has no effect.</p>
            <p>If “Allow elision?” is ticked, words that end with a vowel sound (including diphthongs and nasalised vowels) have this final syllable discarded before scansion. So a scansion of “LSSL” returns <Link href="../amphithea-trum"><a title="amphitheātrum">amphitheātrum</a></Link> and <Link href="../quo-modocumque"><a title="quōmodocumque">quōmodocumque</a></Link> (as well as words like <Link href="../praevaleant"><a title="praevaleant">praevaleant</a></Link>, which has nothing to elide), and “LSSL.” does not.</p>
            <h3>Sorting</h3>
            <p>You can sort the results alphabetically, or you can sort by rhyme. If you sort by rhyme, words that rhyme the closest (under classical or ecclesiastical pronunciation systems) will appear closest together in the list of results.</p>
        </div>
    )
}

export default AdvancedRubric;