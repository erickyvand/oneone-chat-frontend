import http from './httpService';

export const userService = () => {
	return http.get('/api/users');
};
