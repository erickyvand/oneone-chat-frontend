import { signupService } from '../../services/authService';
import { SINGUP } from '../actionType';

export const signupAction = data => {
	return {
		type: SINGUP,
		payload: signupService(data),
	};
};
