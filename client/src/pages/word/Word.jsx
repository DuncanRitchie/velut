import React, {Component} from 'react'
import {Link} from "react-router-dom"
import axios from "../../axios/axios"
import Title from "../../components/title/Title"
import Search from "../../components/search/Search"
import Dictionaries from "../../components/dictionaries/Dictionaries"
import feet from "../../data/feet.json"
import Lemma from "../../components/lemma/Lemma"
import LatinLink from "../../components/latinlink/LatinLink"
import macraToHyphens from "../../helpers/macraToHyphens"
import hyphensToMacra from "../../helpers/hyphensToMacra"
import noMacra from "../../helpers/noMacra"
import routes from "../../routes.json"
import './Word.css'
import '../Subsites.css'

class Word extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            sanitisedInput: "",
            totalWordsCount: null,
            randomWord: "",
            foundWord: {},
            type: this.props.match.params.type || "",
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
        let foundWord = {}
        // If special characters are input, we can get percent-encoding problems.
        // Let’s correct for that.
        if (input.search("%")>-1) {
            input = decodeURIComponent(input)
        }
        this.setState({sanitisedInput: input})
        // Let’s fetch some data from MongoDB. First we search for the input, parsing any hyphens/cola/dots.
        axios.getOneWord({"Word": hyphensToMacra(input)})
            .then((data)=>{
                foundWord = data.data
                this.setState({foundWord: foundWord})
                // If the parsed input isn’t in Mongo, look for it without macra.
                if (!foundWord) {
                    axios.getOneWord({"NoMacra": noMacra(input)})
                    .then((data)=>{
                        foundWord = data.data
                        this.setState({foundWord: foundWord})
                        // If the demacronized input isn’t in Mongo, look for it lowercased.
                        if (!foundWord) {
                            axios.getOneWord({"NoMacraLowerCase": noMacra(input).toLowerCase()})
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

    fetchRelatedWords(wordObject) {
        this.fetchRhymes(wordObject)
        this.fetchHomographs(wordObject)
    }

    fetchRhymes(wordObject) {
        // Let’s find the rhymes.
        // We will be using the following three values if route-specific values are not found in routes.json.
        let searchField = "PerfectRhyme" // This is the MongoDB fieldname.
        let axiosFuncName = "getWordsClass" // This is one of "getWordsAlph", "getWordsClass", "getWordsEccles" depending on the sort wanted.
        let searchFieldFull = "Perfect rhymes (classical)" // This will be rendered onscreen as a heading.
        // The route determines which type of rhyme will be wanted.
        // routes is routes.json, which matches routes to searchField, axiosFuncName, and searchFieldFull.
        // Let’s retrieve the values we want.
        const routeObject = routes.find(route=>{return ("/"+this.props.match.params.type === route.route)})
        if (routeObject) {
            searchField = routeObject.searchField
            axiosFuncName = routeObject.axiosFuncName
            searchFieldFull = routeObject.searchFieldFull
        }
        let query = {[searchField]: wordObject[searchField]}
        axios[axiosFuncName](query).then((data)=>{
            let rhymes = data.data.map((wordObject,index)=>{
                return wordObject.Word
            })
            this.setState({rhymes: rhymes, searchFieldFull: searchFieldFull})
        })
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

    fetchRandomWord() {
        // Let’s pick a random word to show if no words match the search.
        // We query MongoDB for the total words count if we don’t have it.
        // Then we query for a word whose Ord is less than or equal to it.
        if (!this.state.totalWordsCount) {
            axios.countWords().then((data)=>{
                this.setState({totalWordsCount: data.data.count})
                let randomOrd = Math.ceil(Math.random()*this.state.totalWordsCount)
                axios.getWordsAlph({"Ord": randomOrd}).then((data)=>{
                    if (data.data[0].Word) {
                        this.setState({randomWord: data.data[0].Word})
                    }
                })
            })
        }
        // If we’ve already found the total words count, we don’t need to query for it.
        // We just query for the random word.
        else {
            let randomOrd = Math.ceil(Math.random()*this.state.totalWordsCount)
            axios.getWordsAlph({"Ord": randomOrd}).then((array)=>{
                this.setState({randomWord: array.data[0].Word})
            })
        }

    }

    getInput() {
        // The word searched for comes from the routing.
        let input = this.props.match.params.word
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

    componentDidUpdate(prevProps) {
        const type = this.props.match.params.type
        if (this.state.input !== this.props.match.params.word) {
            this.getInput()
            if (!this.state.foundWord) {
                this.fetchRandomWord()
            }
        }
        else if (prevProps.match.params.type !== type) {
            this.setState({type: type})
            if (this.state.foundWord) {
                this.fetchRhymes(this.state.foundWord)
            }
        }
    }

    render() {
        let {sanitisedInput, randomWord, foundWord} = this.state
        let footName = ""
        let footNameArticle = "a"
        let mappedRhymes = []
        let mappedHomographs = []
        let wordLemmata = []
        let mappedLemmata = []
        // All Links to other velut words will begin with linkBase.
        const linkBase = this.props.match.path.replace(":word","").replace(":type",this.props.match.params.type) || ""
        if (!foundWord) {
            // If no word was found, the document title needs to come from the input.
            document.title = "“" + sanitisedInput + "” (word not found) on velut"
        }
        if (foundWord) {
            const currentWordHyphenated = foundWord.Word && macraToHyphens(foundWord.Word);
            // Let’s set the document title to the word we found.
            document.title = "“" + foundWord.Word + "” on velut"
            // Let’s find what metrical foot it is.
            if (foundWord.Scansion) {
                let foot = feet.find((foot)=>{return foot.Foot===foundWord.Scansion})
                if (foot) {
                    footName = foot.Name.replace(/,/g, " or")
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
            if (this.state.rhymes) {
                // A react-router-dom Link is rendered for every rhyme.
                mappedRhymes = this.state.rhymes.map((rhyme,index)=>{return (
                    <span key={index}><LatinLink linkBase={linkBase} targetWord={rhyme} currentWordHyphenated={currentWordHyphenated}/> </span>
                )})
            }
            // Let’s find the homographs.
            if (this.state.homographs) {
                // A react-router-dom Link is rendered for every homograph.
                mappedHomographs = this.state.homographs.map((homograph,index)=>{return homograph!==foundWord.Word && (
                    <span key={index}> <LatinLink linkBase={linkBase} targetWord={homograph} currentWordHyphenated={currentWordHyphenated}/></span>
                )})
            }
            // Let’s do the lemmata. We will render an element for every lemma listed against the input.
            wordLemmata = this.state.foundWord.LemmaArray || []
            if (wordLemmata) {
                mappedLemmata = wordLemmata.map((lemma,index)=>{
                    if (lemma) {
                        return (
                            <Lemma
                            key={index}
                            lemma={lemma.Lemma || lemma}
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
        return (
            <div className="word fulmar-background">
                <Title />
                <Search prefix="" searchbarTitle="Type a Latin word" />
                <p className="showing-results-for">
                    Showing results for
                </p>
                <h2 className="found-word" lang="la">
                    {foundWord ? foundWord.Word : hyphensToMacra(sanitisedInput)}
                </h2>
                <div className="word-info">
                    {foundWord ? (
                        <div>
                            {mappedHomographs.length>1
                                ? ( <p>
                                    (Other homographs:{mappedHomographs})
                                    </p> ) 
                                : null}
                            <p>
                                The word <strong lang="la">{foundWord.Word}</strong> could scan as <span className="scansion">{foundWord.Scansion}</span>
                                {footName ? <> which&nbsp;is&nbsp;called {footNameArticle} {footName}.</> : null }
                            </p>
                            <h2>
                                {this.state.searchFieldFull}
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
                        <>
                            <p>
                                Nothing was found. Try <Link to={linkBase+macraToHyphens(randomWord)} title={randomWord} lang="la">{randomWord}</Link>.
                            </p>
                            <p>
                                Or do you want to search from <Link to={"/english/"+sanitisedInput} title={"Search for Latin words with the English meaning “"+sanitisedInput+"”"}>English to Latin</Link>?
                            </p>
                        </>
                    )}
                {mappedLemmata ? mappedLemmata : null}
                </div>
                <Dictionaries category="Latin" sanitisedInput={sanitisedInput} />
            </div>
        )
    }
}

export default Word