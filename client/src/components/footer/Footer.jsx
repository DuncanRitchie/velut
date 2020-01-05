import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import "../../App.css"
import "./Footer.css"

let Footer = (props) => {
    const showBack = props.history.length > 2
    const showHome = props.history.location.pathname !== "/"
    const showEnglish = props.history.location.pathname.substr(0,8) !== "/english"
    const showSubwords = props.history.location.pathname.substr(0,9) !== "/subwords"
    const showAbout = props.history.location.pathname !== "/about" && props.history.location.pathname !== "/about/"
    const countListItems = 2 + showBack + showHome + showEnglish + showSubwords + showAbout

    return (
        <footer className={"footer" + " footerContaining" + countListItems}>
            <ul>
                <li>
                    <span className="footer-copyright">
                        &copy; Duncan Ritchie
                    </span>
                </li>
                
                {showBack && <li><button className="go-back" tabIndex="0" onClick={()=>{props.history.goBack()}} title="Go back to the previous page">Back</button></li>}

                {showHome && <li><Link to="/" title="velut homepage"><span>Home</span></Link></li>}

                {showEnglish && <li><Link to="/english" title="English to Latin on velut"><span>English to Latin</span></Link></li>}

                {showSubwords && <li><Link to="/subwords" title="Subwords on velut"><span>Subwords</span></Link></li>}

                {showAbout && <li><Link to="/about" title="About velut"><span>About velut</span></Link></li>}

                <li><a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website"><span>My website</span></a></li>
            </ul>
        </footer>
    )
}

export default withRouter(Footer)