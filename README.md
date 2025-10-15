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
- Latin lemmata [from an English meaning](https://www.velut.co.uk/english),
- Latin words [that fit either](https://www.velut.co.uk/advanced) an input pattern of letters or an input metrical scansion, or both (added in November 2020), and
- [many Latin words at once](https://www.velut.co.uk/multiword) (added in May 2021).

## Architecture

The velut website (in this repository) is a Next.js site that reads from two MongoDB collections in accordance with what the user searches for. None of its functionality requires client-side JavaScript, because the site is entirely server-side–rendered. However, the Multi-word page (www.velut.co.uk/multiword) uses client-side rendering if possible, as does the [Search component](https://github.com/DuncanRitchie/velut/blob/main/components/search/Search.jsx).

Vocabulary data and scripts for processing them are in separate repos. I have a private Json file listing all lemmata (dictionary headwords) and a private Batch script I call the “Data Updater” (private so as not to expose the MongoDB connection string). The Data Updater runs JavaScript scripts — these are public — that process the Json into more Json, and uses mongoimport to put the output into the two MongoDB collections.

The JavaScript scripts are my:
- [Inflector](https://github.com/DuncanRitchie/velut-inflector), which generates inflected forms for all lemmata;
- [Lemmata Collator](https://github.com/DuncanRitchie/velut-lemmata-collator), which extracts from the Inflector’s output the words needed for the Word Data Generator; and
- [Word Data Generator](https://github.com/DuncanRitchie/velut-word-data-generator), which generates phonetic and other information about all words.

This enables all inflected forms to be words that you can search for and see rhymes for on the velut website.

The two MongoDB collections are:

- `lemmata`, in which every document (database record) is a “lemma” with information from the source Json file plus the inflected forms from the Inflector; and
- `words`, in which every document is a “word” with information from the Word Data Generator.

A [redacted copy of the “Data Updater”](https://www.duncanritchie.co.uk/blog/deexcellation-of-velut#the-data-updater) is in an article on my blog.

### Old version with Create React App

When I first made the velut website, it was a single-page application that had the same functionality, but using an [Express](https://expressjs.com/) server on the backend and client-side–rendered [React.js](https://reactjs.org/) on the frontend (using [Create React App](https://create-react-app.dev/)).

The code was on a branch called mern, whose last commit was [413ddae4](https://github.com/DuncanRitchie/velut/commit/413ddae4e872b91e376a4965146bc43f68d162d3) before I merged it into main (using the ours strategy so it didn’t change the main code, which was fully Next.js by that point).

(MERN stands for “MongoDB, Express, React, Node”. Technically the Next.js version is also MERN, because Next.js uses an Express server internally, but with the client-side–rendered version I wrote code that directly — expressly?! — calls Express, so the branchnames “main” and “mern” made sense to me.)

I wrote a blogpost about the [move to Next.js](https://www.duncanritchie.co.uk/blog/porting-velut-to-nextjs).

### Old architecture with Microsoft Excel

velut started life as an Excel file, in February 2016, which over the years grew to more than 90MB in size.
Much of the word information you see on the website is stored in it, but I no longer use it.
To read more about my Excel file, and how I planned and achieved the migration to an architecture without it, see my blogpost on the [de-Excellation of velut](https://www.duncanritchie.co.uk/blog/deexcellation-of-velut).

## Screenshots

Displayed below is the page for the word “opportūna”, showing that it is different to “opportūnā”, scans as long-long-long-short metrically, rhymes with words like “ūna” and “lūna”, and is a form of the lemma “opportūnus” (an adjective meaning “timely; suitable”). https://www.velut.co.uk/opportu-na.

![“opportūna” on velut](https://github.com/DuncanRitchie/velut-screenshots/blob/main/compressed/velut-web-opportuna.png)

## Environment variables

For development, there is a .env.local file in the root directory.
The file looks like this:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/velut-local?retryWrites=true&w=majority
```

(It’s not in version control in case I change the MongoDB connection string to point to the live database, which is obviously sensitive.)

To set an environment variable in production, I use the Fly command-line interface:

```bash
flyctl secrets set NEXT_PUBLIC_EXAMPLE="This is an example environment variable."
```

The `NEXT_PUBLIC` prefix enables Next.js to use an environment variable on the client side.
I don’t currently need that.

## Development cycle

The command I use to open a development server at http://localhost:3000/ is:

```bash
npm run dev
```

(There needs to be a .env.local file as explained under “Environment variables”.)

To redeploy, I simply push to the main branch on GitHub.

For how I edit the data with Json files and JavaScript scripts, see [“Architecture”](#architecture) above.

## Miscellanea

The name “velut” is an acronym for “Useful Tables of Excellent Latin Vocabulary”. Ironically, the backend dispatches queries to MongoDB collections rather than any tables in a relational database, and until recently the HTML contained no &lt;table&gt; tags.

All the lemmata have been collated manually by me in my spare time. All their forms have been generated programmatically, and reviewed manually, by me in my spare time. (Yes, really.) Therefore, many lemmata are not represented. If I’ve not included a word in velut, that doesn’t mean it’s not “good Latin”. Also true is the fact that some of the words in velut are not attested in surviving literature, but are reasonable inflected forms or are neologisms.

For more information, see https://www.velut.co.uk/about; for more information about me, see my website at https://www.duncanritchie.co.uk.

