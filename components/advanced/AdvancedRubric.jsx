import Details from '../details/Details'
import LatinLink from '../latinlink/LatinLink'
import styles from './AdvancedRubric.module.css'

const AdvancedRubric = () => {
  return (
    <Details className={styles.advancedRubric}>
      <summary>Show/hide how to use the Advanced Search</summary>
      <h2>How to use</h2>
      <p>This page allows you to search for Latin words by spelling, scansion, or both.</p>
      <p>
        Searches are limited to 1000 results. Searches that would return all words in velut (if I removed the 1000-word
        limit) are not allowed.
      </p>
      <section id="advanced-rubric-spelling">
        <h3>Spelling</h3>
        <p>
          Here you can specify letters that must be in the word. Letters must be typed in lowercase (and without
          diacritics) for them to be treated as letters. Uppercase letters are reserved for “wildcards”, of which there
          are the following:
        </p>
        <ul>
          <li>A capital “C” means any consonant letter (bcdfghklmnpqrstvxyz).</li>
          <li>
            A capital “V” means any vowel letter (aeiouy). Even if “i” is pronounced as a consonant, it is treated as a
            vowel here; likewise for “u” when not spelt as “v” (as in <LatinLink targetWord="suādeō" />
            ).
          </li>
          <li>A full stop means any letter (abcdefghiklmnopqrstuvxyz).</li>
          <li>A tilde (~) after any one of the above makes the letter optional.</li>
          <li>An underscore means any sequence of zero or more letters.</li>
        </ul>
        <h4>Examples</h4>
        <ul>
          <li>
            “vota” returns the words <LatinLink targetWord="vōta" /> and <LatinLink targetWord="vōtā" />.
          </li>
          <li>
            “Vota” returns the word <LatinLink targetWord="iōta" />.
          </li>
          <li>“.ota” returns all four-letter words ending in “ota”.</li>
          <li>
            “augustus” returns the words <LatinLink targetWord="Augustus" /> and <LatinLink targetWord="augustus" />.
            “VVgustus” returns the same. “Augustus” does not return anything: the “a” needs to be lowercase here.
          </li>
          <li>
            “august_” returns all the forms of <LatinLink targetWord="Augusta" />, <LatinLink targetWord="Augustus" />,{' '}
            <LatinLink targetWord="augustus" />, <LatinLink targetWord="Augustīnus" />, etc that are in velut.
          </li>
          <li>“h~V_” returns words that either begin with a vowel or begin with “h” plus a vowel.</li>
          <li>“_Vm~” returns words that either end with a vowel or end with a vowel plus “m”.</li>
          <li>“_” doesn’t return anything unless scansion is also set (see below).</li>
        </ul>
      </section>
      <section id="advanced-rubric-scansion">
        <h3>Scansion</h3>
        <p>
          Here you can specify the pattern of long and short syllables in the word. This is not case-sensitive, but
          anything other than the following will be ignored:
        </p>
        <ul>
          <li>“L” means a long syllable — one containing a long vowel or ending with a consonant sound.</li>
          <li>“S” means a short syllable — any syllable that is not long.</li>
          <li>A full stop is the anceps value, meaning any one syllable, long or short.</li>
          <li>An tilde (~) after any of the above makes the syllable optional.</li>
          <li>An underscore means any sequence of zero or more syllables.</li>
        </ul>
        <p>
          In words where a vowel is followed by plosive consonant and then “l” or “r”, both consonants belong to the
          following syllable. This makes <LatinLink targetWord="tetradrachmum" /> begin with two short syllables.
        </p>
        <h4>Examples</h4>
        <p>These examples assume “Allow elision?” is off.</p>
        <ul>
          <li>
            “LSS” returns dactyls, such as <LatinLink targetWord="Graecia" /> and <LatinLink targetWord="obdere" />.
          </li>
          <li>
            “....” returns words of four syllables, such as <LatinLink targetWord="agricola" /> and{' '}
            <LatinLink targetWord="thaumatūrgus" />.
          </li>
          <li>
            “LSSL.” returns words that can occupy the fifth and sixth feet of a dactylic hexameter, such as{' '}
            <LatinLink targetWord="amphitheātrum" /> and <LatinLink targetWord="quōmodocumque" />.
          </li>
          <li>
            “SSSSSS~” returns words of five or six short syllables, such as <LatinLink targetWord="liquefacite" /> and{' '}
            <LatinLink targetWord="Mesopotamia" />.
          </li>
          <li>
            “_SSSS_” returns words that contain a run of four short syllables, such as{' '}
            <LatinLink targetWord="agricola" /> (again) and <LatinLink targetWord="physiologiā" />.
          </li>
          <li>“_” doesn’t return anything unless spelling is also set (see above).</li>
        </ul>
      </section>
      <section id="advanced-rubric-elision">
        <h3>Allow elision?</h3>
        <p>This controls how scansion works; if scansion is not set, the tickbox has no effect.</p>
        <p>
          If “Allow elision?” is ticked, words that end with a vowel sound (including diphthongs and nasalised vowels)
          have this final syllable discarded before scansion. So a scansion of “LSSL” returns{' '}
          <LatinLink targetWord="amphitheātrum" /> and <LatinLink targetWord="quōmodocumque" /> (as well as words like{' '}
          <LatinLink targetWord="praevaleant" />, which has nothing to elide), and “LSSL.” does not.
        </p>
      </section>
      <section id="advanced-rubric-sort">
        <h3>Sorting</h3>
        <p>
          You can sort the results alphabetically, or you can sort by rhyme. If you sort by rhyme, words that rhyme the
          closest (under classical or ecclesiastical pronunciation systems) will appear closest together in the list of
          results.
        </p>
      </section>
    </Details>
  )
}

export default AdvancedRubric
