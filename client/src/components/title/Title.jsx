import React from 'react'
import './Title.css'

let Title = (props) => {
    return (
        <div className="title-div">
            <h1>
                {props.textBeforeTitle ? <span>{props.textBeforeTitle}<br /></span> : null }
                <span className="title-author">Duncan Ritchie&rsquo;s</span><br />
                <span className="title">velut</span>
            </h1>
            <p className="title-full">
                Vocābulōrum Excellentium<br/>
                Latīnōrum Ūtilēs Tabulae
            </p>
        </div>
    )
}

export default Title