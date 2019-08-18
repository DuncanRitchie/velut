import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import "../../App.css"
import "./Footer.css"

let Footer = (props) => {
    return (
        <footer className="footer">
            <ul>
                <li>
                    <span className="footer-copyright">
                        &copy; Duncan Ritchie
                    </span>
                </li>
                {props.history.length>2
                    ? (<li><button className="go-back" tabIndex="0" onClick={()=>{props.history.goBack()}} title="Go back to the previous page">Back</button></li>)
                    : null}
                {props.history.location.pathname==="/"
                    ? null 
                    : <li><Link to="/" title="velut homepage"><span>Home</span></Link></li> }
                {props.history.location.pathname.substr(0,9)==="/subwords"
                        ? null 
                        : <li><Link to="/subwords" title="Subwords on velut"><span>Subwords</span></Link></li> }
                {props.history.location.pathname==="/about" || props.history.location.pathname==="/about/"
                    ? null 
                    : <li><Link to="/about" title="About velut"><span>About velut</span></Link></li> }
                <li>
                    <a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website"><span>My website</span></a>
                </li>
            </ul>
        </footer>
    )
}

export default withRouter(Footer)