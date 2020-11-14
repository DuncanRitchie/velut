import React from 'react';
import {Link} from 'react-router-dom';

const AdvancedRubric = () => {
    return (
        <div class="advanced-rubric">
            <h2>How to use</h2>
            <p>You can search by spelling, scansion, or both.</p>
            <p>Searches are limited to 1000 results.</p>
            <h3>Spelling</h3>
            <p>Here you can specify letters that must be in the word. Letters must be typed in lowercase (and without diaacritics) for them to be treated as letters. Uppercase letters are reserved for “wildcards”, of which there are the following:</p>
            <h4>Wildcards</h4>
            <ul>
                <li>If a capital “C” is input, it means any consonant letter (bcdfghklmnpqrstvxyz).</li>
                <li>If a capital “V” is input, it means any vowel letter (aeiouy). Even if “i” is pronounced as a consonant, it is treated as a vowel here.</li>
                <li>If an underscore is input, it means any sequence of zero or more letters.</li>
            </ul>
            <h4>Examples</h4>
            <li>
                <ul>“vota” returns the words <Link to="../vo-ta" title="vōta">vōta</Link> and <Link to="../vo-ta-" title="vōtā">vōtā</Link>.</ul>
                <ul>“Vota” returns the word <Link to="../io-ta" title="iōta">iōta</Link>.</ul>
                <ul>“augustus” returns the words <Link to="../Augustus" title="Augustus">Augustus</Link> and <Link to="../augustus" title="augustus">augustus</Link>. “VVgustus” returns the same. “Augustus” does not return anything: the “a” needs to be lowercase here.</ul>
                <ul>“august_” returns all the forms of <Link to="../Augusta" title="Augusta">Augusta</Link>, <Link to="../Augustus" title="Augustus">Augustus</Link>, <Link to="../augustus" title="augustus">augustus</Link>, <Link to="../Augusti-nus" title="Augustīnus">Augustīnus</Link>, etc that are in velut.</ul>
                <ul>“_” doesn’t return anything unless scansion is also set (see below).</ul>
            </li>
        </div>
    )
}

export default AdvancedRubric;
