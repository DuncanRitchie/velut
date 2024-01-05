# velut

https://www.velut.co.uk

velut is an online Latin rhyming dictionary using [Next.js](https://nextjs.org/) and [MongoDB](https://www.mongodb.com/).

Anyone with an interest in Latin can get something out of velut, but it is aimed at people with at least a general understanding of the language and how poetry is composed in the ancient quantitative (length-based) metres and in more modern qualitative (stress-based) metres. Really, though, it is aimed at me, as a personal pet project that is now pretty elaborate!

This GitHub repo is publicly visible. The site is hosted by [Fly](https://fly.io/) from the main branch, at https://www.velut.co.uk.

## Architecture

The velut website (in this repository) is a Next.js site that reads from two MongoDB collections in accordance with what the user searches for. None of its functionality requires client-side JavaScript, because the site is entirely server-side–rendered. However, the Multi-word page (www.velut.co.uk/multiword) uses client-side rendering if possible, as does the [Search component](https://github.com/DuncanRitchie/velut/blob/main/components/search/Search.jsx).

### Old version with Create React App

When I first made the velut website, it was a single-page application that had the same functionality, but using an [Express](https://expressjs.com/) server on the backend and client-side–rendered [React.js](https://reactjs.org/) on the frontend (using [Create React App](https://create-react-app.dev/)). The code is on the [mern](https://github.com/DuncanRitchie/velut/tree/mern) branch.

(MERN stands for “MongoDB, Express, React, Node”. Technically the Next.js version is also MERN, because Next.js uses an Express server internally, but with the client-side–rendered version I wrote code that directly — expressly?! — calls Express, so I’m keeping the branchnames “main” and “mern”.)

### Local data storage

All the data you see on the website are stored in an an Excel file, which is now more than 90MB in size. Until recently, I added to it frequently, converted the data to Json — using a [webpage I made specifically for this purpose](https://github.com/DuncanRitchie/velut-json-generator) — and used mongoimport to replace my two MongoDB Atlas collections.

I am now well into the process of replacing Excel with custom Json, JavaScript, and MongoDB. See the “Ongoing work” section below.

## Functionality

On visiting the [homepage](https://www.velut.co.uk), you are invited to type in a Latin word, and select the type of rhymes you want to search for. “Types of rhyme” here also include anagrams, words that scan the same metrically, or words with the same consonants in order (consonyms).

This will return words that rhyme with the input, as well as information about the “lemmata” of the input — that is, the headwords that the word can be an inflected form of. The lemmata information includes the part of speech, definitions, any notes or transliterations, the inflected forms, and lemmata that I think have the same etymology (cognates). At the bottom of the page are links to external online resources (such as Logeion and Wiktionary) that may have more details about the input word.

All my Latin words are macronized, meaning every long vowel is marked with a macron, but you can input a word without the macra, or with hyphens instead of the macra, and velut will find the word you mean, if I have it. For example, you can search for “vocabulorum”, “voca-bulo-rum”, or “vocābulōrum”, and get results for “vocābulōrum”. Similarly, proper nouns and related adjectives are capitalised, but the input is not case-sensitive except in instances of ambiguity (eg, between “Cōs” the Greek island and “cōs” meaning “whetstone”).

Other sections of the site let you find:

- Latin words whose letters are contained in an input string (I call them [subwords](https://www.velut.co.uk/subwords)),
- Latin [phrases that are anagrams](https://www.velut.co.uk/anagramphrases) of an input (this is not actually linked from elsewhere on the site, because it can be very slow!),
- Latin lemmata [from an English meaning](https://www.velut.co.uk/english),
- Latin words [that fit either](https://www.velut.co.uk/advanced) an input pattern of letters or an input metrical scansion, or both (added in November 2020), and
- [many Latin words at once](https://www.velut.co.uk/multiword) (added in May 2021).

## Screenshots

### Excel

The velut Excel file has nine sheets, of which four are shown below. The “words” sheet stores data on Latin words as plaintext. The “wordsform” sheet generates the data for the “words” sheet based on the inputs in columns B and C. The “lemmata” sheet stores data on Latin lemmata. The “output” sheet displays information (including rhymes and inflected forms) about whatever Latin word is typed in the orange cell.

![Composite screenshot of four Excel sheets](https://github.com/DuncanRitchie/velut-screenshots/blob/main/compressed/velut-excel-4sheets.png)

### Website

Displayed below is the page for the word “opportūna”, showing that it is different to “opportūnā”, scans as long-long-long-short metrically, rhymes with words like “ūna” and “lūna”, and is a form of the lemma “opportūnus” (an adjective meaning “timely; suitable”). https://www.velut.co.uk/opportu-na.

![“opportūna” on velut](https://github.com/DuncanRitchie/velut-screenshots/blob/main/compressed/velut-web-opportuna.png)

## Ongoing work

Most of my efforts on velut nowadays are towards its de-Excellation. I do not want to be using Excel for this project!

I rely heavily on Excel for generating, checking, and storing the data. I am gradually weaning myself off it by creating webpages and websites that replicate the functionality that I have had in spreadsheets. The [velut website](https://www.velut.co.uk) itself is one example; the [Json generator](https://www.github.com/DuncanRitchie/velut-json-generator) is another; I’ve made and am making [more](https://www.duncanritchie.co.uk/code#velut-projects).

At the moment, most of this work involves a script I’ve written to generate all the forms I want of all the lemmata I have.
My script generates forms for all the lemmata, but I need to manually review its output.
For the details, see my [plan of de-Excellation](https://github.com/DuncanRitchie/velut/blob/main/plan.md).

There’s still a lot of common Latin vocabulary that is not yet in the velut database, and that I’d like to include.
But, that will have to wait.
My priority is finishing my script for generating forms (or finishing checking that it’s all correct) and ensuring that I am no longer using Excel for velut.

## Environment variables

For development, there is a .env.local file in the root directory.
The file looks like this:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/velut-local?retryWrites=true&w=majority
NEXT_PUBLIC_SHOW_GENERATED_FORMS_FOR=Proper noun,Conjunction,Pronoun,Noun,Interjection,Preposition,Adverb,Adjective,Verb
```

(It’s not in version control in case I change the MongoDB connection string to point to the live database, which is obviously sensitive.)

In Next.js, environment variables beginning with “NEXT_PUBLIC” are accessible on the client-side.
The `NEXT_PUBLIC_SHOW_GENERATED_FORMS_FOR` variable is a list of parts of speech; it exists because I’m currently transitioning the inflected forms that are displayed on the website.
If a lemma belongs to a part of speech in the list, a full table of programmatically-generated forms is displayed for the lemma.
Otherwise, the only forms displayed are those I manually added to velut.

In development, generated forms should be shown for all parts of speech, so I can review them.
In production (ie, on the live website), generated forms for parts of speech that I have not reviewed are not shown.

To set an environment variable in production, I use the Fly command-line interface:

```bash
flyctl secrets set NEXT_PUBLIC_SHOW_GENERATED_FORMS_FOR="Proper noun,Conjunction,Pronoun"
```

## Development cycle

The command I use to open a development server at http://localhost:3000/ is:

```bash
npm run dev
```

(There needs to be a .env.local file as explained under “Environment variables”.)

To redeploy, I simply push to the main branch on GitHub.

## Miscellanea

The name “velut” is an acronym for “Useful Tables of Excellent Latin Vocabulary”. Ironically, the HTML contains no &lt;table&gt; tags, while the backend dispatches queries to MongoDB collections rather than any tables in a relational database.

All the data have been collated manually by me in my spare time. Yes, really. Therefore, many lemmata are not represented, and most of the lemmata that are represented do not have all possible inflected forms. (My [plan for de-Excellation](https://github.com/DuncanRitchie/velut/blob/main/plan.md) covers how I’m going to solve the latter.) If I’ve not included a word in velut, that doesn’t mean it’s not “good Latin”. Also true is the fact that some of the words in velut are not attested in surviving literature, but are reasonable inflected forms or are neologisms.

For more information, see https://www.velut.co.uk/about; for more information about me, see my website at https://www.duncanritchie.co.uk.
