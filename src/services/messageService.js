import http from './httpService';

export const messageService = data => {
	return http.post('/api/messages', data);
};
