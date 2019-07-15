import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "../../axios/axios";
import Title from "../title/Title";
import Search from "../search/Search";
import dictionaries from "../../data/dictionaries.json";
import Lemma from "./Lemma";
import macraToHyphens from "./macraToHyphens";
import hyphensToMacra from "./hyphensToMacra";
import toProperCase from "./toProperCase";
import noMacra from "./noMacra";
import sortAlphabetically from "./sortAlphabetically"
// import Navbar from "../navbar/Navbar"
import './Word.css'

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            sanitisedInput: "",
            randomWord: "",
            foundWord: {},
            rhymes: [],
            anagrams: [],
            formsArrays: [],
            lemmata: [],
            cognatesArrays: []
        }
    }
    
    // fetchFoundWord() queries Mongo for variations on the input
    // until it finds a match, which it adds to state.
    fetchFoundWord(input) {
        let foundWord = {}
        // If special characters are input, we can get percent-encoding problems.
        // Let's correct for that.
        if (input.search("%")>-1) {
            input = decodeURIComponent(input)
        }
        this.setState({sanitisedInput: input})
        // Let's fetch some data from MongoDB. First we search for the input, parsing any hyphens/cola/dots.
        // console.log(`Looking for: Word = ${hyphensToMacra(input)}`)
        axios.getOneWord({"Word": hyphensToMacra(input)})
            .then((data)=>{
                foundWord = data.data
                this.setState({foundWord: foundWord})
                // If the parsed input isn't in Mongo, look for it without macra.
                if (!foundWord) {
                    // console.log(`Looking for: NoMacra = ${noMacra(input)}`)
                    axios.getOneWord({"NoMacra": noMacra(input)})
                    .then((data)=>{
                        foundWord = data.data
                        this.setState({foundWord: foundWord})
                        // If the demacronized input isn't in Mongo, look for it lowercased.
                        if (!foundWord) {
                            // console.log(`Looking for: NoMacra = ${noMacra(input).toLowerCase()}`)
                            axios.getOneWord({"NoMacra": noMacra(input).toLowerCase()})
                            .then((data)=>{
                                foundWord = data.data
                                this.setState({foundWord: foundWord})
                                // If the lowercased demacronized input isn't in Mongo, look for it propercased.
                                if (!foundWord) {
                                    // console.log(`Looking for: NoMacra = ${toProperCase(noMacra(input))}`)
                                    axios.getOneWord({"NoMacra": toProperCase(noMacra(input))})
                                        .then((data)=>{
                                            foundWord = data.data
                                            this.setState({foundWord: foundWord})
                                            if (foundWord) {
                                                this.fetchRelatedWords(foundWord)
                                            }
                                        })
                                }
                                else {
                                    this.fetchRelatedWords(foundWord)
                                }
                            })
                        }
                        else {
                            this.fetchRelatedWords(foundWord)
                        }
                    })
                }
            else {
                this.fetchRelatedWords(foundWord)
            }
        })
    }

    fetchRelatedWords(wordObject) {
        // Let's find the rhymes.
        let rhymeValue = wordObject.PerfectRhyme
        // console.log("Rhymes end in "+rhymeValue)
        axios.getWordsClass({"PerfectRhyme": rhymeValue}).then((data)=>{
            let rhymes = data.data.map((wordObject,index)=>{
                return wordObject.Word
            })
            this.setState({rhymes: rhymes})
        })
        // Let's find the anagrams.
        let anagramLetters = wordObject.AlphOrderNoMacra
        // console.log("Anagrams have the letters "+anagramLetters)
        axios.getWordsAlph({"AlphOrderNoMacra": anagramLetters}).then((data)=>{
            let anagrams = sortAlphabetically(data.data)
            anagrams = anagrams.map((anagram,index)=>{
                return anagram.Word
            })
            this.setState({anagrams: anagrams})
        })
        // Let's find the forms. An array is generated for each lemma.
        // We initialise state with an array of empty arrays.
        let emptyArrays = wordObject.LemmaArray.map((lemma,index)=>{
            return []
        })
        this.setState({formsArrays: emptyArrays})
        // Next we map across LemmaArray, querying the database for each lemma and adding the results 
        // to the correct element in the array in state as the results come in.
        wordObject.LemmaArray.map((lemma,i)=>{
            axios.getWordsAlph({"LemmaArray": lemma}).then((data)=>{
                let forms = sortAlphabetically(data.data)
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
        // Let's now prepare for finding cognates. To do this we need to fetch all the lemmata.
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
                        let cognates = sortAlphabetically(data.data)
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

    fetchRandomWord() {
        // Let's pick a random word to show if no words match the search.
        // totalCount should really be derived from Mongoose, but let's use an underestimate for the time being.
        let totalCount = 92000
        let randomOrd = Math.ceil(Math.random()*totalCount)
        axios.getWordsAlph({"Ord": randomOrd}).then((array)=>{this.setState({randomWord: array.data[0].Word})})
    }

    getInput() {
        // The word searched for comes from the window location.
        let input = window.location.pathname.replace("/word","").replace("/","");
        this.setState({input: input})
        document.title = input+" on velut"
        this.fetchFoundWord(input)
    }
  
    componentDidMount() {
        if (!this.state.input) {
            this.getInput()
        }
        this.fetchRandomWord()
    }

    componentDidUpdate() {
        if (this.state.input !== window.location.pathname.replace("/word","").replace("/","")) {
            this.getInput()
            if (!this.state.foundWord) {
                this.fetchRandomWord()
            }
        }
    }

    render() {
        let {sanitisedInput, randomWord, foundWord} = this.state
        let mappedRhymes = [];
        let mappedAnagrams = [];
        let wordLemmata = [];
        let mappedLemmata = [];
        // Let's do dictionaries.
        let plainInput = noMacra(sanitisedInput)
        let mappedDics = dictionaries.map((dic,index)=>{
            return <span key={index}><a href={dic.Formula.replace("INPUT",plainInput)} title={"Search "+dic.Dictionary+" for "+plainInput}>{dic.Dictionary}</a>{index===dictionaries.length-1 ? "" : ","} </span>
        })
        if (!foundWord) {
            // If no word was found, the document title needs to come from the input.
            document.title = sanitisedInput+" (word not found) on velut"
        }
        if (foundWord) {
            // Let's set the document title to the word we found.
            document.title = foundWord.Word+" on velut"
            // Let's find the rhymes.
            if (this.state.rhymes) {
                // A react-router-dom Link is rendered for every rhyme.
                mappedRhymes = this.state.rhymes.map((rhyme,index)=>{return (
                    <span key={index}><Link to={"/"+macraToHyphens(rhyme)} title={rhyme}>{rhyme}</Link> </span>
                )})
            }
            // Let's find the anagrams.
            if (this.state.anagrams) {
                // A react-router-dom Link is rendered for every anagram.
                mappedAnagrams = this.state.anagrams.map((anagram,index)=>{return (
                    <span key={index}><Link to={"/"+macraToHyphens(anagram)} title={anagram}>{anagram}</Link> </span>
                )})
            }
            // Let's do the lemmata. We will render an element for every lemma listed against the input.
            wordLemmata = this.state.lemmata || []
            if (wordLemmata) {
                mappedLemmata = wordLemmata.map((lemma,index)=>{
                    if (lemma) {
                        // Let's do the inflected forms. They are stored in an array within the formsArray in state.
                        let mappedForms = []
                        if (this.state.formsArrays) {
                            let forms = []
                            if (this.state.formsArrays[index]) {
                                forms = this.state.formsArrays[index]
                            }
                            // Let's render a Link for every form.
                            mappedForms = forms.map((form,index)=>{
                                return <span key={index}><Link title={form} to={"/"+macraToHyphens(form)}>{form}</Link> </span>
                            })
                        }
                        // Let's do the cognates. They are stored in an array within the cognatesArray in state.
                        let mappedCognates = []
                        if (this.state.cognatesArrays) {
                            let cognates = []
                            if (this.state.cognatesArrays[index]) {
                                cognates = this.state.cognatesArrays[index]
                            }
                            // Let's render a Link for every cognate.
                            mappedCognates = cognates.map((cognate,index)=>{
                                return <span key={index}><Link title={cognate} to={"/"+macraToHyphens(cognate).replace(/\[.*\]/g,"")}>{cognate}</Link> </span>
                            })
                        }
                        // If no etymology is given in the data, a message should appear in the cognates paragraph.
                        let cognatesMessage = "";
                        if (!lemma.Root) {
                            cognatesMessage = "I have not assigned cognates for this lemma, sorry!"
                        }
                        // Cognates are done. Let's put everything into the Lemma element.
                        return (
                            <Lemma 
                            key={index} 
                            lemma={lemma.Lemma} 
                            partOfSpeech={lemma.PartOfSpeech} 
                            meaning={lemma.Meaning} 
                            forms={mappedForms}
                            cognates={mappedCognates}
                            cognatesMessage={cognatesMessage}
                            /> 
                        )
                    }
                    else {
                        return null
                    }
                }) 
            }
            
        }
        return (
            <div className="word">
                <Title />
                {/* <Navbar input={sanitisedInput} currentPage="word"/> */}
                <Search prefix=""/>
                <p className="showing-results-for">
                    Showing results for
                </p>
                <h2 className="found-word">
                    {foundWord ? foundWord.Word : sanitisedInput}
                </h2>
                <div className="word-info">
                    {foundWord ? (
                        <div>
                            <p>
                                The word <strong>{foundWord.Word}</strong> could scan as {foundWord.Scansion}
                            </p>
                            <h2>
                                Anagrams
                            </h2>
                            <p>
                                {mappedAnagrams}
                            </p>
                            <h2>
                                Perfect rhymes
                            </h2>
                            <p>
                                {mappedRhymes}
                            </p>
                            <h2>
                                Lemma information
                            </h2>
                            <p>
                                <strong>{foundWord.Word}</strong> belongs to the following {wordLemmata.length} {wordLemmata.length===1 ? "lemma" : "lemmata"}:
                            </p>
                        </div>
                    )
                    : (
                        <p>
                            Nothing was found. Try <Link to={"/"+macraToHyphens(randomWord)} title={randomWord}>{randomWord}</Link>.
                        </p>
                    )}
                {mappedLemmata ? mappedLemmata : null}
                </div>
                <h2 className="dictionaries-heading">
                    Links to external sites
                </h2>
                <p className="dictionaries">
                    {mappedDics}
                </p>
            </div>
        )
    }
}

export default Word