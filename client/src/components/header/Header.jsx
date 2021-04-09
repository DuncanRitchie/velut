import React from 'react'
import './Header.css'

let Header = (props) => {
    return (
        <header>
            <h1>
                {props.textBeforeTitle ? <span>{props.textBeforeTitle}<br /></span> : null }
                <span className="title-author">Duncan Ritchie’s</span><br />
                <abbr className="title" lang="la" title="Useful Tables of Excellent Latin Vocabulary">velut</abbr>
            </h1>
            <p className="title-full" lang="la">
                Vocābulōrum Excellentium<br/>
                Latīnōrum Ūtilēs Tabulae
            </p>
        </header>
    )
}

export default Header