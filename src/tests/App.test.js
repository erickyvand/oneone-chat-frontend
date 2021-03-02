import React from 'react';
import { mount } from 'enzyme';
import NavBar from '../components/NavBar';

const setUp = (props = {}) => {
	const component = mount(<NavBar {...props} />);
	return component;
};

describe('NavBar component', () => {
	const { location } = window;
	beforeAll(() => {
		delete window.location;
		window.location = { assign: jest.fn() };
	});
	afterAll(() => {
		window.location = location;
	});
	describe('Have props', () => {
		let component;
		beforeEach(() => {
			const props = {
				token: 'token',
			};
			component = setUp(props);
		});

		it('Should render component when has token', done => {
			const wrapper = component.find(`[data-test='nav-bar']`);

			expect(wrapper.length).toBe(1);
			done();
		});

		it('Should logout', done => {
			const button = component.find(`[data-test='logout']`);
			const spyButton = jest.spyOn(button.props(), 'onClick');
			button.props().onClick({});
			expect(spyButton).toBeCalled();
			done();
		});
	});

	describe('Have no props', () => {
		let component;
		beforeEach(() => {
			component = setUp();
		});

		it('Should not render component when no token', done => {
			const wrapper = component.find(`[data-test='nav-bar']`);

			expect(wrapper.length).toBe(0);
			done();
		});
	});
});
