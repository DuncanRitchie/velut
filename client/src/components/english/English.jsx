import React, {Component} from "react"
import Title from "../title/Title"
import Search from "../search/Search"
import Lemma from "../word/Lemma"
import axios from '../../axios/axios'
import "../word/Word.css"

class English extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: this.props.match.params.word || "",
            lemmata: []
        }
    }

    fetchLemmata(english) {
        try {
            axios.getLemmataEnglish(english).then((data)=>{
                // data.data is an array of objects.
                this.setState({"lemmata": data.data})
            })    
        }
        catch {
            this.setState({"lemmata": []})
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
        document.title = "Latin for “" + this.state.input + "” on velut"

        let lemmata = this.state.lemmata.map((lemma, index) => {
            let mappedCognates = []
            let mappedForms = []
            let cognatesMessage = ""
            return (
                <Lemma
                key={index}
                lemma={lemma.Lemma}
                partOfSpeech={lemma.PartOfSpeech}
                meaning={lemma.Meaning}
                notes={lemma.Notes}
                transliteration={lemma.Transliteration}
                forms={mappedForms}
                cognates={mappedCognates}
                cognatesMessage={cognatesMessage}
                root={lemma.Root}
                linkBase="../"
                />
            )
        })

        return (
            <div className="english">
                <Title textBeforeTitle="English to Latin" />
                <Search prefix="english/"/>

                <p className="showing-results-for">
                    {this.state.lemmata.length 
                    ? (
                        "Showing "+this.state.lemmata.length+" lemmata with meanings containing “"+this.state.input+"”."
                      )
                    : "No results were found for “"+this.state.input+"”. Please try a different search."}
                </p>
                <div className="word-info">
                    {lemmata}
                </div>
            </div>
        )
    }
}

export default English