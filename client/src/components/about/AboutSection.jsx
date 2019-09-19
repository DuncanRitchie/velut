import React from 'react';
import {sectionHeads, sectionIds} from './AboutSectionHeads';

const AboutSection = (props) => {
    console.log(sectionHeads[props.i])
    console.log(sectionIds[props.i])
    return (
        <div className="about-section" id={sectionIds[props.i]}>
            <h2>{sectionHeads[props.i]}</h2>
            {props.children}
        </div>
    )
}

export default AboutSection;