import axios from 'axios';

export default {
    // Counts the words in the MongoDB collection. Should be more than 90000.
    count: () => {
        return axios.get('/api/words/count')
    },
	// Gets all words
	getWords: (query) => {
		return axios.get('/api/words',{params: query})
	},
	// Gets the word with the given id
	getWordById: (id) => {
		return axios.get('/api/words/' + id)
	}
}