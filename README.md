# velut
velut is an online Latin rhyming dictionary using the MERN stack.

It is aimed at people with at least a general understanding of the Latin language and how poetry is composed in the ancient quantitative (length-based) metres and in more modern qualitative (stress-based) metres. Really, though, it is aimed at me, as a personal pet project that is now pretty elaborate!

This GitHub repo is publicly visible. The site is hosted by Render from the main branch, at https://www.velut.co.uk.

## Architecture
I store all the data in an Excel file, which is now more than 90MB in size, but I add to it frequently. Every few weeks I convert the data to Json — using a [webpage I made specifically for this purpose](https://github.com/DuncanRitchie/velut-json-generator) — and use mongoimport to replace my two MongoDB Atlas collections. The velut website (in this repository) is a single-page application that reads from the two collections in accordance with what the user searches for, using an Express.js server on the backend and client-side–rendered React.js on the frontend.

## Functionality
On visiting the [homepage](https://www.velut.co.uk), you are invited to type in a Latin word, and select the type of rhymes you want to search for. “Types of rhyme” here also include anagrams, words that scan the same metrically, or words with the same consonants in order (consonyms).

This will return words that rhyme with the input, as well as information about the “lemmata” of the input — that is, the headwords that the word can be an inflected form of. The lemmata information includes the part of speech, definitions, any notes or transliterations, the inflected forms, and lemmata that I think have the same etymology (cognates). At the bottom of the page are links to external online resources (such as Logeion and Wiktionary) that may have more details about the input word.

All my Latin words are macronized, meaning every long vowel is marked with a macron, but you can input a word without the macra, or with hyphens instead of the macra, and velut will find the word you mean, if I have it. For example, you can search for “vocabulorum”, “voca-bulo-rum”, or “vocābulōrum”, and get results for “vocābulōrum”. Similarly, proper nouns and related adjectives are capitalised, but the input is not case-sensitive except in instances of ambiguity (eg, between “Cōs” the Greek island and “cōs” meaning “whetstone”).

Other sections of the site let you find:
* Latin words whose letters are contained in an input string (I call them [subwords](https://www.velut.co.uk/subwords)),
* Latin [phrases that are anagrams](https://www.velut.co.uk/anagramphrases) of an input (this is not actually linked from elsewhere on the site, because it’s very slow!),
* Latin lemmata [from an English meaning](https://www.velut.co.uk/english), and
* Latin words [that fit either](https://www.velut.co.uk/advanced) an input pattern of letters or an input metrical scansion, or both (this is new in November 2020!).

## Screenshots
### Excel
The velut Excel file has nine sheets, of which four are shown below. The “words” sheet stores data on Latin words as plaintext. The “wordsform” sheet generates the data for the “words” sheet based on the inputs in columns B and C. The “lemmata” sheet stores data on Latin lemmata. The “output” sheet displays information (including rhymes and inflected forms) about whatever Latin word is typed in the orange cell.

![Composite screenshot of four Excel sheets](https://github.com/DuncanRitchie/velut-screenshots/blob/main/compressed/velut-excel-4sheets.png)

### Website
Displayed below is the page for the word “opportūna”, showing that it is different to “opportūnā”, scans as long-long-long-short metrically, rhymes with words like “ūna” and “lūna”, and is a form of the lemma “opportūnus” (an adjective meaning “timely; suitable”). https://www.velut.co.uk/opportu-na.

![“opportūna” on velut](https://github.com/DuncanRitchie/velut-screenshots/blob/main/compressed/velut-web-opportuna.png)

## Ongoing work
Though there are several smaller tasks I’d like to get done, most of my efforts on velut nowadays are in three areas:

### Data collection
There are many common Latin words that are not yet in the velut database, and I’d like them to be.

### De-Excellation
I rely heavily on Excel for generating, checking, and storing the data. I am gradually weaning myself off Excel by creating webpages and websites that replicate the functionality that I have/had in spreadsheets. The [velut website](https://www.velut.co.uk) itself is one example; the [Json generator](https://www.github.com/DuncanRitchie/velut-json-generator) is another; I’ve made and am making more.

### Researching SSR
Server-side rendering is something velut really should have: it takes barely any effort to look a word up in a paper dictionary, so why should a web-browser need to run a load of JavaScript to see velut? So I’m investigating how to make velut not be all client-side–rendered.

## Miscellanea
The name “velut” is an acronym for “Useful Tables of Excellent Latin Vocabulary”. Ironically, the HTML contains no &lt;table&gt; tags, while the backend dispatches queries to MongoDB collections rather than any tables in a relational database.

All the data have been collated manually by me in my spare time. Yes, really. Therefore, many lemmata are not represented, and most of the lemmata that are represented do not have all possible inflected forms. If I’ve not included a word in velut, that doesn’t mean it’s not “good Latin”. Also true is the fact that some of the words in velut are not attested in surviving literature, but are reasonable inflected forms or are neologisms.

For more information, see https://www.velut.co.uk/about; for more information about me, see my website at https://www.duncanritchie.co.uk.
