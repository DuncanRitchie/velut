import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Word from '../../models/Word'

/* Allows you to view word card info and delete word card*/
const WordPage = ({ word, search }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  // const handleDelete = async () => {
  //   const wordID = router.query.id

  //   try {
  //     await fetch(`/api/words/${wordID}`, {
  //       method: 'Delete',
  //     })
  //     router.push('/')
  //   } catch (error) {
  //     setMessage('Failed to delete the word.')
  //   }
  // }

    if (word) {
        return (
            <div key={word._id}>
                <div className="card">
                    <img src={word.image_url} />
                    <h2 className="word-name">{word.Word}</h2>
                    <p>It’s in the dictionary!</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <>Word “{search}” not found!</>
        )
    }
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const word = await Word.findOne({ "Word": params.word }).select({ "_id": 0 })
  const wordAsObject = word?.toObject() ?? null
  console.log({wordAsObject})

  return { props: { word: wordAsObject, search: params.word } }
}

export default WordPage
