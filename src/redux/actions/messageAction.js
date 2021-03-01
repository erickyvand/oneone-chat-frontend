import { messageService } from '../../services/messageService';
import { SEND_MESSAGE } from '../actionType';

export const messageAction = data => {
	return {
		type: SEND_MESSAGE,
		payload: messageService(data),
	};
};
