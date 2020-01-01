import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import superscriptLemmaTag from './superscriptLemmaTag'
import greece from '../../images/greece.png'
import israel from '../../images/israel.png'
import axios from '../../axios/axios'
import macraToHyphens from '../word/macraToHyphens'

class Lemma extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forms: [],
            cognates: []
        }
    }

    getLemmaData(lemma) {
        try {
            axios.getOneLemma({"Lemma":lemma}).then(data=>{
                this.setState({
                    partOfSpeech: data.data.PartOfSpeech,
                    meaning: data.data.Meaning,
                    notes: data.data.Notes,
                    root: data.data.Root
                })
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
            this.setState({"forms": ["Forms not found"]})
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
        else {
            this.setState({"cognates": []})
        }
    }

    refreshAll() {
        this.getForms(this.props.lemma)
        // this.getCognates(this.props.root)
        this.getLemmaData(this.props.lemma)
    }

    componentDidMount() {
        this.refreshAll()
    }

    componentDidUpdate(prevProps) {
        if (this.props.lemma !== prevProps.lemma) {
            this.refreshAll()
        }
    }

    render() {
        // If there are transliterations in Ancient Greek, they will appear next to a Greek flag
        // and be labelled as lang="grc". Ditto for Hebrew with the Israeli flag and lang="he".
        // All the transliterations for the lemma come into props as a single string to be processed here.
        let transliterations
        if (this.props.transliteration) {
            // props.transliteration could look like "Ἰησοῦς/יֵשׁוּעַ"
            let transliterationsArray = this.props.transliteration.split("/")
            transliterations = transliterationsArray.map((word,i)=>{
                let lang = "Hebrew"
                let langCode = "he"
                // We would be using emoji, but Windows won't display national flag emoji.
                // let emoji = "🇮🇱"
                let flagSrc = israel
                if("αβγδεζηθικλμνξοπρςτυφχψω".includes(word.substr(-1).toLowerCase())
                || "αβγδεζηθικλμνξοπρςτυφχψω".includes(word.substr(-2,1).toLowerCase())
                ) {
                    lang = "Ancient Greek"
                    langCode = "grc"
                    // emoji = "🇬🇷"
                    flagSrc = greece
                }
                return <span key={i} lang={langCode}><img className="inline-flag" src={flagSrc} alt={lang}/>&nbsp;{word} </span>
            })
        }
        
        let {linkBase, lemma} = this.props
        let {partOfSpeech, meaning, notes, root} = this.state

        // Create JSX for the forms.
        let mappedForms = this.state.forms.map((form,index)=>{
            return <span key={index}><Link title={form} to={linkBase + macraToHyphens(form)} lang="la">{form}</Link> </span>
        })

        // Create JSX for the cognates.
        let mappedCognates = this.state.cognates.map((cognate,index)=>{
            return (
                <span key={index}>
                    <Link title={cognate.replace("["," (").replace("]",")")} to={linkBase + macraToHyphens(cognate).replace(/\[.*\]/g,"")} lang="la">
                        {superscriptLemmaTag(cognate)}
                    </Link>{" "}
                </span>
            )
        })

        return (
            <div className="lemma">
                {/* superscriptLemmaTag() replaces anything in square brackets with a superscript. */}
                <h3 lang="la">{superscriptLemmaTag(lemma)}</h3>
                {partOfSpeech
                    ? <p>Part of speech: {partOfSpeech.toLowerCase()}</p>
                    : null}
                {meaning
                    ? <p>Meanings: {meaning}</p>
                    : null}
                {notes
                    ? <p>Notes: {notes}</p>
                    : null}
                {transliterations
                    ? <p>Transliterations: {transliterations}</p>
                    : null}
                {mappedForms
                    ? <p>Forms: {mappedForms}</p>
                    : null}
                <p>
                    {root
                        ? (mappedCognates ? <span>Cognates: {mappedCognates}</span> : "Please wait...")
                        : "I have not assigned cognates for this lemma, sorry!"}
                </p>
            </div>
        )
    }
}

export default Lemma