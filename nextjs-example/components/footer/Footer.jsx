import React from 'react'
import Link from 'next/link';
// import "../../App.css"
import styles from "./Footer.module.css"

let Footer = (props) => {
    // const showBack = props.history.length > 2
    // const showHome = props.history.location.pathname !== "/"
    // const showEnglish = props.history.location.pathname.substr(0,8) !== "/english"
    // const showSubwords = props.history.location.pathname.substr(0,9) !== "/subwords"
    // const showAdvanced = props.history.location.pathname.substr(0,9) !== "/advanced"
    // const showAbout = props.history.location.pathname !== "/about" && props.history.location.pathname !== "/about/"

    const showBack = true, showHome = true, showEnglish = true, showSubwords = true, showAdvanced = true, showAbout = true;

    return (
        <footer className={styles.footer}>
            <ul>
                <li>
                    <span className={styles.footerCopyright}>
                        © Duncan Ritchie
                    </span>
                </li>

                {/* {showBack && <li><button className={styles.goBack + " button"} tabIndex="0" onClick={()=>{props.history.goBack()}} title="Go back to the previous page">Back</button></li>} */}

                {showHome && <li><Link href="/" title="velut homepage">Home</Link></li>}

                {showEnglish && <li><Link href="/english" title="English to Latin on velut">English to Latin</Link></li>}

                {showSubwords && <li><Link href="/subwords" title="Subwords on velut">Subwords</Link></li>}

                {showAdvanced && <li><Link href="/advanced" title="Advanced Search on velut">Advanced</Link></li>}

                {showAbout && <li><Link href="/about" title="About velut">About velut</Link></li>}

                <li><a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie’s personal website">My website</a></li>
            </ul>
        </footer>
    )
}

export default Footer