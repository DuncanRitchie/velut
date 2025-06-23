# velut

https://www.velut.co.uk

velut is an online Latin rhyming dictionary using [Next.js](https://nextjs.org/) and [MongoDB](https://www.mongodb.com/).

Anyone with an interest in Latin can get something out of velut, but it is aimed at people with at least a general understanding of the language and how poetry is composed in the ancient quantitative (length-based) metres and in more modern qualitative (stress-based) metres. Really, though, it is aimed at me, as a personal pet project that is now pretty elaborate!

This GitHub repo is publicly visible. The site is hosted by [Fly](https://fly.io/) from the main branch, at https://www.velut.co.uk.

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

## Architecture

The velut website (in this repository) is a Next.js site that reads from two MongoDB collections in accordance with what the user searches for. None of its functionality requires client-side JavaScript, because the site is entirely server-side–rendered. However, the Multi-word page (www.velut.co.uk/multiword) uses client-side rendering if possible, as does the [Search component](https://github.com/DuncanRitchie/velut/blob/main/components/search/Search.jsx).

Vocabulary data and scripts for processing them are in separate repos. I have a private Json file listing all lemmata (dictionary headwords), and public JavaScript scripts that process the Json into more Json, and that is what goes into the two MongoDB collections.

The scripts include my:
- [Inflector](https://github.com/DuncanRitchie/velut-inflector), which generates inflected forms for all lemmata;
- [Lemmata Collator](https://github.com/DuncanRitchie/velut-lemmata-collator), which extracts from the Inflector’s output the words needed for the Word Data Generator; and
- [Word Data Generator](https://github.com/DuncanRitchie/velut-word-data-generator), which generates phonetic and other information about all words.

This will enable all inflected forms to be words that you can search for and see rhymes for on the velut website.

The two MongoDB collections are:
- `lemmata`, in which every document (database record) is a “lemma” with information from the source Json file plus the inflected forms from the Inflector; and
- `words`, in which every document is a “word” with information from the Word Data Generator.

There’s also a MongoDB collection called `summary`, but this is temporary.

### Old version with Create React App

When I first made the velut website, it was a single-page application that had the same functionality, but using an [Express](https://expressjs.com/) server on the backend and client-side–rendered [React.js](https://reactjs.org/) on the frontend (using [Create React App](https://create-react-app.dev/)).

The code was on a branch called mern, whose last commit was [413ddae4](https://github.com/DuncanRitchie/velut/commit/413ddae4e872b91e376a4965146bc43f68d162d3) before I merged it into main (using the ours strategy so it didn’t change the main code, which was fully Next.js by that point).

(MERN stands for “MongoDB, Express, React, Node”. Technically the Next.js version is also MERN, because Next.js uses an Express server internally, but with the client-side–rendered version I wrote code that directly — expressly?! — calls Express, so the branchnames “main” and “mern” made sense to me.)

### Excel and de-Excellation

velut started life as an Excel file, which over the years grew to more than 90MB in size.
Much of the word information you see on the website is stored in it.

In 2019, I created the website to show the data publicly.
But I still relied heavily on Excel for generating, checking, and storing the data.
I added to the Excel file frequently, converted the data to Json — using a [webpage I made specifically for this purpose](https://github.com/DuncanRitchie/velut-json-generator) — and used mongoimport to replace my two MongoDB Atlas collections.

I am now well into the process of replacing Excel with my custom Json, JavaScript, and MongoDB.
It feels good to not have to open up a 90MB file!

Very recently, I finished manually reviewing the output of my Inflector script (inflection-tables for all lemmata).
Consequently, all lemmata have inflection-tables on the live website.

The `words` collection, at the moment, consists of Latin words that I had in Excel, fed through the Word Data Generator.
This means that words that I didn’t have in Excel cannot be searched for on the velut website — even if they appear in the inflection-tables that the Inflector creates.
Soon, I will use the Inflector’s output for the input to the Word Data Generator (via a script I alluded to earlier).
That will mean every form in the inflection-tables will be in the `words` collection, and every form therefore will be a word that can be searched for on the website.

There’s still a lot of common Latin vocabulary that is not yet in the velut database, and that I’d like to include.
But, that will have to wait.
My priority is completing the new architecture without Excel.

For the details, see my [plan of de-Excellation](https://github.com/DuncanRitchie/velut/blob/main/plan.md).

## Screenshots

### Website

Displayed below is the page for the word “opportūna”, showing that it is different to “opportūnā”, scans as long-long-long-short metrically, rhymes with words like “ūna” and “lūna”, and is a form of the lemma “opportūnus” (an adjective meaning “timely; suitable”). https://www.velut.co.uk/opportu-na.

![“opportūna” on velut](https://github.com/DuncanRitchie/velut-screenshots/blob/main/compressed/velut-web-opportuna.png)

### Excel

(The velut Excel file is pretty much deprecated, but some screenshots here won’t hurt.)

The Excel file has nine sheets, of which four are shown below. The “words” sheet stores data on Latin words as plaintext. The “wordsform” sheet generates the data for the “words” sheet based on the inputs in columns B and C. The “lemmata” sheet stores data on Latin lemmata. The “output” sheet displays information (including rhymes and inflected forms) about whatever Latin word is typed in the orange cell.

![Composite screenshot of four Excel sheets](https://github.com/DuncanRitchie/velut-screenshots/blob/main/compressed/velut-excel-4sheets.png)

## Environment variables

For development, there is a .env.local file in the root directory.
The file looks like this:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/velut-local?retryWrites=true&w=majority
```

(It’s not in version control in case I change the MongoDB connection string to point to the live database, which is obviously sensitive.)

To set an environment variable in production, I use the Fly command-line interface:

```bash
flyctl secrets set NEXT_PUBLIC_SHOW_GENERATED_FORMS_FOR="Proper noun,Conjunction,Pronoun,Noun,Preposition,Interjection,Adverb,Adjective"
```

## Development cycle

The command I use to open a development server at http://localhost:3000/ is:

```bash
npm run dev
```

(There needs to be a .env.local file as explained under “Environment variables”.)

To redeploy, I simply push to the main branch on GitHub.

For how I edit the data with Json files and JavaScript scripts, see [“Architecture”](#architecture) above.

My scripts to refresh the database (using mongoimport) are private, so as not to expose the MongoDB connection string.

## Miscellanea

The name “velut” is an acronym for “Useful Tables of Excellent Latin Vocabulary”. Ironically, the backend dispatches queries to MongoDB collections rather than any tables in a relational database, and until recently the HTML contained no &lt;table&gt; tags.

All the words have been collated manually by me in my spare time. Yes, really. (For the visible tables of inflected forms, I’ve generated them programmatically, but reviewed them manually.) Therefore, many lemmata are not represented, and most of the lemmata that are represented do not have all possible inflected forms. (My [plan for de-Excellation](https://github.com/DuncanRitchie/velut/blob/main/plan.md) covers how I’m solving the latter.) If I’ve not included a word in velut, that doesn’t mean it’s not “good Latin”. Also true is the fact that some of the words in velut are not attested in surviving literature, but are reasonable inflected forms or are neologisms.

For more information, see https://www.velut.co.uk/about; for more information about me, see my website at https://www.duncanritchie.co.uk.
