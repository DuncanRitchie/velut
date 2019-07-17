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
    let inputTrunc = input
    if (inputTrunc.length>9) {
        inputTrunc = input.substr(0,9)
    }
    return (
        <ul className="navbar">
            {currentPage==="word" ? null : <li><Link to={root+input} title="Find lemmata, rhymes, etc.">Latin word look-up</Link></li>}
            {currentPage==="subwords" ? null : <li><Link to={root+"subwords/"+input} title="Find subwords">Play Latin Countdown</Link></li>}
            {currentPage==="anagrams" ? null : <li><Link to={root+"anagrams/"+inputTrunc} title="Find anagrams">Find Latin anagrams</Link></li>}
        </ul>
    )
}

export default Navbar