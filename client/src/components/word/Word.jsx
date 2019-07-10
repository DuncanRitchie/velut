import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "../../axios/axios";
import Search from "../search/Search";
import lemmata from "../../data/lemmata.json";
import dictionaries from "../../data/dictionaries.json";
import Lemma from "./Lemma";
import macraToHyphens from "./macraToHyphens";
import hyphensToMacra from "./hyphensToMacra";
import toProperCase from "./toProperCase";
import noMacra from "./noMacra";
import sortAlphabetically from "./sortAlphabetically"
import WarningMessage from "./WarningMessage";
// import Navbar from "../navbar/Navbar"

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
            formsArrays: []
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
        // Let's fetch some data from MongoDB. First we search for the exact input.
        // console.log(`Looking for: ${input}`)
        axios.getWords({"Word": input})
            .then((data)=>{
                foundWord = data.data[0]
                this.setState({foundWord: foundWord})
                // If the input isn't exactly in Mongo, parse any hyphens/cola/dots.
                if (!foundWord) {
                    // console.log(`Looking for: ${hyphensToMacra(input)}`)
                    axios.getWords({"Word": hyphensToMacra(input)})
                        .then((data)=>{
                            foundWord = data.data[0]
                            this.setState({foundWord: foundWord})
                            // If the parsed input isn't in Mongo, look for it without macra.
                            if (!foundWord) {
                                // console.log(`Looking for: ${noMacra(input)}`)
                                axios.getWords({"NoMacra": noMacra(input)})
                                .then((data)=>{
                                    foundWord = data.data[0]
                                    this.setState({foundWord: foundWord})
                                    // If the demacronized input isn't in Mongo, look for it lowercased.
                                    if (!foundWord) {
                                        // console.log(`Looking for: ${noMacra(input).toLowerCase()}`)
                                        axios.getWords({"NoMacra": noMacra(input).toLowerCase()})
                                        .then((data)=>{
                                            foundWord = data.data[0]
                                            this.setState({foundWord: foundWord})
                                            // If the lowercased demacronized input isn't in Mongo, look for it propercased.
                                            if (!foundWord) {
                                                // console.log(`Looking for: ${toProperCase(noMacra(input))}`)
                                                axios.getWords({"NoMacra": toProperCase(noMacra(input))})
                                                    .then((data)=>{
                                                        foundWord = data.data[0]
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
                            }})
                }
                else {
                    this.fetchRelatedWords(foundWord)
                }})
    }

    fetchRelatedWords(wordObject) {
        // Let's find the rhymes.
        let rhymeValue = wordObject.PerfectRhyme
        // console.log("Rhymes end in "+rhymeValue)
        axios.getWords({"PerfectRhyme": rhymeValue}).then((data)=>{
            let rhymes = data.data.sort((a,b)=>{
                if (a.Sort > b.Sort) {
                    return 1
                }
                else {
                    return -1
                }
            })
            rhymes = rhymes.map((wordObject,index)=>{
                return wordObject.Word
            })
            this.setState({rhymes: rhymes})
        })
        // Let's find the anagrams.
        let anagramLetters = wordObject.AlphOrderNoMacra
        // console.log("Anagrams have the letters "+anagramLetters)
        axios.getWords({"AlphOrderNoMacra": anagramLetters}).then((data)=>{
            let anagrams = sortAlphabetically(data.data)
            anagrams = anagrams.map((anagram,index)=>{
                return anagram.Word
            })
            this.setState({anagrams: anagrams})
        })
        // Let's find the forms. An array is generated for each lemma.
        // We iniitalise state with an array of empty arrays.
        let emptyArrays = wordObject.LemmaArray.map((lemma,index)=>{
            return []
        })
        this.setState({formsArrays: emptyArrays})
        // Next we map across LemmaArray, querying the database for each lemma and adding the results 
        // to the correct element in the array in state as the results come in.
        wordObject.LemmaArray.map((lemma,i)=>{
            axios.getWords({"LemmaArray": lemma}).then((data)=>{
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
    }

    fetchRandomWord() {
        // Let's pick a random word to show if no words match the search.
        // totalCount should really be derived from Mongoose, but let's use an underestimate for the time being.
        let totalCount = 92000
        let randomOrd = Math.ceil(Math.random()*totalCount)
        axios.getWords({"Ord": randomOrd}).then((array)=>{this.setState({randomWord: array.data[0].Word})})
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
        axios.getWordsClass({"PerfectRhyme": "īca"}).then((data)=>{console.log(data.data)})
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
            wordLemmata = foundWord.LemmaArray || []
            if (wordLemmata) {
                mappedLemmata = wordLemmata.map((lemma,index)=>{
                    // Let's find the lemma in the Json.
                    let foundLemma = lemmata.find(jsonLemma=>{return jsonLemma.Lemma===lemma})
                    if (foundLemma) {
                        // Let's get the inflected forms. They are stored in an array within the formsArray in state.
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
                        // Let's get the cognates.
                        let cognates = lemmata.filter((lemmaForCognates)=>{return lemmaForCognates.Root === foundLemma.Root});
                        // If no etymology is given in the data, a message should appear in the cognates paragraph.
                        let cognatesMessage = "";
                        if (!foundLemma.Root) {
                            cognatesMessage = "I have not assigned cognates for this lemma, sorry!"
                        }
                        // This sorts the cognates alphabetically.
                        let sortedCognates = sortAlphabetically(cognates)
                        // A react-router-dom Link is rendered for every cognate.
                        let mappedCognates = sortedCognates.map((cognate,index)=>{
                            return <span key={index}><Link to={`/${macraToHyphens(cognate.Lemma).replace(/\[.*\]/g,"")}`} key={index} title={cognate.Lemma}> {cognate.Lemma}</Link> </span>
                        })
                        // Cognates are done. Let's put everything into the Lemma element.
                        return (
                            <Lemma 
                            key={index} 
                            lemma={foundLemma.Lemma} 
                            partOfSpeech={foundLemma.PartOfSpeech} 
                            meaning={foundLemma.Meaning} 
                            scansion={foundLemma.Scansion}
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
                <h1><span className="title">velut</span> &mdash; {foundWord ? foundWord.Word : sanitisedInput}</h1>
                {/* <Navbar input={sanitisedInput} currentPage="word"/> */}
                <p>Welcome to my Useful Tables of Excellent Latin Vocabulary!</p>
                <WarningMessage/>
                <Search prefix=""/>
                <div className="divider"/>
                {foundWord ? <div><p>The word <strong>{foundWord.Word}</strong> could scan as {foundWord.Scansion}</p>
                <p>Perfect rhymes: {mappedRhymes}</p>
                <p>Anagrams: {mappedAnagrams}</p>
                <div className="divider"/>
                <p><strong>{foundWord.Word}</strong> belongs to the following {wordLemmata.length} {wordLemmata.length===1 ? "lemma" : "lemmata"}:</p></div> : <p>Nothing was found. Try <Link to={"/"+macraToHyphens(randomWord)} title={randomWord}>{randomWord}</Link>.</p>}
                {mappedLemmata ? mappedLemmata : null}
                <div className="divider"/>
                <div className="divider"/>
                <p className="dictionaries">Links to external sites: {mappedDics}</p>
            </div>
        )
    }
}

export default Word