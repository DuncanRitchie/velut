import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditWord = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: word, error } = useSWR(id ? `/api/words/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!word) return <p>Loading...</p>

  const wordForm = {
    name: word.name,
    owner_name: word.owner_name,
    species: word.species,
    age: word.age,
    poddy_trained: word.poddy_trained,
    diet: word.diet,
    image_url: word.image_url,
    likes: word.likes,
    dislikes: word.dislikes,
  }

  return <Form formId="edit-word-form" wordForm={wordForm} forNewWord={false} />
}

export default EditWord
