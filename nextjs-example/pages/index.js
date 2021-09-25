import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Word from '../models/Word'

const Index = ({ words }) => (
  <>
    {/* Create a card for each word */}
    {words.map((word) => (
      <div key={word._id}>
        <div className="card">
          <p>{word.Word}</p>
          {/* <img src={word.image_url} />
          <h5 className="word-name">{word.name}</h5>
          <div className="main-content">
            <p className="word-name">{word.name}</p>
            <p className="owner">Owner: {word.owner_name}</p>

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
              <Link href="/[id]" as={`/${word._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    ))}
  </>
)

/* Retrieves word(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Word.find({"Word": "fūlmārus"})
  const words = result.map((doc) => {
    const word = doc.toObject()
    word._id = word._id.toString()
    return word
  })

  return { props: { words: words } }
}

export default Index
