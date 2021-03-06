import React, {Component} from "react"
import Title from "../../components/title/Title"
import Search from "../../components/search/Search"
import Lemma from "../../components/lemma/Lemma"
import axios from '../../axios/axios'
import Dictionaries from "../../components/dictionaries/Dictionaries"
import "../Subsites.css"

class English extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: this.props.match.params.word || "",
            lemmata: []
        }
    }

    fetchLemmata(english) {
        this.setState({"lemmata": []});
        try {
            const decoded = decodeURIComponent(english).trim();
            if (decoded) {
                axios.getLemmataEnglish(decoded).then((data)=>{
                    // data.data should be an array of objects.
                    this.setState({"lemmata": data.data || []});
                })   
            }
        }
        catch {
        }
    }

    componentDidMount() {
        this.fetchLemmata(this.state.input)
    }

    componentDidUpdate() {
        if (this.state.input !== this.props.match.params.word) {
            let input = this.props.match.params.word
            this.setState({input: input})
            this.fetchLemmata(input)
        }
    }

    render() {
        document.title = "English “" + this.state.input + "” to Latin on velut"

        let lemmata = this.state.lemmata.map((lemma, index) => {
            let mappedCognates = []
            let mappedForms = []
            let cognatesMessage = ""
            return (
                <Lemma
                key={index}
                lemma={lemma.Lemma}
                partOfSpeech={lemma.PartOfSpeech}
                meaning={lemma.Meanings}
                notes={lemma.Notes}
                transliteration={lemma.Transliterations}
                forms={mappedForms}
                cognates={mappedCognates}
                cognatesMessage={cognatesMessage}
                root={lemma.Root}
                linkBase="../"
                />
            )
        })

        return (
            <div className="english fulmar-background">
                <Title textBeforeTitle="English to Latin" />
                <Search prefix="english/" searchbarTitle="Type an English word"/>

                <p className="showing-results-for">
                    {this.state.lemmata.length 
                    ? (
                        "Showing "+this.state.lemmata.length+" "+(this.state.lemmata.length===1 ? "lemma" : "lemmata")+" with meanings containing “"+this.state.input+"”."
                      )
                    : "No results were found for “"+this.state.input+"”. Please try a different search."}
                </p>
                <div className="word-info">
                    {lemmata}
                </div>

                <Dictionaries category="English-to-Latin" sanitisedInput={this.state.input} />
            </div>
        )
    }
}

export default English