import React from 'react'
import './Title.css'

let Title = (props) => {
    return (
        <div className="title-div">
            <h1>
                {props.textBeforeTitle ? <span>{props.textBeforeTitle}<br /></span> : null }
                <span className="title-author">Duncan&nbsp;Ritchie&rsquo;s</span><br />
                <span className="title" lang="la">velut</span>
            </h1>
            <p className="title-full" lang="la">
                Vocābulōrum Excellentium<br/>
                Latīnōrum Ūtilēs Tabulae
            </p>
        </div>
    )
}

export default Title