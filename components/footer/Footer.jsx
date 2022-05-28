import Link from 'next/link';
import {useRouter} from 'next/router';
// import "../../App.css"
import styles from "./Footer.module.css"

let Footer = (props) => {
    // const showBack = props.history.length > 2
    // const showHome = props.history.location.pathname !== "/"
    // const showEnglish = props.history.location.pathname.substr(0,8) !== "/english"
    // const showSubwords = props.history.location.pathname.substr(0,9) !== "/subwords"
    // const showAdvanced = props.history.location.pathname.substr(0,9) !== "/advanced"
    // const showAbout = props.history.location.pathname !== "/about" && props.history.location.pathname !== "/about/"

    //// Footer has a list of links to different sections of velut, but the current section does not get linked to.
    //// So we need to work out what the current section is.

    const router = useRouter()
    const currentUrl = router.asPath
    const firstPartOfUrl = currentUrl.split('/').filter(Boolean)[0]
    const thereIsSecondPartOfUrl = currentUrl.split('/').filter(Boolean).length > 1;

    const doesUrlBeginWith = (token) => {
        return firstPartOfUrl
            && currentUrl !== '/'
            && !firstPartOfUrl.startsWith('?')
            && firstPartOfUrl === token
            || firstPartOfUrl?.startsWith(token + '?');
    }

    const showBack = true;
    const showHome = currentUrl !== "/" && !firstPartOfUrl?.startsWith('?')
    const showEnglish = !doesUrlBeginWith("english")
    const showSubwords = !doesUrlBeginWith("subwords")
    //// A URL such as /about/re shows the Word page for “rē”, not About,
    //// so link to About should be shown if there is a second part to the URL.
    //// Ditto for Advanced.
    const showAdvanced = !doesUrlBeginWith("advanced") || thereIsSecondPartOfUrl
    const showAbout = !doesUrlBeginWith("about") || thereIsSecondPartOfUrl

    return (
        <footer className={styles.footer}>
            <ul>
                <li>
                    <span className={styles.footerCopyright}>
                        © Duncan Ritchie
                    </span>
                </li>

                {showBack && <li><button className={styles.goBack + " button"} tabIndex="0" onClick={()=>{router.back()}} title="Go back to the previous page">Back</button></li>}

                {showHome && <li><Link href="/"><a title="velut homepage">Home</a></Link></li>}

                {showEnglish && <li><Link href="/english"><a title="English to Latin on velut">English to Latin</a></Link></li>}

                {showSubwords && <li><Link href="/subwords"><a title="Subwords on velut">Subwords</a></Link></li>}

                {showAdvanced && <li><Link href="/advanced"><a title="Advanced Search on velut">Advanced</a></Link></li>}

                {showAbout && <li><Link href="/about"><a title="About velut">About velut</a></Link></li>}
            </ul>
        </footer>
    )
}

export default Footer