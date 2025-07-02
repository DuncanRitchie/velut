import styles from './PageArrow.module.css'

let PageArrow = ({ children }) => {
  return (
    <span className={styles.pageArrow} aria-hidden="true">
      {children}
    </span>
  )
}

export default PageArrow
