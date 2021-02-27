import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

test('renders react app', () => {
	const wrapper = shallow(<App />);
	const welcome = <h1>Welcome to the chat app</h1>;
	expect(wrapper.contains(welcome)).toEqual(true);
});
