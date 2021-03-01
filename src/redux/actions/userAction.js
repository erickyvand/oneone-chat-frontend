import { userService } from '../../services/userService';
import { USERS } from '../actionType';

export const userAction = () => {
	return {
		type: USERS,
		payload: userService(),
	};
};
