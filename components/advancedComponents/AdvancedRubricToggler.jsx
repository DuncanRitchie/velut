import AdvancedRubric from './AdvancedRubric';
import styles from './AdvancedRubricToggler.module.css';

function AdvancedRubricToggler() {
    return (
        <details className={styles.advancedRubricToggler}>
            <summary>How to use the Advanced Search</summary>
            <AdvancedRubric/>
        </details>
    )
}

export default AdvancedRubricToggler;
