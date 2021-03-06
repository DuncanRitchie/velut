import React, {Component, Fragment} from 'react'
import superscriptLemmaTag from './superscriptLemmaTag'
import greece from '../../images/greece.png'
import israel from '../../images/israel.png'
import axios from '../../axios/axios'
import LatinLink from '../latinlink/LatinLink'

class Lemma extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partOfSpeech: "",
            meanings: "",
            notes: "",
            transliterations: "",
            root: "",
            forms: [],
            cognates: []
        }
    }

    getLemmaData() {
        try {
            axios.getOneLemma({"Lemma": this.props.lemma}).then(data=>{
                this.setState({
                    partOfSpeech: data.data.PartOfSpeech,
                    meanings: data.data.Meanings,
                    notes: data.data.Notes,
                    transliterations: data.data.Transliterations,
                    root: data.data.Root
                })
            }).then(()=>{
                this.getCognates(this.state.root)
                this.getForms(this.props.lemma)
            })
        }
        catch {
        }
    }

    getForms(lemma) {
        try {
            axios.getWordsAlph({"LemmaArray": lemma})
            .then((data)=>{
                let forms = data.data
                forms = forms.map((form)=>{
                    return form.Word
                })
                this.setState({"forms": forms})
            })
        }
        catch {
        }
    }

    getCognates(root) {
        if (root) {
            try {
                axios.getLemmataAlph({"Root": root}).then((data)=>{
                    let cognates = data.data
                    cognates = cognates.map((cognate)=>{
                        return cognate.Lemma
                    })
                    this.setState({"cognates": cognates})
                })
            }
            catch {
                this.setState({"cognates": []})
            }
        }
    }

    componentDidMount() {
        this.getLemmaData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.lemma !== prevProps.lemma) {
            this.getLemmaData()
        }
    }

    render() {
        // If there are transliterations in Ancient Greek, they will appear next to a Greek flag
        // and be labelled as lang="grc". Ditto for Hebrew with the Israeli flag and lang="he".
        // All the transliterations for the lemma come into props as a single string to be processed here.
        let mappedTransliterations
        if (this.state.transliterations) {
            // props.transliteration could look like "Ἰησοῦς/יֵשׁוּעַ"
            let transliterationsArray = this.state.transliterations.split("/")
            mappedTransliterations = transliterationsArray.map((word,i)=>{
                let alt = "Hebrew"
                let lang = "he"
                // We would be using emoji, but Windows won’t display national flag emoji.
                // let emoji = "🇮🇱"
                let flag = israel
                if ("αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ".includes(word.substr(-1).toLowerCase())
                 || "αβγδεζηθικλμνξοπρςτυφχψωἀάᾶήίὖώῶ".includes(word.substr(-2,1).toLowerCase())
                ) {
                    alt = "Ancient Greek"
                    lang = "grc"
                    // emoji = "🇬🇷"
                    flag = greece
                }
                return <span key={i} lang={lang}><img className="inline-flag" src={flag} alt={alt}/>&nbsp;{word} </span>
            })
        }

        let {linkBase, lemma, currentWordHyphenated} = this.props
        let {partOfSpeech, meanings, notes, root, forms, cognates} = this.state

        // Create JSX for the forms.
        let mappedForms = forms.map((form,index)=>{
            return <Fragment key={index}><LatinLink linkBase={linkBase} targetWord={form} currentWordHyphenated={currentWordHyphenated}/> </Fragment>
        })

        // Create JSX for the cognates.
        let mappedCognates = cognates.map((cognate,index)=>{
            return (
                <Fragment key={index}>
                    <LatinLink linkBase={linkBase} targetWord={cognate} currentWordHyphenated={currentWordHyphenated} isLemma={true}/>{" "}
                </Fragment>
            )
        })

        return (
            <div className="lemma">
                {/* superscriptLemmaTag() replaces anything in square brackets with a superscript. */}
                <h3 lang="la">{superscriptLemmaTag(lemma)}</h3>
                {partOfSpeech
                    ? <p>Part of speech: {partOfSpeech.toLowerCase()}</p>
                    : null}
                {meanings
                    ? <p>Meanings: {meanings}</p>
                    : null}
                {notes
                    ? <p>Notes: {notes}</p>
                    : null}
                {mappedTransliterations
                    ? <p>Transliterations: {mappedTransliterations}</p>
                    : null}
                {mappedForms
                    ? <p>{mappedForms[0] ? <>Forms: {mappedForms}</> : "Loading forms…"}</p>
                    : null}
                <p>
                    {root
                        ? (mappedCognates[0] ? <>Cognates: {mappedCognates}</> : "Loading cognates…")
                        : "I have not assigned cognates for this lemma, sorry!"}
                </p>
            </div>
        )
    }
}

export default Lemma