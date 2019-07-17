import axios from 'axios';

export default {
    // Counts the words in the MongoDB collection. Should be more than 90000.
    countWords: () => {
        return axios.get('/api/words/count')
    },
	// Gets all words with Length less than or equal to the given number.
	getWordsShorterThan: (number) => {
		return axios.get('/api/words/lte/',{params: {lte: number}})
	},
	// Gets one word only.
	getOneWord: (query) => {
		return axios.get('/api/words/one/',{params: query})
	},
	// Gets words in alphabetical order.
	getWordsAlph: (query) => {
		return axios.get('/api/words/alph/',{params: query})
	},
	// Gets words in classical-rhyme order.
	getWordsClass: (query) => {
		return axios.get('/api/words/class/',{params: query})
	},
	// Gets words in ecclesiastical-rhyme order.
	getWordsEccles: (query) => {
		return axios.get('/api/words/eccles/',{params: query})
	},
	// Gets the word with the given id.
	getWordById: (id) => {
		return axios.get('/api/words/id/' + id)
	},
	// Gets one lemma only.
	getOneLemma: (query) => {
		return axios.get('/api/lemmata/one/',{params: query})
	},
	// Gets lemmata in alphabetical order.
	getLemmataAlph: (query) => {
		return axios.get('/api/lemmata/',{params: query})
	},
	// Gets the lemma with the given id.
	getLemmaById: (id) => {
		return axios.get('/api/lemmata/id/' + id)
	}
}