import React from 'react';
import {Link} from 'react-router-dom';
import './WarningMessage.css'

let WarningMessage = () => {
    return (
        <p className="warning-message">
            Nota bene &mdash;<br />
            • All the data have been compiled by me, so there are occasional errors and many omissions. 
            Please check words in other dictionaries; there are links at the base of the page.<br />
            • For more info, see my <Link to="./about" title="About velut">about page</Link>. Have fun searching!
        </p>
    )
}

export default WarningMessage