/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Users from '../users/Users';
import SendMessage from './SendMessage';
import Thread from './Thread';

const Chat = ({ messages, socket }) => {
	const [userId, setUserId] = useState();

	const usersData = useSelector(state => state.users);
	const users = [...usersData.data];

	let user;
	if (users.length > 0) {
		user = users.find(u => u.id === userId);
	}

	const getUserId = data => {
		setUserId(data);
	};

	useEffect(() => {
		if (!sessionStorage.getItem('token')) {
			window.location.href = '/login';
		}
	}, [userId]);

	return (
		<div className='chat-container'>
			<div className='table'>
				<div className='row row-header'>
					<div className='cell row-header-text'>
						{userId === undefined ? (
							`Hello ${sessionStorage.getItem(
								'fullname'
							)}, type on any name in the list and start chatting with friends`
						) : (
							<>
								<p>{user && user.fullname}</p>
								<small>
									{user !== undefined && user.socket === ''
										? 'last seen ' +
										  moment(user.updatedat).calendar({
												sameDay: `[${moment(user.updatedat).format('HH:mm')}]`,
												lastWeek: `[${moment(user.updatedat).format(
													'Do MMM YYYY HH:mm'
												)}]`,
												sameElse: `[${moment(user.updatedat).format(
													'Do MMM YYYY HH:mm'
												)}]`,
										  })
										: 'online'}
								</small>
							</>
						)}
					</div>
				</div>
				<div className='row'>
					<div className='table'>
						<div className='row'>
							<div className='cell cell-left cell-list-left hide-list-users'>
								<div style={{ position: 'relative', height: '100%' }}>
									<Users sendUserId={getUserId} />
								</div>
							</div>
							<div
								className='cell'
								style={{ border: '1px solid #d1cece', padding: '10px' }}
							>
								<div style={{ position: 'relative', height: '100%' }}>
									<Thread receiverId={userId} messages={messages} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className='row'
					style={{
						height: '10%',
						borderBottom: '1px solid #d1cece',
						borderLeft: '1px solid #d1cece',
						borderRight: '1px solid #d1cece',
					}}
				>
					<SendMessage receiverId={userId} socket={socket} />
				</div>
			</div>
		</div>
	);
};

export default Chat;
