import { pending, fulfilled, rejected } from '../../../utils';
import { LOGIN } from '../../actionType';

const initialState = {
	loading: false,
	status: '',
	data: '',
	error: '',
	redirect: false,
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(LOGIN):
			return {
				...state,
				loading: true,
				redirect: false,
			};
		case fulfilled(LOGIN):
			return {
				...state,
				loading: false,
				status: action.payload.data.status,
				data: action.payload.data.data,
				error: '',
				redirect: true,
			};
		case rejected(LOGIN):
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

export default loginReducer;
