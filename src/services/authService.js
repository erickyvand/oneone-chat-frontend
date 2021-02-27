import http from './httpService';

export const signupService = data => {
	return http.post('/api/auth/signup', data);
};

export const loginService = data => {
	return http.post('/api/auth/login', data);
};
