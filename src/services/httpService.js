import axios from 'axios';

const token = sessionStorage.getItem('token');

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		authorization: `Bearer ${token}`,
		'Access-Control-Allow-Origin': '*',
		contentType: 'aplication/json',
		accept: 'application/json',
	},
});
