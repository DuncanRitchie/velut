import {Component} from "react"
import Head from 'next/head'
import Header from "../../components/header/Header"
import Search from "../../components/search/Search"
import Lemma from "../../components/lemma/Lemma"
//import axios from '../../axios/axios'
import Dictionaries from "../../components/dictionaries/Dictionaries"
import getEnglish from '../../lib/lemmata/english'
import styles from "../../css/Subsites.module.css"

class English extends Component {
    constructor(props) {
        super(props)
    }

    // fetchLemmata(english) {
    //     this.setState({"lemmata": []});
    //     try {
    //         const decoded = decodeURIComponent(english).trim();
    //         if (decoded) {
    //             axios.getLemmataEnglish(decoded).then((data)=>{
    //                 // data.data should be an array of objects.
    //                 this.setState({"lemmata": data.data || []});
    //             })   
    //         }
    //     }
    //     catch {
    //     }
    // }

    // componentDidMount() {
    //     this.fetchLemmata(this.state.input)
    // }

    // componentDidUpdate() {
    //     if (this.state.input !== this.props.match.params.word) {
    //         let input = this.props.match.params.word
    //         this.setState({input: input})
    //         this.fetchLemmata(input)
    //     }
    // }

    render() {
        let lemmata = this.props.lemmata.map((lemma, index) => {
            // let mappedCognates = []
            // let mappedForms = []
            // let cognatesMessage = ""
            return (
                <Lemma
                key={index}
                // lemma={lemma.Lemma}
                // partOfSpeech={lemma.PartOfSpeech}
                // meaning={lemma.Meanings}
                // notes={lemma.Notes}
                // transliteration={lemma.Transliterations}
                // forms={mappedForms}
                // cognates={mappedCognates}
                // cognatesMessage={cognatesMessage}
                // root={lemma.Root}
                lemma={lemma}
                linkBase="../"
                />
            )
        })

        return (<>
            <Head>
                <title>
                    English “{this.props.sanitisedInput}” to Latin on velut — a Latin rhyming dictionary
                </title>
                <meta name="Description" content={`Latin words for the English “${this.props.sanitisedInput}”`}/>
            </Head>
            <div className="english fulmar-background">
                <Header textBeforeTitle="English to Latin" />
                <Search prefix="/english/" searchWord={this.props.sanitisedInput} searchbarTitle="Type an English word" lang="en" hideDropdown={true} type="/english" />

                <p className={styles.showingResultsFor}>
                    {this.props.lemmata.length 
                    ? (
                        "Showing "+this.props.lemmata.length+" "+(this.props.lemmata.length===1 ? "lemma" : "lemmata")+" with meanings containing “"+this.props.sanitisedInput+"”."
                      )
                    : "No results were found for “"+this.props.sanitisedInput+"”. Please try a different search."}
                </p>
                <div className={styles.wordInfo}>
                    {lemmata}
                </div>

                <Dictionaries category="English-to-Latin" sanitisedInput={this.props.sanitisedInput} />
            </div>
        </>)
    }
}

export default English

export async function getServerSideProps({ params }) {
    let sanitisedInput = params.word || ""
    //// If special characters are input, we can get percent-encoding problems.
    //// Let’s correct for that.
    if (sanitisedInput.search("%")>-1) {
        sanitisedInput = decodeURIComponent(sanitisedInput)
    }

    const englishObject = await getEnglish(sanitisedInput)
    const lemmata = JSON.parse(englishObject.lemmata)

    return { props: {
        sanitisedInput,
        lemmata,
    }}
}
