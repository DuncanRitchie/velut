import axios from 'axios';

export default {
	// Gets all words
	getWords: (query) => {
		return axios.get('/api/words',{params: query});
	},
	// Gets the word with the given id
	getWordById: (id) => {
		return axios.get('/api/words/' + id);
	}
};