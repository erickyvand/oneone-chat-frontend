import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Login from '../components/auth/Login';
import configureStore from '../redux/store';
import { pending, fulfilled, rejected } from '../utils/index';
import * as types from '../redux/actionType';
import loginReducer from '../redux/reducers/auth/loginReducer';

Enzyme.configure({ adapter: new Adapter() });

let store;
let wrapper;
describe('Testing functionality', () => {
	store = configureStore;
	wrapper = mount(
		<Provider store={store}>
			<Router>
				<Login />
			</Router>
		</Provider>
	);
	it('should login a user', done => {
		const form = wrapper.find('[data-test="login-button"]');

		const onSubmit = jest.spyOn(form.props(), 'onClick');
		form.props().onClick({
			email: 'john@test.com',
			password: 'fdama12',
		});
		expect(onSubmit).toBeCalled();
		done();
	});

	it('Should wait for an action to login a user', done => {
		const action = {
			type: pending(types.LOGIN),
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
			redirect: false,
		};

		expect(loginReducer(undefined, action)).toEqual(expectedState);
		done();
	});

	it('Should login a user when an action is success', done => {
		const action = {
			type: fulfilled(types.LOGIN),
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
			redirect: true,
		};

		expect(loginReducer(undefined, action)).toEqual(expectedState);
		done();
	});

	it('Should throw an error when an action was rejected', done => {
		const action = {
			type: rejected(types.LOGIN),
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
			redirect: false,
			status: '',
			data: '',
		};
		expect(loginReducer(undefined, action)).toEqual(expectedState);
		done();
	});
});
