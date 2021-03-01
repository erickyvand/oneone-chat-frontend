import React from 'react';

const NavBar = () => {
	const handleLogout = () => {
		sessionStorage.removeItem('id');
		sessionStorage.removeItem('fullname');
		sessionStorage.removeItem('token');
		window.location.href = '/login';
	};
	return (
		<div className='nav-bar'>
			<div style={{ width: '60%', margin: 'auto' }}>
				Welcome, {sessionStorage.fullname}
				<p className='logout' onClick={handleLogout}>
					Logout
				</p>
			</div>
		</div>
	);
};

export default NavBar;
