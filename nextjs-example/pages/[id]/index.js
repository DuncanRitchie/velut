import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Word from '../../models/Word'

/* Allows you to view word card info and delete word card*/
const WordPage = ({ word }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const wordID = router.query.id

    try {
      await fetch(`/api/words/${wordID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the word.')
    }
  }

  return (
    <div key={word._id}>
      <div className="card">
        <img src={word.image_url} />
        <h5 className="word-name">{word.name}</h5>
        <div className="main-content">
          <p className="word-name">{word.name}</p>
          <p className="owner">Owner: {word.owner_name}</p>

          {/* Extra Word Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {word.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {word.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${word._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const word = await Word.findById(params.id).lean()
  word._id = word._id.toString()

  return { props: { word } }
}

export default WordPage
