import axios from 'axios';

export default {
    // Counts the words in the MongoDB collection. Should be more than 90000.
    countWords: () => {
        return axios.get('/api/words/count')
    },
	// Gets all words whose letters are all found in the input string.
	getSubwords: (string) => {
		return axios.get('/api/words/subwords/',{params: {input: string}})
	},
	// Gets all multiword anagrams of the input string.
	getAnagrams: (string) => {
		return axios.get('/api/words/anagrams/',{params: {input: string}})
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
	// Gets words from the Advanced component.
	getAdvanced: (queryString) => {
		return axios.get("/api/words/advanced/"+queryString)
	},
	// Gets the word with the given id.
	getWordById: (id) => {
		return axios.get('/api/words/id/' + id)
	},
    // Counts the lemmata in the MongoDB collection. Should be more than 11000.
    countLemmata: () => {
        return axios.get('/api/lemmata/count')
    },
	// Gets one lemma only.
	getOneLemma: (query) => {
		return axios.get('/api/lemmata/one/',{params: query})
	},
	// Gets lemmata in alphabetical order.
	getLemmataAlph: (query) => {
		return axios.get('/api/lemmata/',{params: query})
	},
	// Gets lemmata from an English substring.
	getLemmataEnglish: (english) => {
		return axios.get('/api/lemmata/english/' + english)
	},
	// Gets the lemma with the given id.
	getLemmaById: (id) => {
		return axios.get('/api/lemmata/id/' + id)
	}

	
	// Gets all words with Length less than or equal to the given number.
	// ,getWordsShorterThan: (number) => {
	// 	return axios.get('/api/words/lte/',{params: {lte: number}})
	// }
}