import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signupAction } from '../../redux/actions/authAction';

const Signup = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [fullName, setFullName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const signup = useSelector(state => state.signup);

	let nameErr;
	let emailErr;
	let passErr;

	if (fullName === '') {
		nameErr = 'Full Name is not allowed to be empty';
	} else if (fullName !== undefined && fullName.length < 2) {
		nameErr = 'Full Name length must be at least 2 characters long';
	} else {
		nameErr = '';
	}

	if (email === '') {
		emailErr = 'Email is not allowed to be empty';
	} else if (
		email !== undefined &&
		!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		)
	) {
		emailErr = 'Email must be a valid email';
	} else {
		emailErr = '';
	}

	if (password === '') {
		passErr = 'Password is not allowed to be empty';
	} else if (password !== undefined && password.length < 6) {
		passErr = 'Password length must be at least 6 characters long';
	} else {
		passErr = '';
	}

	const handleSumit = e => {
		e.preventDefault();
		dispatch(signupAction({ fullName, email, password }));
	};

	useEffect(() => {
		if (signup.redirect) {
			history.push('/login');
		}
	});

	return (
		<div id='container'>
			<form className='form' onSubmit={handleSumit}>
				{signup.error && <span className='error'>{signup.error}</span>}
				<h1>Sign up</h1>
				<input
					type='text'
					name='fullName'
					placeholder='Full Name'
					onChange={e => setFullName(e.target.value)}
				/>
				{nameErr && <span className='error'>{nameErr}</span>}
				<input
					type='text'
					name='email'
					placeholder='Email'
					onChange={e => setEmail(e.target.value)}
				/>
				{emailErr && <span className='error'>{emailErr}</span>}
				<input
					type='password'
					name='password'
					placeholder='Password'
					onChange={e => setPassword(e.target.value)}
				/>
				{passErr && <span className='error'>{passErr}</span>}
				<br />
				<input
					type='submit'
					value='Sign up'
					className={
						!fullName || !email || !password || nameErr || emailErr || passErr
							? 'btn-disabled'
							: 'btn'
					}
					disabled={
						!fullName || !email || !password || nameErr || emailErr || passErr
					}
				/>
			</form>
		</div>
	);
};

export default Signup;
