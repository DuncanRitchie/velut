import Head from 'next/head'
import Header from '../../components/header/Header'
import AdvancedRubricToggler from '../../components/advancedComponents/AdvancedRubricToggler'
import AdvancedSearch from '../../components/advancedComponents/AdvancedSearch'
import styles from '../../css/Subsites.module.css'

const AdvancedHome = ({ query }) => {
    return (<>
        <Head>
            <title>
                Advanced Search on velut — a Latin rhyming dictionary
            </title>
        </Head>
        <div className={styles.subsiteHome + " advanced fulmar-background"}>
            <Header textBeforeTitle="Advanced Search"/>
            <AdvancedRubricToggler/>
            <AdvancedSearch autofocus={true} query={query}/>
        </div>
    </>)
}

export default AdvancedHome

export async function getServerSideProps(props) {
    console.log(props)
    const { query } = props
    return { props: {
        query,
    }}
}
