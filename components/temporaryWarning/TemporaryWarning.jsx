import Disclosure from '../disclosure/Disclosure'
import styles from './TemporaryWarning.module.css'

const TemporaryWarning = () => {
  return (
    <aside className={styles.warning}>
      <Disclosure>
        <summary>Warning</summary>
        <p>
          I added all the words in velut manually. I’ve created a script for
          automatically generating inflected forms, but I need to check it’s all
          correct. There are many mistakes and omissions in the lists of forms
          on this website, but they will not be emended until I’ve finished
          reviewing all forms.
        </p>
      </Disclosure>
    </aside>
  )
}
export default TemporaryWarning
