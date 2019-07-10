import axios from 'axios';

export default {
    // Counts the words in the MongoDB collection. Should be more than 90000.
    count: () => {
        return axios.get('/api/words/count')
    },
	// Gets all words with Length less than or equal to the given number.
	getWordsShorterThan: (number) => {
		return axios.get('/api/words/lte/',{params: {lte: number}})
	},
	// Gets words in classical-rhyme order.
	getWordsClass: (query) => {
		return axios.get('/api/words/',{params: query})
	},
	// Gets words in alphabetical order.
	getWords: (query) => {
		return axios.get('/api/words/alph',{params: query})
	},
	// Gets the word with the given id.
	getWordById: (id) => {
		return axios.get('/api/words/id/' + id)
	}
}