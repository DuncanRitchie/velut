import {Component} from "react"
import Head from 'next/head'
import Header from "../../components/header/Header"
import Search from "../../components/search/Search"
import Lemma from "../../components/lemma/Lemma"
import Dictionaries from "../../components/dictionaries/Dictionaries"
import getEnglish from '../../lib/lemmata/english'
import styles from "../../css/Subsites.module.css"

class English extends Component {
    render() {
        let lemmata = this.props.lemmata.map((lemma, index) => {
            return <Lemma key={index} lemma={lemma} linkBase="../" />
        })

        return (<>
            <Head>
                <title>
                    English “{this.props.sanitisedInput}” to Latin on velut — a Latin rhyming dictionary
                </title>
                <meta name="Description" content={`Latin words for the English “${this.props.sanitisedInput}”`}/>
            </Head>
            <div className="fulmar-background">
                <Header textBeforeTitle="English to Latin" />
                <Search type="/english" searchWord={this.props.sanitisedInput} searchbarTitle="Type an English word" lang="en" hideDropdown={true} />

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

export async function getServerSideProps({ params, res }) {
    let sanitisedInput = params.word || ""
    //// If special characters are input, we can get percent-encoding problems.
    //// Let’s correct for that.
    if (sanitisedInput.search("%")>-1) {
        sanitisedInput = decodeURIComponent(sanitisedInput)
    }

    const englishObject = await getEnglish(sanitisedInput)
    const lemmata = englishObject.success
        ? JSON.parse(englishObject.lemmata)
        : []

    if (!englishObject.success) {
        res.statusCode = 404
    }

    return { props: {
        sanitisedInput,
        lemmata,
    }}
}
