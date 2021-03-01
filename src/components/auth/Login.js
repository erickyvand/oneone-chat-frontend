import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../redux/actions/authAction';

const Login = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const login = useSelector(state => state.login);

	let emailErr;

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

	const handleSumit = e => {
		dispatch(loginAction({ email, password }));
	};

	if (login.redirect) {
		window.location.href = '/chat';
		sessionStorage.setItem('token', login.data.token);
		sessionStorage.setItem('id', login.data.user.id);
		sessionStorage.setItem('fullname', login.data.user.fullname);
	}

	return (
		<div id='auth-container'>
			<form className='form'>
				{login.error && (
					<span className='error' data-test='error'>
						{login.error}
					</span>
				)}
				<h1>Login</h1>
				<input
					type='text'
					name='email'
					placeholder='Email'
					data-test='email'
					onChange={e => setEmail(e.target.value)}
				/>
				{emailErr && <span className='error'>{emailErr}</span>}
				<input
					type='password'
					name='password'
					placeholder='Password'
					data-test='password'
					onChange={e => setPassword(e.target.value)}
				/>
				<br />
				<input
					data-test='login-button'
					onClick={handleSumit}
					type='submit'
					value={login.loading ? 'Processing...' : 'Login'}
					className={
						!email || !password || emailErr || login.loading
							? 'btn-disabled'
							: 'btn'
					}
					disabled={!email || !password || emailErr || login.loading}
				/>
				<div className='text-info'>
					Don`t you have an account? <Link to='/'>Signup</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
