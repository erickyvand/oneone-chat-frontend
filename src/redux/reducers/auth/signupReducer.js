import { pending, fulfilled, rejected } from '../../../utils';
import { SINGUP } from '../../actionType';

const initialState = {
	loading: false,
	status: '',
	error: '',
	redirect: false,
};

const signupReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SINGUP):
			return {
				...state,
				loading: true,
				redirect: false,
			};
		case fulfilled(SINGUP):
			return {
				...state,
				loading: false,
				status: action.payload.data.status,
				error: '',
				redirect: true,
			};
		case rejected(SINGUP):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
				redirect: false,
			};
		default:
			return state;
	}
};

export default signupReducer;
