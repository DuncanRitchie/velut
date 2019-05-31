import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = (props) => {
    const input = props.input.replace(/-/g,"").replace(/\./g,"")
    const currentPage = props.currentPage
    let root = "../"
    if (currentPage === "word") {
        root = "./"
    }
    return (
        <ul className="navbar">
            {currentPage==="word" ? null : <li><Link to={root+input}>Latin word look-up</Link></li>}
            {currentPage==="countdown" ? null : <li><Link to={root+"countdown/"+input}>Play Latin Countdown</Link></li>}
            {currentPage==="anagrams" ? null : <li><Link to={root+"anagrams/"+input}>Find Latin anagrams</Link></li>}
        </ul>
    )
}

export default Navbar