import { pending, fulfilled, rejected } from '../../../utils';
import { USERS } from '../../actionType';

const initialState = {
	loading: false,
	status: '',
	data: '',
	error: '',
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(USERS):
			return {
				...state,
				loading: true,
			};
		case fulfilled(USERS):
			return {
				...state,
				loading: false,
				status: action.payload.data.status,
				data: action.payload.data.data,
				error: '',
			};
		case rejected(USERS):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default userReducer;
