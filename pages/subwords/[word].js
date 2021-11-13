import {Component, Fragment} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
// import axios from "../../axios/axios"
import {noMacra} from '../../lib/words/diacritics'
import getSubwords, {
    deleteCharacters,
    randomCountdownQuestionWeighted,
} from '../../lib/words/subwords'
import styles from '../../css/Subsites.module.css'

// <Subwords/> is a JSX element rendered at /subwords/:word

const Subwords = ({input, subwords, loading}) => {
// class Subwords extends Component {
//     constructor(props) {
//         super(props);
        // this.state = {
        //     input: this.props.word,
        //     subwords: [],
        //     loading: false
        // }
//    }

    // fetchWords(input) {
        // this.setState({loading: true})
        // axios.getSubwords(noMacra(input).toLowerCase()).then((data)=>{
        //     // data.data is a simple array of strings.
        //     this.setState({subwords: data.data})
        //     this.setState({loading: false})
        // })
    // }

    // componentDidMount() {
    //     this.fetchWords(this.props.match.params.word)
    // }

    // componentDidUpdate() {
    //     if (this.state.input !== this.props.match.params.word) {
    //         let input = this.props.match.params.word
    //         this.setState({input: input})
    //         this.fetchWords(input)
    //     }
    // }

    //render() {
        //let input = this.props.input

        let mappedWords = []
        if (subwords) {
            mappedWords = subwords.map((word,index)=>{
                // If we can delete from the input all the letters of the word and still have letters left over, we render a Link.
                let remainingLetters = deleteCharacters(noMacra(input),noMacra(word))
                if (remainingLetters) {
                    return <Fragment key={index}><Link href={"./"+remainingLetters}><a title={"delete “"+word+"” from “"+input+"” to leave “"+remainingLetters+"”"} lang="la">{word}</a></Link> </Fragment>
                }
                // Otherwise the word is an anagram of input and we don’t render a Link.
                else {
                    return <Fragment key={index}><strong>{word}</strong> </Fragment>
                }
            })
        }
        let randomCountdownQuestionExample = randomCountdownQuestionWeighted()
        let result = null
        //// `loading` is not expected to be true because of server-side rendering.
        //// But I’m leaving it in, in case it’s needed in future.
        if (loading) {
            result = (<p>Loading subwords…&nbsp; This can take a minute.</p>)
        }
        else if (mappedWords.length) {
            result = (
                <div>
                    <p>Here {mappedWords.length === 1 ? "is the 1 Latin word" : `are the ${mappedWords.length} Latin words`}  that can be made out of letters in <strong lang="zxx">{input}</strong>.&nbsp; You can click on a word (if it’s not a perfect anagram) to delete its letters from <strong lang="zxx">{input}</strong>.</p>
                    <p lang="la">{mappedWords}</p>
                </div>
            )
        }
        else {
            result = (
                <p>No subwords found!&nbsp; Try a different input, such as <Link href={"./"+randomCountdownQuestionExample}><a title={"Subwords of "+randomCountdownQuestionExample}>{randomCountdownQuestionExample}</a></Link>.</p>
            )
        }
        return (<>
            <Head>
                <title>
                    Subwords of “{input}” on velut — a Latin rhyming dictionary
                </title>
                <meta name="Description" content={`Latin words made from the letters of “${input}”`}/>
            </Head>
            <div className="subwords fulmar-background">
                <Header textBeforeTitle="Subwords" />
                <div>
                    <Search type="/subwords" searchbarTitle="Type something to find subwords of" lang="zxx" hideDropdown={true} searchWord={input} />
                    <div className={styles.subsiteResult}>
                        {result}
                    </div>
                </div>
            </div>
        </>)
    //}
}

export default Subwords

export async function getServerSideProps({ params }) {
    let input = params.word || ""
    //// If special characters are input, we can get percent-encoding problems.
    //// Let’s correct for that.
    if (input.search("%")>-1) {
        input = decodeURIComponent(input)
    }

    const subwordsObject = await getSubwords(input)
    const subwords = subwordsObject.subwords
    return { props: {
        input, subwords
    }}
}
