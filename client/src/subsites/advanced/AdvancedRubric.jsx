import React from 'react';
import {Link} from 'react-router-dom';
import './AdvancedRubric.css'

const AdvancedRubric = () => {
    return (
        <div className="advanced-rubric">
            <h2>How to use</h2>
            <p>This page allows you to search for Latin words by spelling, scansion, or both.</p>
            <p>Searches are limited to 1000 results.</p>
            <h3>Spelling</h3>
            <p>Here you can specify letters that must be in the word. Letters must be typed in lowercase (and without diacritics) for them to be treated as letters. Uppercase letters are reserved for “wildcards”, of which there are the following:</p>
            <ul>
                <li>If a capital “C” is input, it means any consonant letter (bcdfghklmnpqrstvxyz).</li>
                <li>If a capital “V” is input, it means any vowel letter (aeiouy). Even if “i” is pronounced as a consonant, it is treated as a vowel here.</li>
                <li>If a full stop is input, it means any letter (abcdefghiklmnopqrstuvxyz).</li>
                <li>If an underscore is input, it means any sequence of zero or more letters.</li>
                <li>If an exclamation-mark is added after a letter, it makes the letter optional.</li>
            </ul>
            <h4>Examples</h4>
            <ul>
                <li>“vota” returns the words <Link to="../vo-ta" title="vōta">vōta</Link> and <Link to="../vo-ta-" title="vōtā">vōtā</Link>.</li>
                <li>“Vota” returns the word <Link to="../io-ta" title="iōta">iōta</Link>.</li>
                <li>“.ota” returns all four-letter words ending in “ota”.</li>
                <li>“augustus” returns the words <Link to="../Augustus" title="Augustus">Augustus</Link> and <Link to="../augustus" title="augustus">augustus</Link>. “VVgustus” returns the same. “Augustus” does not return anything: the “a” needs to be lowercase here.</li>
                <li>“august_” returns all the forms of <Link to="../Augusta" title="Augusta">Augusta</Link>, <Link to="../Augustus" title="Augustus">Augustus</Link>, <Link to="../augustus" title="augustus">augustus</Link>, <Link to="../Augusti-nus" title="Augustīnus">Augustīnus</Link>, etc that are in velut.</li>
                <li>“h!V_” returns words that either begin with a vowel or begin with “h” plus a vowel.</li>
                <li>“_Vm!” returns words that either end with a vowel or end with a vowel plus “m”.</li>
                <li>“_” doesn’t return anything unless scansion is also set (see below).</li>
            </ul>
            <h3>Scansion</h3>
            <p>Here you can specify the pattern of long and short syllables in the word. This is not case-sensitive, but anything other than the following will be ignored:</p>
            <ul>
                <li>“L” means a long syllable — one containing a long vowel or ending with a consonant sound.</li>
                <li>“S” means a short syllable — any syllable that is not long.</li>
                <li>“X” is the anceps value, meaning any one syllable, long or short.</li>
                <li>An exclamation-mark after any of the above makes the syllable optional.</li>
                <li>An underscore means any sequence of zero or more syllables.</li>
            </ul>
            <p>In words where a vowel is followed by plosive consonant and then “l” or “r”, both consonants belong to the following syllable, so <Link to="../tetradrachmum" title="tetradrachmum">tetradrachmum</Link> begins with two short syllables.</p>
            <h4>Examples</h4>
            <p>These examples assume “Allow elision?” is off.</p>
            <ul>
                <li>“LSS” returns dactyls, such as <Link to="../Graecia" title="Graecia">Graecia</Link> and <Link to="../obdere" title="obdere">obdere</Link>.</li>
                <li>“XXXX” returns words of four syllables, such as <Link to="../agricola" title="agricola">agricola</Link> and <Link to="../thaumatu-rgus" title="thaumatūrgus">thaumatūrgus</Link>.</li>
                <li>“LSSLX” returns words that can occupy the fifth and sixth feet of a dactylic hexameter, such as <Link to="../amphithea-trum" title="amphitheātrum">amphitheātrum</Link> and <Link to="../quo-modocumque" title="quōmodocumque">quōmodocumque</Link>.</li>
                <li>“SSSSSS!” returns words of five or six short syllables, such as <Link to="../liquefacite" title="liquefacite">liquefacite</Link> and <Link to="../Mesopotamia" title="Mesopotamia">Mesopotamia</Link>.</li>
                <li>“_SSSS_” returns words that contain a run of four short syllables, such as <Link to="../agricola" title="agricola">agricola</Link> (again) and <Link to="../physiologia-" title="physiologiā">physiologiā</Link>.</li>
                <li>“_” doesn’t return anything unless spelling is also set (see above).</li>
            </ul>
            <h3>Allow elision?</h3>
            <p>This controls how scansion works; if scansion is not set, the tickbox has no effect.</p>
            <p>If “Allow elision?” is ticked, words that end with a vowel sound (including diphthongs and nasalised vowels) have this final syllable discarded before scansion. So a scansion of “LSSL” returns <Link to="../amphithea-trum" title="amphitheātrum">amphitheātrum</Link> and <Link to="../quo-modocumque" title="quōmodocumque">quōmodocumque</Link> (as well as words like <Link to="../praevaleant" title="praevaleant">praevaleant</Link>, which has nothing to elide), and “LSSLX” does not.</p>
            <h3>Sorting</h3>
            <p>You can sort the results alphabetically, or you can sort by rhyme. If you sort by rhyme, words that rhyme the closest (under classical or ecclesiastical pronunciation systems) will appear closest together in the list of results.</p>
        </div>
    )
}

export default AdvancedRubric;
