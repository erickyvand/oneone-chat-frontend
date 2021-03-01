import { combineReducers } from 'redux';
import loginReducer from './reducers/auth/loginReducer';
import signupReducer from './reducers/auth/signupReducer';
import messageReducer from './reducers/messages/messageReducer';
import userReducer from './reducers/users/userReducer';

const rootReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	users: userReducer,
	message: messageReducer,
});

export default rootReducer;
