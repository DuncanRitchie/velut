import React from 'react'
import {Link} from 'react-router-dom'
import "../../App.css"
import "./Footer.css"

let Footer = () => {
    return (
        <div className="footer">
            <p>&copy; Duncan Ritchie. <Link to="./about">About velut</Link>. <a href="https://www.duncanritchie.co.uk" title="Duncan Ritchie&rsquo;s website">My website</a>.</p>
        </div>
    )
}

export default Footer