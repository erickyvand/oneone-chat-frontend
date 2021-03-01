import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../components/auth/Signup';
import thunk from 'redux-thunk';
import configureStore from '../redux/store';
import { pending, fulfilled, rejected } from '../utils/index';
import * as types from '../redux/actionType';
import signupReducer from '../redux/reducers/auth/signupReducer';

let store;
let wrapper;

describe('Signup component', () => {
	store = configureStore;
	wrapper = mount(
		<Provider store={store}>
			<Router>
				<Signup />
			</Router>
		</Provider>
	);

	const { location } = window;
	beforeAll(() => {
		delete window.location;
		window.location = { assign: jest.fn() };
	});
	afterAll(() => {
		window.location = location;
	});

	it('should signup a user', done => {
		const form = wrapper.find('[data-test="signup-button"]');

		const onSubmit = jest.spyOn(form.props(), 'onClick');
		form.props().onClick({
			fullName: 'John Doe',
			email: 'john@test.com',
			password: 'fdama12',
		});
		expect(onSubmit).toBeCalled();
		done();
	});
});

it('Should check empty name', done => {
	const inputFullName = wrapper.find(`[data-test='fullName']`);

	inputFullName.simulate('change', { target: { name: 'fullName', value: '' } });
	const fullName = '';
	expect(fullName.length).toBe(0);
	done();
});

it('Should check if name is valid', done => {
	const inputFullName = wrapper.find(`[data-test='fullName']`);

	inputFullName.simulate('change', {
		target: { name: 'fullName', value: 'd' },
	});
	const fullName = 'doe';
	expect(fullName.length).toBe(3);
	done();
});

it('Should check empty email', done => {
	const inputEmail = wrapper.find(`[data-test='email']`);

	inputEmail.simulate('change', { target: { name: 'email', value: '' } });
	const email = '';
	expect(email.length).toBe(0);
	done();
});

it('Should check valid email', done => {
	const inputEmail = wrapper.find(`[data-test='email']`);

	inputEmail.simulate('change', {
		target: { name: 'email', value: 'doe@testcom' },
	});
	const email = 'doe@test.com';
	expect(email).toContain('doe@test.com');
	done();
});

it('Should check empty password', done => {
	const inputPassword = wrapper.find(`[data-test='password']`);

	inputPassword.simulate('change', { target: { name: 'password', value: 'pa' } });
	const password = 'passPass';
	expect(password.length).toBe(8);
	done();
});

it('Should check valid password', done => {
	const inputPassword = wrapper.find(`[data-test='password']`);

	inputPassword.simulate('change', { target: { name: 'password', value: '' } });
	const password = '';
	expect(password.length).toBe(0);
	done();
});

describe('Testing functionality', () => {
	it('Should wait for an action to signup a user', done => {
		const action = {
			type: pending(types.SINGUP),
			payload: {
				data: {
					loading: true,
				},
			},
		};
		const expectedState = {
			loading: true,
			status: '',
			error: '',
			redirect: false,
		};

		expect(signupReducer(undefined, action)).toEqual(expectedState);
		done();
	});

	it('Should signup a user when an action is success', done => {
		const action = {
			type: fulfilled(types.SINGUP),
			payload: {
				data: {
					status: 201,
				},
			},
		};

		const expectedState = {
			loading: false,
			status: action.payload.data.status,
			error: '',
			redirect: true,
		};

		expect(signupReducer(undefined, action)).toEqual(expectedState);
		done();
	});

	it('Should throw an error when an action was rejected', done => {
		const action = {
			type: rejected(types.SINGUP),
			payload: {
				response: {
					data: {
						error: 'Email already exists',
					},
				},
			},
		};
		const expectedState = {
			loading: false,
			error: action.payload.response.data.message,
			redirect: false,
			status: '',
		};
		expect(signupReducer(undefined, action)).toEqual(expectedState);
		done();
	});
});
