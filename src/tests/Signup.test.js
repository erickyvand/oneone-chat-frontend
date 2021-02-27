import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Signup from '../components/auth/Signup';
import thunk from 'redux-thunk';
import configureStore from '../redux/store';
import { pending, fulfilled, rejected } from '../utils/index';
import * as types from '../redux/actionType';
import signupReducer from '../redux/reducers/auth/signupReducer';

Enzyme.configure({ adapter: new Adapter() });

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
