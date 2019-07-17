import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import "../../App.css"
import "./Footer.css"

let Footer = (props) => {
    return (
        <div className="footer">
            <ul>
                <li>
                    &copy; Duncan Ritchie.
                </li>
                {props.history.length>2
                    ? (<li><span className="go-back" onClick={()=>{props.history.goBack()}} title="Go back to the previous page">Back</span>.</li>)
                    : null}
                {props.history.location.pathname==="/"
                    ? null 
                    : <li><Link to="./" title="velut homepage">Home</Link>.</li> }
                {props.history.location.pathname==="/about"
                    ? null 
                    : <li><Link to="./about" title="About velut">About velut</Link>.</li> }
                <li>
                    <a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website">My website</a>.
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Footer)