/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../redux/actions/userAction';

const Users = ({ sendUserId }) => {
	const dispatch = useDispatch();

	const usersData = useSelector(state => state.users);
	const users = [...usersData.data];

	const handleClick = userId => {
		sendUserId(userId);
	};

	useEffect(() => {
		dispatch(userAction());
	}, []);
	return (
		<div className='cell-list'>
			{users.length === 0 ? (
				<p className='text-white'>No users available</p>
			) : users.loading ? (
				<p className='text-white'>wait for data to load...</p>
			) : (
				users.map(user => (
					<div
						key={user.id}
						data-test='user-button'
						className='cell-list-text'
						onClick={() => handleClick(user.id)}
					>
						{user.fullname}
					</div>
				))
			)}
		</div>
	);
};

export default Users;
