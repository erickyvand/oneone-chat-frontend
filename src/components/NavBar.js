/* eslint-disable react/prop-types */
import React from 'react';

const NavBar = ({ token }) => {
	if (!token) {
		return null;
	}

	const handleLogout = () => {
		sessionStorage.removeItem('id');
		sessionStorage.removeItem('fullname');
		sessionStorage.removeItem('token');
		window.location.assign('/login');
	};
	return (
		<div className='nav-bar' data-test='nav-bar'>
			<div style={{ width: '60%', margin: 'auto' }}>
				Welcome, {sessionStorage.fullname}
				<p className='logout' data-test='logout' onClick={handleLogout}>
					Logout
				</p>
			</div>
		</div>
	);
};

export default NavBar;
