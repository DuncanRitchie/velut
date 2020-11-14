import React from 'react';
import {Link} from 'react-router-dom'
import Title from '../../components/title/Title'
import AdvancedSearch from './AdvancedSearch'
import '../Subsites.css'

const AdvancedHome = () => {
    document.title = "Advanced search on velut"
    return (
        <div className="subsite-home advanced fulmar-background">
            <Title textBeforeTitle="Advanced search"/>
            <p>This will help you find Latin words that can be made with the letters you specify. Type some letters below!</p>
            <AdvancedSearch prefix="advanced/" searchbarTitle="Type something to find subwords of" />
        </div>
    )
}

export default AdvancedHome