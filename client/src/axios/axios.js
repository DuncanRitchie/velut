import axios from 'axios';

export default {
	// Gets all words
	getWords: () => {
		return axios.get('/api/words');
	},
	// Gets the word with the given id
	getWord: (id) => {
		return axios.get('/api/words/' + id);
	}
};