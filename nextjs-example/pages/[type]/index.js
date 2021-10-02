import React, {Component, Fragment} from 'react'
//import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import findOneWord from '../api/words/word'
import dbConnect from '../../lib/dbConnect'
import getRandomWord from '../api/words/random'
import getHomographs from '../api/words/homographs'
import getRhymes from '../api/words/rhymes'
import getLemmata from '../api/lemmata'
import Word from '../../models/Word'
const axios = "jajadingdong"

import Header from "../../components/header/Header"
import Search from "../../components/search/Search"
import Dictionaries from "../../components/dictionaries/Dictionaries"
import Lemma from "../../components/lemma/Lemma"
import LatinLink from "../../components/latinlink/LatinLink"
import { hyphensToMacra, macraToHyphens } from "../api/diacritics"
//import hyphensToMacra from "../../helpers/hyphensToMacra"
import getScansionDescription from "../api/scansion"
import routes from "../../routes.json"
import styles from '../../css/Word.module.css'
import subsiteStyles from "../../css/Subsites.module.css"

class WordPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //input: "",
            //sanitisedInput: "",
            //totalWordsCount: null,
            //randomWord: "",
            //foundWord: {},
            type: this.props.type || "",
            rhymes: [],
            homographs: [],
            formsArrays: [],
            lemmata: [],
            cognatesArrays: []
        }
    }

    // fetchFoundWord() queries Mongo for variations on the input
    // until it finds a match, which it adds to state.
    fetchFoundWord(input) {
        this.setState({foundWord: this.props.foundWord})
        if (this.propsfoundWord) {
            this.fetchRelatedWords(foundWord)
        }
    }

    fetchRelatedWords(wordObject) {
        //this.fetchRhymes(wordObject)
        this.fetchHomographs(wordObject)
    }

    fetchHomographs(wordObject) {
        // Let’s find the homographs.
        let noMacraLowerCase = wordObject.NoMacra.toLowerCase()
        axios.getWordsAlph({"NoMacraLowerCase": noMacraLowerCase}).then((data)=>{
            let homographs = data.data
            homographs = homographs.map((homograph,index)=>{
                return homograph.Word
            })
            this.setState({homographs: homographs})
        })
    }

    fetchForms (wordObject) {
        // Let’s find the forms. An array is generated for each lemma.
        // We initialise state with an array of empty arrays.
        let emptyArrays = wordObject.LemmaArray.map((lemma,index)=>{
            return []
        })
        this.setState({formsArrays: emptyArrays})
        // Next we map across LemmaArray, querying the database for each lemma and adding the results 
        // to the correct element in the array in state as the results come in.
        wordObject.LemmaArray.map((lemma,i)=>{
            axios.getWordsAlph({"LemmaArray": lemma}).then((data)=>{
                let forms = data.data
                forms = forms.map((form,index)=>{
                    return form.Word
                })
                // console.log(forms)
                let formsArrays = this.state.formsArrays
                formsArrays[i] = forms
                this.setState({formsArrays: formsArrays})
            })
            return null
        })
    }

    fetchCognates(wordObject) {
        // Let’s now prepare for finding cognates. To do this we need to fetch all the lemmata.
        // We initialise state with an array of empty objects.
        let emptyLemmaArray = wordObject.LemmaArray.map((lemmma,index)=>{
            return {}
        })
        this.setState({lemmata: emptyLemmaArray})
        // And the same for cognatesArrays.
        let emptyCognateArrays = wordObject.LemmaArray.map((lemma,index)=>{
            return []
        })
        this.setState({cognatesArrays: emptyCognateArrays})
        // Next we map across LemmaArray, querying the database for each lemma and adding the results 
        // to the correct element in the array in state as the results come in.
        wordObject.LemmaArray.map((lemma,i)=>{
            axios.getOneLemma({"Lemma": lemma}).then((data)=>{
                let lemmata = this.state.lemmata
                lemmata[i] = data.data
                this.setState({lemmata: lemmata})
            }).then(()=>{
                if (this.state.lemmata[i].Root) {
                    axios.getLemmataAlph({"Root": this.state.lemmata[i].Root}).then((data)=>{
                        let cognates = data.data
                        cognates = cognates.map((cognate,index)=>{
                            return cognate.Lemma
                        })
                        // console.log(cognates)
                        let cognatesArrays = this.state.cognatesArrays
                        cognatesArrays[i] = cognates
                        this.setState({cognatesArrays: cognatesArrays})
                    })
                }
                return null
            })
            return null
        })
    }

    // fetchRandomWord() {
    //     // Let’s pick a random word to show if no words match the search.
    //     // We query MongoDB for the total words count if we don’t have it.
    //     // Then we query for a word whose Ord is less than or equal to it.
    //     if (!this.props.totalWordsCount) {
    //         axios.countWords().then((data)=>{
    //             this.setState({totalWordsCount: data.data.count})
    //             let randomOrd = Math.ceil(Math.random()*this.state.totalWordsCount)
    //             axios.getWordsAlph({"Ord": randomOrd}).then((data)=>{
    //                 if (data.data[0].Word) {
    //                     this.setState({randomWord: data.data[0].Word})
    //                 }
    //             })
    //         })
    //     }
    //     // If we’ve already found the total words count, we don’t need to query for it.
    //     // We just query for the random word.
    //     else {
    //         let randomOrd = Math.ceil(Math.random()*this.state.totalWordsCount)
    //         axios.getWordsAlph({"Ord": randomOrd}).then((array)=>{
    //             this.setState({randomWord: array.data[0].Word})
    //         })
    //     }

    // }

    getInput() {
        // The word searched for comes from the routing.
        let input = this.props.search
        this.setState({input: input})
        document.title = input+" on velut — a Latin rhyming dictionary"
        this.fetchFoundWord(input)
    }

    componentDidMount() {
        if (!this.state.input) {
            this.getInput()
        }
        //this.fetchRandomWord()
    }

    // componentDidUpdate(prevProps) {
    //     const type = this.props.type
    //     if (this.state.input !== this.props.search) {
    //         this.getInput()
    //         if (!this.state.foundWord) {
    //             this.fetchRandomWord()
    //         }
    //     }
    //     else if (prevProps.match.params.type !== type) {
    //         this.setState({type: type})
    //         if (this.state.foundWord) {
    //             this.fetchRhymes(this.state.foundWord)
    //         }
    //     }
    // }

    render() {
        let {sanitisedInput, randomWord, foundWord, homographs} = this.props
        let footName = ""
        let footNameArticle = "a"
        let mappedRhymes = []
        let mappedHomographs = []
        let wordLemmata = []
        let mappedLemmata = []
        // All Links to other velut words will begin with linkBase.
        const linkBase
            = this.props.type === ""
            ? "/"
            : "/" + this.props.type + "/"
        console.log(linkBase)

        if (foundWord) {
            const currentWordHyphenated = foundWord.Word && macraToHyphens(foundWord.Word);

            // Let’s find what metrical foot it is.
            if (foundWord.Scansion) {
                footName = getScansionDescription(foundWord.Scansion)
                if (footName) {
                    if (footName.substr(0,1)==="a" || 
                        footName.substr(0,1)==="e" || 
                        footName.substr(0,1)==="i" || 
                        footName.substr(0,1)==="o" || 
                        footName.substr(0,1)==="u") {
                            footNameArticle = "an"
                        }
                }
            }
            // Let’s find the rhymes.
            if (this.props.rhymes) {
                // A react-router-dom Link is rendered for every rhyme.
                mappedRhymes = this.props.rhymes.map((rhyme,index)=>{return (
                    <Fragment key={index}><LatinLink linkBase={linkBase} targetWord={rhyme} currentWordHyphenated={currentWordHyphenated}/> </Fragment>
                )})
            }
            // Let’s find the homographs.
            if (homographs) {
                // A Next.js Link is rendered for every homograph.
                mappedHomographs = homographs.map((homograph,index)=>{return homograph!==foundWord.Word && (
                    <Fragment key={index}> <LatinLink linkBase={linkBase} targetWord={homograph} currentWordHyphenated={currentWordHyphenated}/></Fragment>
                )})
            }
            // Let’s do the lemmata. We will render an element for every lemma listed against the input.
            wordLemmata = this.props.lemmata || []
            if (wordLemmata) {
                mappedLemmata = wordLemmata.map((lemma,index)=>{
                    if (lemma) {
                        return (
                            <Lemma
                            key={index}
                            lemma={lemma}
                            linkBase={linkBase}
                            currentWordHyphenated={currentWordHyphenated}
                            />
                        )
                    }
                    else {
                        return null
                    }
                }) 
            }

        }
        return (<>
            <Head>
                <title>
                    {/* If no word was found, the document title needs to come from the input. */}
                    {foundWord
                        ? `“${foundWord.Word}” on velut — a Latin rhyming dictionary`
                        : `“${sanitisedInput}” (word not found) on velut — a Latin rhyming dictionary`}
                </title>
            </Head>
            <div className={styles.word + " fulmar-background"}>
                <Header />
                <Search prefix="" searchbarTitle="Type a Latin word" searchWord={this.props.sanitisedInput}/>
                <p className={subsiteStyles.showingResultsFor + " page-width"}>
                    Showing results for
                    <br/>
                    <strong className={styles.foundWord + " page-width"} lang="la">
                        {foundWord ? foundWord.Word : hyphensToMacra(sanitisedInput)}
                    </strong>
                </p>
                <div className={subsiteStyles.wordInfo}>
                    {foundWord ? (
                        <div>
                            {mappedHomographs.length>1
                                ? ( <p>
                                    (Other homographs:{mappedHomographs})
                                    </p> ) 
                                : null}
                            <p>
                                The word <strong lang="la">{foundWord.Word}</strong> could scan as <span className={styles.scansion}>{foundWord.Scansion}</span>
                                {footName ? <> which&nbsp;is&nbsp;called {footNameArticle} {footName}.</> : null }
                            </p>
                            <h2>
                                {this.props.headingToDisplay}
                            </h2>
                            <p>
                                {mappedRhymes}
                            </p>
                            <h2>
                                Lemma information
                            </h2>
                            <p>
                                <strong lang="la">{foundWord.Word}</strong> belongs to the following {wordLemmata.length} {wordLemmata.length===1 ? "lemma" : "lemmata"}:
                            </p>
                            {mappedLemmata ? mappedLemmata : null}
                        </div>
                    )
                    : (
                        <>
                            <p>
                                Nothing was found. Try <Link href={linkBase+macraToHyphens(randomWord)}><a title={randomWord} lang="la">{randomWord}</a></Link>.
                            </p>
                            <p>
                                Or do you want to search from <Link href={"/english/"+sanitisedInput}><a title={"Search for Latin words with the English meaning “"+sanitisedInput+"”"}>English to Latin</a></Link>?
                            </p>
                        </>
                    )}
                </div>
                <Dictionaries category="Latin" sanitisedInput={sanitisedInput} />
            </div>
        </>)
    }
}

export default WordPage




// const WordPageExample = ({ word, search }) => {
//   // const router = useRouter()
//   // const [message, setMessage] = useState('')
//   // const handleDelete = async () => {
//   //   const wordID = router.query.id

//   //   try {
//   //     await fetch(`/api/words/${wordID}`, {
//   //       method: 'Delete',
//   //     })
//   //     router.push('/')
//   //   } catch (error) {
//   //     setMessage('Failed to delete the word.')
//   //   }
//   // }

//     if (word) {
//         return (
//             <div>
//                 <div className="card">
//                     <h2 className="word-name">{word.Word}</h2>
//                     <p>It’s in the dictionary!</p>
//                 </div>
//             </div>
//         )
//     }
//     else {
//         return (
//             <div className="card">
//                 <h2>Not found</h2>
//                 <p>Word “{search}” is not in the dictionary!</p>
//             </div>
//         )
//     }
// }



export async function getServerSideProps({ params }) {
    await dbConnect()
    console.log({params})

    //// The URL is /:type/:word
    //// So for /anagrams/avis the type is "anagrams" & word is "avis"
    //// For a URL like /fu-lma-rus
    //// the type according to Next.js is "fu-lma-rus" and there is no :word.
    //// But "fu-lma-rus" should be treated as the word, not the type.
    //// So we get the type and the word from the URL, but if there’s no :word
    //// we use the :type as the word and the empty string as the type.
    const wordParam = params.hasOwnProperty("word") ? params.word : params.type ?? ""
    const type = params.hasOwnProperty("word") ? params.type : ""
    let sanitisedInput = wordParam
    console.log({sanitisedInput, type})
    //// If special characters are input, we can get percent-encoding problems.
    //// Let’s correct for that.
    if (sanitisedInput.search("%")>-1) {
        sanitisedInput = decodeURIComponent(sanitisedInput)
    }

    //// Fetch the word object from the database.
    const word = await findOneWord(sanitisedInput)
    console.log({word})

    if (word.word) {
        const wordAsObject = word.word.toObject()
        console.log({wordAsObject})

        const homographsObject = await getHomographs(wordAsObject)
        const {homographs} = homographsObject
        console.log({homographs})

        const rhymesObject = await getRhymes(wordAsObject, type)
        const {rhymes, headingToDisplay} = rhymesObject
        console.log({rhymes})

        const lemmataObject = await getLemmata(wordAsObject)
        console.log(lemmataObject)
        const lemmata = JSON.parse(lemmataObject.lemmata)
        console.log({lemmata})
    
        return { props: {
            foundWord: wordAsObject,
            homographs,
            lemmata: lemmata || [],
            rhymes,
            search: wordParam,
            headingToDisplay,
            sanitisedInput,
            type,
        } }

    }
    //// If the word was not found, we find a random word and suggest it.
    else {
        const randomWordObject = await getRandomWord()
        console.log({randomWordObject})
        const randomWord = randomWordObject.word
        console.log({randomWord})
        return { props: {
            randomWord,
            sanitisedInput,
            type,
        } }
    }
}

// export default WordPageExample
