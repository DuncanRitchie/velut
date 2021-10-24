import React from 'react'
import styles from './Header.module.css'

let Header = (props) => {
    return (
        <header className={styles.header}>
            <h1>
                {props.textBeforeTitle ? <>{props.textBeforeTitle}<br /></> : null }
                <span className={styles.titleAuthor}>Duncan Ritchie’s</span><br />
                <abbr className={styles.title} lang="la" title="Useful Tables of Excellent Latin Vocabulary">velut</abbr>
            </h1>
            <p className={styles.titleFull} lang="la">
                Vocābulōrum Excellentium<br/>
                Latīnōrum Ūtilēs Tabulae
            </p>
        </header>
    )
}

export default Header