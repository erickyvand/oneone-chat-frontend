/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../redux/actions/userAction';

const Thread = ({ receiverId, messages }) => {
	const dispatch = useDispatch();

	let messagesEnd = useRef(null);

	const usersData = useSelector(state => state.users);
	const users = [...usersData.data];

	const thread = messages.filter(
		message =>
			(message.receiverid === receiverId &&
				message.senderid === Number(sessionStorage.getItem('id'))) ||
			(message.receiverid === Number(sessionStorage.getItem('id')) &&
				message.senderid === receiverId)
	);

	// scroll to bottom inside element
	const scrollToBottom = () => {
		if (messagesEnd.current !== null) {
			messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		dispatch(userAction());

		scrollToBottom();
	}, []);

	return (
		<div className='cell-list'>
			{thread.length === 0
				? ''
				: thread.map(message => {
						const user = users.find(user => user.id === receiverId);

						if (user !== undefined && message.senderid === user.id) {
							return (
								<div key={message.id} className='float-left'>
									<h6 className='users-title'>{user.fullname}</h6>
									<p className='bg-left text-white border-left-radius'>
										{message.message}
										<br />
										<small>
											{moment(message.createdat).calendar({
												sameDay: `[${moment(message.createdat).format(
													'HH:mm'
												)}]`,
												lastWeek: `[${moment(message.createdat).format(
													'Do MMM YYYY HH:mm'
												)}]`,
												sameElse: `[${moment(message.createdat).format(
													'Do MMM YYYY HH:mm'
												)}]`,
											})}
										</small>
									</p>
								</div>
							);
						} else {
							return (
								<div key={message.id} className='float-right'>
									<h6 className='users-title users-title-right'>
										{sessionStorage.getItem('fullname')}
									</h6>
									<p className='bg-right border-right-radius'>
										{message.message}
										<br />
										<small>
											{moment(message.createdat).calendar({
												sameDay: `[${moment(message.createdat).format(
													'HH:mm'
												)}]`,
												lastWeek: `[${moment(message.createdat).format(
													'Do MMM YYYY HH:mm'
												)}]`,
												sameElse: `[${moment(message.createdat).format(
													'Do MMM YYYY HH:mm'
												)}]`,
											})}
										</small>
									</p>
								</div>
							);
						}
				  })}
			<div ref={messagesEnd}></div>
		</div>
	);
};

export default Thread;
