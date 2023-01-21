import styles from './TemporaryWarning.module.css'

const TemporaryWarning = () => {
  return (
    <aside className={styles.warning}>
      <details>
        <summary>Warning</summary>
        <p>
          I added all the words in velut manually. I’m in the middle of creating
          a script for automatically generating inflected forms. There are many
          mistakes and omissions in the lists of forms, but they will not be
          emended until I’ve finished this script.
        </p>
      </details>
    </aside>
  )
}
export default TemporaryWarning
