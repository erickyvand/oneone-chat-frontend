import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import User from '../components/users/Users';
import configureStore from '../redux/store';
import { pending, fulfilled, rejected } from '../utils/index';
import * as types from '../redux/actionType';
import userReducer from '../redux/reducers/users/userReducer';

Enzyme.configure({ adapter: new Adapter() });

let store;
let wrapper;
describe('Testing functionality', () => {
	store = configureStore;
	wrapper = mount(
		<Provider store={store}>
			<Router>
				<User />
			</Router>
		</Provider>
	);
	it('should signup a user', done => {
		const form = wrapper.find('[data-test="user-button"]');
		expect(form).toBeDefined();
		done();
	});

	it('Should wait for an action to get users', done => {
		const action = {
			type: pending(types.USERS),
			payload: {
				data: {
					loading: true,
				},
			},
		};
		const expectedState = {
			loading: true,
			status: '',
			data: '',
			error: '',
		};

		expect(userReducer(undefined, action)).toEqual(expectedState);
		done();
	});

	it('Should get users when an action is success', done => {
		const action = {
			type: fulfilled(types.USERS),
			payload: {
				data: {
					status: 200,
				},
			},
		};

		const expectedState = {
			loading: false,
			status: action.payload.data.status,
			error: '',
		};

		expect(userReducer(undefined, action)).toEqual(expectedState);
		done();
	});

	it('Should throw an error when an action was rejected', done => {
		const action = {
			type: rejected(types.USERS),
			payload: {
				response: {
					data: {
						error: 'Invalid email or password',
					},
				},
			},
		};
		const expectedState = {
			loading: false,
			error: action.payload.response.data.message,
			status: '',
			data: '',
		};
		expect(userReducer(undefined, action)).toEqual(expectedState);
		done();
	});
});
