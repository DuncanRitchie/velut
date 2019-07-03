import axios from 'axios';

export default {
    // Counts the words in the MongoDB collection. Should be more than 90000.
    count: () => {
        return axios.get('/api/words/count')
    },
	// Gets all words with Length less than or equal to the given number.
	getWordsShorterThan: (number) => {
		return axios.get('/api/words/lte',{params: {lte: number}})
	},
	// Gets only the Id and Word of all words.
	getWordsOnlyWord: (query) => {
		return axios.get('/api/words/word',{params: query})
	},
	// Gets all properties of all words.
	getWords: (query) => {
		return axios.get('/api/words',{params: query})
	},
	// Gets the word with the given id.
	getWordById: (id) => {
		return axios.get('/api/words/' + id)
	}
}