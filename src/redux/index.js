import { combineReducers } from 'redux';
import signupReducer from './reducers/auth/signupReducer';

const rootReducer = combineReducers({
	signup: signupReducer,
});

export default rootReducer;
