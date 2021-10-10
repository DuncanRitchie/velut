import Head from 'next/head'
import Header from '../../components/header/Header'
import AdvancedRubricToggler from '../../components/advancedComponents/AdvancedRubricToggler'
// import AdvancedSearch from '../../components/advancedComponents/AdvancedSearch'
import styles from '../../css/Subsites.module.css'

const AdvancedHome = () => {
    return (<>
        <Head>
            <title>
                Advanced Search on velut — a Latin rhyming dictionary
            </title>
        </Head>
        <div className={styles.subsiteHome + " advanced fulmar-background"}>
            <Header textBeforeTitle="Advanced Search"/>
            <AdvancedRubricToggler/>
            {/* <AdvancedSearch autofocus={true}/> */}
        </div>
    </>)
}

export default AdvancedHome