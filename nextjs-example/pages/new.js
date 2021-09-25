import Form from '../components/Form'

const NewWord = () => {
  const wordForm = {
    name: '',
    owner_name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
  }

  return <Form formId="add-word-form" wordForm={wordForm} />
}

export default NewWord
