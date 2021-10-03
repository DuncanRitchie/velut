import React from 'react';
import Head from 'next/head'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import styles from '../../css/Subsites.module.css'

const EnglishHome = () => {
    return (<>
        <Head>
            <title>
                English to Latin on velut — a Latin rhyming dictionary
            </title>
        </Head>
        <div className={styles.subsiteHome+" english fulmar-background"}>
            <Header textBeforeTitle="English to Latin"/>
            <p className={styles.subsiteHomeRubric}>Enter something English and this will suggest Latin translations!</p>
            <Search prefix="english/" searchbarTitle="Type an English word" lang="en" hideDropdown={true}/>
        </div>
    </>)
}

export default EnglishHome
