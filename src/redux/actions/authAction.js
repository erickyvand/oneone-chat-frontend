import { loginService, signupService } from '../../services/authService';
import { LOGIN, SINGUP } from '../actionType';

export const signupAction = data => {
	return {
		type: SINGUP,
		payload: signupService(data),
	};
};

export const loginAction = data => {
	return {
		type: LOGIN,
		payload: loginService(data),
	};
};
