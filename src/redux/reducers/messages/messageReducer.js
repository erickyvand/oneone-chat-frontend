import { pending, fulfilled, rejected } from '../../../utils';
import { SEND_MESSAGE } from '../../actionType';

const initialState = {
	loading: false,
	status: '',
	data: '',
	error: '',
};

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SEND_MESSAGE):
			return {
				...state,
				loading: true,
			};
		case fulfilled(SEND_MESSAGE):
			return {
				...state,
				loading: false,
				status: action.payload.data.status,
				data: action.payload.data.data,
				error: '',
			};
		case rejected(SEND_MESSAGE):
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message,
			};
		default:
			return state;
	}
};

export default messageReducer;
